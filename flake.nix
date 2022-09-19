{
  inputs = {
    inputs.url = "github:br4ch1st0chr0n3/flakes?dir=inputs";
    nixpkgs.follows = "inputs/nixpkgs";
    flake-utils.follows = "inputs/flake-utils";
    my-codium.follows = "inputs/my-codium";
  };
  outputs =
    { self
    , flake-utils
    , nixpkgs
    , my-codium
    , inputs
    }:
    flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
      inherit (my-codium.tools.${system})
        writeSettingsJson
        settingsNix
        codium
        toList
        shellTools
        ;

      writeSettings = writeSettingsJson
        {
          inherit (settingsNix)
            todo-tree
            files
            editor
            gitlens
            git
            nix-ide
            workbench
            ;
          ide-purescript =
            let
              appPurescript = "app_purescript";
            in
            settingsNix.ide-purescript // {
              "purescript.outputDirectory" = "./${appPurescript}/output/";
              "purescript.packagePath" = "./${appPurescript}";
              "purescript.sourcePath" = "./${appPurescript}/src";
            };
        };

      tools = toList {
        inherit (shellTools) nix purescript;
      };

      codiumWithSettings = pkgs.mkShell {
        buildInputs = [ writeSettings codium ];
        shellHook = ''
          write-settings-json
          codium .
        '';
      };
    in
    {
      devShells =
        {
          default = pkgs.mkShell {
            name = "dev-tools";
            buildInputs = tools;
          };
          codium = codiumWithSettings;
        };
    });

  nixConfig = {
    extra-substituters = [
      "https://nix-community.cachix.org"
      https://br4ch1st0chr0n3-nix-managed.cachix.org
      "https://br4ch1st0chr0n3-flakes.cachix.org"
    ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      "br4ch1st0chr0n3-nix-managed.cachix.org-1:sDKsfgu5fCCxNwVhZg+AWeGvbLlEtZoyzkSNKRM/KAo="
      "br4ch1st0chr0n3-flakes.cachix.org-1:Dyc2yLlRIkdbq8CtfOe24QQhQVduQaezkyV8J9RhuZ8="
    ];
  };
}
