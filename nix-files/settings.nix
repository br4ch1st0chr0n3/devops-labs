{ pkgs, system, inputs }:
let
  inherit (import ./data.nix) appPurescript;
  inherit (inputs.workflows.lib.${system}) settingsNix settingsCommonNix;
in
pkgs.lib.attrsets.recursiveUpdate
  settingsCommonNix
{
  inherit (settingsNix) python ide-purescript;
  extra = {
    # "purescript.outputDirectory" = "./${appPurescript}/output/";
    # "purescript.packagePath" = "./${appPurescript}";
    # "purescript.sourcePath" = "./${appPurescript}/src";

    "[html]" = {
      "editor.defaultFormatter" = "monosans.djlint";
    };
    "[markdown]" = {
      "editor.defaultFormatter" = "DavidAnson.vscode-markdownlint";
    };

    "python.linting.pylintEnabled" = true;

    "json.schemas" = [
      {
        "fileMatch" = [
          "**/*.markdownlint.json"
        ];
        "url" = "https://raw.githubusercontent.com/DavidAnson/markdownlint/main/schema/markdownlint-config-schema.json";
      }
      {
        "fileMatch" = [
          "**/pyproject.toml"
        ];
        "url" = "https://json.schemastore.org/pyproject.json";
      }
    ];

    "markdownlint.lintWorkspaceGlobs" = [
      "**/*.{md,mkd,mdwn,mdown,markdown,markdn,mdtxt,mdtext,workbook}"
      "!**/bower_components"
      "!**/node_modules"
      "!**/vendor"
      "!**/.*"
    ];
    "markdownlint.config" = import ./markdownlint-config.nix;

    "terraform.languageServer.path" = "${pkgs.terraform-ls}/bin/terraform-ls";
    "terraform.languageServer.terraform.path" = "${pkgs.terraform}/bin/terraform";
  };
}
