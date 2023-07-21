{ appPurescript, appPython, pkgs, drv-tools, workflows, system }:
let
  inherit (drv-tools.lib.${system}) mergeValues;
  inherit (drv-tools.lib.${system}) mkAccessors genAttrsId;
  inherit (workflows.lib.${system}) expr names;
  inherit (pkgs.lib.attrsets) genAttrs mapAttrsRecursive;

  name = "Caching";
  ubuntu20 = "ubuntu-20.04";
  ubuntu22 = "ubuntu-22.04";
  ubuntu20_ = "ubuntu-20";
  ubuntu22_ = "ubuntu-22";
  macos12 = "macos-12";
  macos11 = "macos-11";
  CACHIX_CACHE_ = "CACHIX_CACHE";
  mainOS = ubuntu20;
  configGitActions = ''
    git config user.name github-actions
    git config user.email github-actions@github.com
  '';

  apps = [ appPurescript appPython ];
  oss = [ ubuntu20 ubuntu22 ];

  insertListIf = cond: list: if cond then list else [ ];
  changed-files-app = app: "changed-files-${app}";

  actions = {
    logInToCachix = {
      name = "Log in to Cachix";
      uses = "cachix/cachix-action@v12";
      "with" = {
        name = expr names.secrets.CACHIX_CACHE;
        authToken = expr names.secrets.CACHIX_AUTH_TOKEN;
      };
    };
    installNix = [
      {
        name = "Checkout workflows repo";
        uses = "actions/checkout@v3";
        "with" = {
          repository = "deemp/workflows";
          path = ".actions";
        };
      }
      {
        name = "Prepare Nix";
        uses = "./.actions/.github/actions/prepare-nix";
        "with" = {
          GITHUB_TOKEN = expr names.secrets.GITHUB_TOKEN;
        };
      }
    ];
    checkout = { uses = "actions/checkout@v3"; };
  };

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

  app-ci =
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
      (app: val:
        let changed-files-app_ = changed-files-app app; in
        {
          name = "CI for ${app}";
          needs = [ changed-files-app_ ];
          "if" = "needs.${changed-files-app_}.outputs.${app} == 'true'";
          defaults = {
            run = {
              working-directory = app;
            };
          };
          runs-on = "ubuntu-20.04";
          steps = [
            { uses = "actions/checkout@v3"; }
          ]
          ++
          actions.installNix
          ++
          (
            # - No need to lint PureScript since it's strongly statically typed
            insertListIf (app == appPython) [
              {
                name = "Linting";
                run = "nix run .#lint";
              }
            ]
          )
          ++
          (
            # No need to build app_python as it's an interpretable lang
            insertListIf (app == appPurescript) [
              {
                name = "Build app";
                run = "nix run .#build";
              }
            ]
          )
          ++
          [
            {
              name = "Run Snyk to check for vulnerabilities ${val.snyk.language-title}";
              uses = "snyk/actions/${ val.snyk.language }@master";
              continue-on-error = true;
              "with" = {
                args = "--all-projects";
              };
              env = {
                SNYK_TOKEN = expr names.secrets.SNYK_TOKEN;
              };
            }
            {
              name = "Test";
              run = "nix run .#test";
            }
          ];
        })
      matrix;
  changed-files_ = "changed-files";
  changed-files =
    genAttrs apps (app:
      {
        name = "Check if ${app} has any modified files";
        runs-on = ubuntu20;
        outputs = {
          "${app}" = expr "steps.${changed-files_}.outputs.any_modified";
        };
        steps = [
          (actions.checkout // {
            "with" = { fetch-depth = 0; };
          })
          {
            name = "Get changed files";
            id = changed-files_;
            uses = "tj-actions/changed-files@v32";
            "with" = {
              sha = expr names.github.sha;
              files = "${app}/**";
            };
          }
          {
            name = "List changed files";
            "if" = "steps.${changed-files_}.outputs.any_modified == 'true'";
            run = ''
              echo "One or more files in the docs folder has changed."
              echo "List all the files that have changed: ${expr "steps.${changed-files_}.outputs.all_changed_files" }"
            '';
          }
        ];
      }
    );

  caching =
    let
      gitNixAction = { actionName, action, args ? "" }: ''
        git pull --rebase --autostash
        nix run ${action} ${args}
        git diff --exit-code || git commit -a -m 'action: ${actionName}'
        git push
      '';
      matrix = {
        "${ubuntu20_}" = ubuntu20;
        "${ubuntu22_}" = ubuntu22;
        "${macos11}" = macos11;
        "${macos12}" = macos12;
      };
    in
    builtins.mapAttrs
      (os_: os:
        {
          name = ''Caching on ${ os }'';
          runs-on = os;
          steps = [
            actions.checkout
          ]
          ++
          actions.installNix
          ++
          (insertListIf (os == mainOS)
            [
              {
                name = "Configure git";
                run = configGitActions;
              }
              {
                name = "Update locks";
                run = ''
                  ${gitNixAction { actionName = "update flake.lock-s"; action = ".#updateLocks"; }}
                '';
              }
            ]
          ) ++ [
            actions.logInToCachix
            {
              name = "Cache flakes";
              run = "${CACHIX_CACHE_}=${expr names.secrets.CACHIX_CACHE } nix run .#pushToCachix";
            }
          ];
        }
      )
      matrix;

  # a.purs.ab
  push-to-docker-hub =
    genAttrs apps
      (app:
        let changed-files-app_ = changed-files-app app; in
        {
          name = "Push '${app}' to Docker Hub";
          needs = [ changed-files-app_ ];
          "if" = "needs.${changed-files-app_}.outputs.${app} == 'true'";
          runs-on = ubuntu20;
          steps = [
            actions.checkout
            {
              name = "Hadolint Action";
              uses = "hadolint/hadolint-action@v2.0.0";
              "with" = {
                no-fail = true;
                verbose = true;
                dockerfile = "${ app }/Dockerfile";
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
  mkJobs = jobs_@{ ... }: mergeValues (mergeValues (
    builtins.mapAttrs
      (
        name: val: {
          "${name}" = mergeValues (
            builtins.mapAttrs
              (name_: val_: {
                "${name}-${name_}" = val_;
              })
              val
          );
        }
      )
      jobs_
  ));
  jobs = mkJobs {
    inherit app-ci changed-files push-to-docker-hub caching;
  };
in
{
  inherit on jobs name;
}
