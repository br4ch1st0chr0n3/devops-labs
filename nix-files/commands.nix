{ pkgs, scripts, system, drv-tools }:
let
  inherit (import ./data.nix) dockerPorts langs commandNames serviceNames langPython langPurescript appName;
  inherit (drv-tools.lib.${system}) mkShellApp mkBin mkShellApps;

  # we assume that the commands will start in the corresponding directories
  mkCommands = lang:
    let
      appName_ = appName lang;
      commandNames_ = commandNames.apps lang;
      serviceNames_ = serviceNames.${lang};
      mkAppsWithDocker = apps@{ ... }: mkShellApps (
        builtins.mapAttrs (name: app: app // { runtimeInputs = (app.runtimeInputs or [ ]) ++ [ pkgs.docker ]; }) apps
      );
      mkAppsWithDocker_ = apps@{ ... }: mkAppsWithDocker (builtins.mapAttrs (name: text: { inherit text; }) apps);
      mkShellApps_ = apps@{ ... }: mkShellApps (builtins.mapAttrs (name: text: { inherit text; }) apps);
      rootEnv = "../.env";
      withRootEnv = ''
        set -a
        if [[ -f ${rootEnv} ]]
        then
          source ${rootEnv}
        fi
        set +a
      '';
    in
    (mkShellApps_
      {
        "${commandNames_.run}" = ''${mkBin scripts.${lang}.run-start}'';
        "${commandNames_.test}" = ''${mkBin scripts.${lang}.test}'';
      }
    ) //
    (mkAppsWithDocker_
      {
        "${commandNames_.dockerBuild}" = ''${withRootEnv} docker compose build ${serviceNames_.web}'';
        "${commandNames_.dockerRun}" = ''${withRootEnv} docker compose up ${serviceNames_.web}'';
        "${commandNames_.dockerPush}" = ''${withRootEnv} docker compose push ${serviceNames_.web}'';
        "${commandNames_.dockerPull}" = ''${withRootEnv} docker compose pull'';
        "${commandNames_.dockerStop}" = ''docker compose stop'';
      }
    );
  commands = {
    apps =
      let
        inherit (pkgs.lib.attrsets) foldAttrs;
        inherit (builtins) map;
      in
      foldAttrs (n: acc: n) { } (map mkCommands langs);
  };
in
commands
