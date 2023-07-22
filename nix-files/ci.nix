{ appPurescript, appPython, pkgs, system, inputs }:
let
  inherit (inputs.drv-tools.lib.${system}) mergeValues mkAccessors genAttrsId singletonIf;
  inherit (inputs.workflows.lib.${system}) expr steps job job_ names os run;
  inherit (pkgs.lib.attrsets) genAttrs mapAttrsRecursive recursiveUpdate;

  name = "CI";

  apps = [ appPurescript appPython ];

  on = {
    schedule = [
      # https://crontab.guru/#30_5,17_*_*_*
      # * is a special character in YAML so you have to quote this string
      { cron = "0 0 * * *"; }
    ];
    pull_request = { };
    push = { };
    workflow_dispatch = { };
  };

  mkJobApp = jobId: app: "${jobId}-${app}";

  jobInit.name = "_1_init";
  jobInit.value = job {
    strategy = { };
    runsOn = os.ubuntu-22;
    name = "Initial Nix";
    cacheNixArgs.keyJob = "init";
    strategy = { };
    doSaveFlakes = false;
    doUpdateLocks = true;
    doFormat = true;
    cacheNixArgs = {
      linuxGCEnabled = true;
      linuxMaxStoreSize = 4000000000;
    };
    steps = _: [
      {
        name = "Run writers";
        run = run.nixScript { name = inputs.root.packages.${system}.writeAll.pname; };
      }
      (steps.commit { messages = [ (steps.updateLocks { }).name (steps.format { }).name "Run writers" ]; })
    ];
  };

  jobCache.name = "_2_cache";
  jobCache.value = job
    {
      name = "Caching Nix";
      doInstall = true;
      doPushToCachix = true;
      doSaveFlakes = false;
      cacheNixArgs.keyJob = "caching";
      cacheNixArgs = {
        linuxGCEnabled = true;
        # linuxMaxStoreSize = 4000000000;
        macosGCEnabled = true;
        # macosMaxStoreSize = 4000000000;
      };
    } // { needs = [ jobInit.name ]; };

  jobChangedFiles.name = "_3_changed-files";
  jobChangedFiles.value =
    let stepId = "changed-files"; in
    genAttrs apps (app:
      {
        name = "Check if ${app} has any modified files";
        runs-on = os.ubuntu-22;
        needs = [ jobInit.name ];
        outputs = {
          "${app}" = expr "steps.${stepId}.outputs.any_modified";
        };
        steps = [
          (steps.checkout // { "with".fetch-depth = 0; })
          {
            name = "Get changed files";
            id = stepId;
            uses = "tj-actions/changed-files@v37";
            "with" = {
              sha = expr names.github.sha;
              files = "${app}/**";
            };
          }
          {
            name = "List changed files";
            "if" = "steps.${stepId}.outputs.any_modified == 'true'";
            run = ''echo "${expr "steps.${stepId}.outputs.all_changed_files" }"'';
          }
        ];
      }
    );

  jobCI.name = "_4_app-ci";
  jobCI.value =
    let
      matrix = {
        "${appPurescript}" = {
          snyk = {
            language = "node";
            language-title = "(Node.js)";
          };
        };
        "${appPython}" = {
          snyk = {
            language = "python";
            language-title = "(Python)";
          };
        };
      };
    in
    builtins.mapAttrs
      (app: appMatrix:
        let jobId = mkJobApp jobChangedFiles.name app; in
        {
          needs = [ jobId ];
          "if" = "needs.${jobId}.outputs.${app} == 'true'";
          defaults = {
            run = {
              working-directory = app;
            };
          };
        } //
        (job {
          name = "CI for ${app}";
          strategy.matrix.os = [ os.ubuntu-22 os.macos-12 ];
          doCacheNix = true;
          cacheNixArgs.keyJob = "app";
          cacheNixArgs = {
            linuxGCEnabled = true;
            # linuxMaxStoreSize = 0;
            macosGCEnabled = true;
            # macosMaxStoreSize = 0;
          };
          steps = _: [
            (
              # No need to lint PureScript since it's strongly statically typed
              singletonIf (app == appPython) {
                name = "Lint app";
                run = run.nixScript { name = inputs.${app}.packages.${system}.lint.pname; };
              }
            )
            (
              # No need to build app_python as it's an interpretable lang
              singletonIf (app == appPurescript) {
                name = "Build app";
                run = run.nixScript { name = inputs.${app}.packages.${system}.build.pname; };
              }
            )
            {
              name = "Run Snyk to check for vulnerabilities ${appMatrix.snyk.language-title}";
              uses = "snyk/actions/${ appMatrix.snyk.language }@master";
              continue-on-error = true;
              "with" = {
                args = "--all-projects";
              };
              env = {
                SNYK_TOKEN = expr names.secrets.SNYK_TOKEN;
              };
            }
            {
              name = "Test app";
              run = run.nixScript { name = inputs.${app}.packages.${system}.test.pname; };
            }
          ];
        }))
      matrix;

  jobDocker.name = "_5_push-to-docker-hub";
  jobDocker.value =
    genAttrs apps
      (app:
        let jobId = mkJobApp jobCI.name app; in
        {
          name = "Push '${app}' to Docker Hub";
          needs = [ jobId ];
          runs-on = os.ubuntu-22;
          steps = [
            steps.checkout
            steps.gitPull
            {
              name = "Hadolint Action";
              uses = "hadolint/hadolint-action@v2.0.0";
              "with" = {
                no-fail = true;
                verbose = true;
                dockerfile = "${app}/Dockerfile";
              };
            }
            {
              name = "Set up Docker Buildx";
              uses = "docker/setup-buildx-action@v2";
            }
            {
              name = "Log in to Docker Hub";
              uses = "docker/login-action@v2";
              "with" = {
                username = expr names.secrets.DOCKER_HUB_USERNAME;
                password = expr names.secrets.DOCKER_HUB_PAT;
              };
            }
            {
              name = "Build and push";
              uses = "docker/build-push-action@v3";
              env = {
                DOCKER_NAME = expr names.secrets.DOCKER_HUB_USERNAME;
              };
              "with" = {
                # https://github.com/docker/build-push-action#path-context
                context = app;
                push = true;
                tags = "${expr names.secrets.DOCKER_HUB_USERNAME}/${app}:latest";
              };
            }
          ];
        });

  # app-ci.appPurescript
  mkJobs = jobs_@{ ... }: (mergeValues (
    builtins.mapAttrs
      (
        _: val: mergeValues (
          builtins.mapAttrs
            (name_: val_: {
              "${val.name}-${name_}" = val_;
            })
            val.value
        )
      )
      jobs_
  ));
  jobs = mkJobs
    {
      inherit jobChangedFiles jobCI jobDocker;
    } // {
    ${jobInit.name} = jobInit.value;
    ${jobCache.name} = jobCache.value;
  };
in
{
  inherit on jobs name;
}
