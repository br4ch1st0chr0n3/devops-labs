{ json2md
, system
, drv-tools
, pkgs
, commands
, env2json
, my-codium
, terrafix
}:
let
  inherit (drv-tools.functions.${system})
    mkShellApp writeJSON framedBrackets mkBin
    withLongDescription concatStringsNewline
    concatMapStringsNewline withMan indentStrings4
    mkBinName writeYAML;
  man = drv-tools.configs.${system}.man;
  inherit (my-codium.configs.${system})
    settingsNix;
  inherit (my-codium.functions.${system})
    writeSettingsJSON writeTasksJSON;
  inherit (import ./data.nix)
    commandNames taskNames appPurescript
    appPython DOCKER_PORT HOST_PORT;
  inherit (builtins) map;
  inherit (json2md.functions.${system}) nix2md;

  # all scripts assume calling from the $PROJECT_ROOT
  writeDocs = nix2md "README/docs.md" (import ./docs.nix { inherit pkgs env2json system; });
  writeMarkdownlintConfig = writeJSON "markdownlint" ".markdownlint.jsonc" (import ./markdownlint-config.nix);
  writeSettings = writeSettingsJSON (import ./settings.nix { inherit settingsNix pkgs mkBinName; });
  writeTasks = writeTasksJSON (import ./tasks.nix { inherit commands drv-tools system; });

  writeTerraform =
    let
      inherit (terrafix.functions.${system}) writeFiles;
      docker = import ./terraform/docker.nix { inherit pkgs system terrafix; };
      yc = import ./terraform/yc.nix { inherit pkgs system terrafix; };
      github = import ./terraform/github.nix { inherit pkgs system terrafix; };
      dirDocker = "terraform/docker";
      dirYC = "terraform/yandex-cloud";
      dirGithub = "terraform/github";
    in
    writeFiles [
      { expr = docker.tfvars; filePath = "${dirDocker}/terraform.tfvars"; }
      { expr = docker.variables; filePath = "${dirDocker}/variables.tf"; }
      { expr = docker.main; filePath = "${dirDocker}/main.tf"; }
      { expr = yc.main; filePath = "${dirYC}/main.tf"; }
      { expr = yc.tfvars; filePath = "${dirYC}/terraform.tfvars"; }
      { expr = yc.variables; filePath = "${dirYC}/variables.tf"; }
      { expr = github.main; filePath = "${dirGithub}/main.tf"; }
      { expr = github.variables; filePath = "${dirGithub}/variables.tf"; }
    ];

  writeWorkflows = writeYAML "workflows" ".github/workflows/ci.yaml" (
    import ./github/ci.nix { inherit appPurescript appPython pkgs drv-tools system; }
  );
  
  writeConfigs =
    let writers = [
      writeSettings
      writeTasks
      writeDocs
      writeMarkdownlintConfig
      writeWorkflows
    ]; in
    withMan
      (
        mkShellApp {
          name = "write-configs";
          text = concatMapStringsNewline mkBin writers;
          description = "Write configs using the available config writers";
        }
      )
      (x: ''
        ${man.DESCRIPTION}
        ${x.meta.description}.
        These writers are:
        ${indentStrings4 (map (x: x.name) writers)}
      '');
in
{
  inherit
    writeWorkflows
    writeDocs
    writeTasks
    writeSettings
    writeMarkdownlintConfig
    writeConfigs
    ;
}
