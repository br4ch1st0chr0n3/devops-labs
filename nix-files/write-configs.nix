{ inputs
, system
, pkgs
, commands
}:
let
  inherit (inputs.drv-tools.lib.${system})
    mkShellApp writeJSON framedBrackets mkBin
    concatStringsNewline mkBinName writeYAML
    concatMapStringsNewline withMan indentStrings4
    ;
  man = inputs.drv-tools.lib.${system}.man;
  inherit (inputs.codium.lib.${system}) settingsNix writeSettingsJSON writeTasksJSON;
  inherit (import ./data.nix) commandNames taskNames appPurescript appPython DOCKER_PORT HOST_PORT;
  inherit (inputs.json2md.lib.${system}) nix2md;
  inherit (builtins) map;

  # all scripts assume calling from the $PROJECT_ROOT
  writeDocs = nix2md "README/docs.md" (import ./docs.nix { inherit pkgs inputs system; });
  writeMarkdownlintConfig = writeJSON "markdownlint" ".markdownlint.jsonc" (import ./markdownlint-config.nix);
  writeSettings = writeSettingsJSON (import ./settings.nix { inherit settingsNix pkgs mkBinName; });
  writeTasks = writeTasksJSON (import ./tasks.nix { inherit commands inputs system; });

  writeTerraform =
    let
      inherit (inputs.terrafix.lib.${system}) writeFiles;
      docker = import ./terraform/docker.nix { inherit pkgs system inputs; };
      yc = import ./terraform/yc.nix { inherit pkgs system inputs; };
      github = import ./terraform/github.nix { inherit pkgs system inputs; };
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
    import ./github/ci.nix { inherit appPurescript appPython pkgs system inputs; }
  );

  writelib =
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
          name = "write-lib";
          text = concatMapStringsNewline mkBin writers;
          description = "Write lib using the available config writers";
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
    writelib
    ;
}
