{
  description = "app_python flake";

  inputs = {
    nixpkgs_.url = github:br4ch1st0chr0n3/flakes?dir=source-flake/nixpkgs;
    flake-utils_.url = github:br4ch1st0chr0n3/flakes?dir=source-flake/flake-utils;
    drv-tools.url = github:br4ch1st0chr0n3/flakes?dir=drv-tools;
    python-tools.url = github:br4ch1st0chr0n3/flakes?dir=language-tools/python;
    nixpkgs.follows = "nixpkgs_/nixpkgs";
    flake-utils.follows = "flake-utils_/flake-utils";
  };

  outputs =
    { self
    , nixpkgs
    , flake-utils
    , drv-tools
    , python-tools
    , ...
    }:
      with flake-utils.lib;
      eachDefaultSystem
        (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};

          dotenvFile = "app.env";

          inherit (drv-tools.functions.${system})
            mkShellApp
            mkShellApps
            mkDevShellsWithDefault
            mkBin
            applyN
            ;

          whenRootAtDepth = depth: ''when inside `$PROJECT_ROOT/${builtins.baseNameOf ./.}`'';

          # TODO enable disabled errors after command
          # https://unix.stackexchange.com/a/310963 
          withoutErrors = command: ''
            set +e
            ${command}
            echo ""
          '';
          inherit (python-tools.snippets.${system}) activateVenv;
          scripts = mkShellApps {
            run-start =
              let appName = (pkgs.lib.modules.importTOML ./pyproject.toml).config.tool.poetry.name;
              in
              {
                text = ''
                  ${activateVenv}
                  poetry run ${appName}
                '';
                longDescription = ''Run `${appName}` ${whenRootAtDepth 2}'';
                runtimeInputs = [ pkgs.poetry ];
              };
            test = {
              text = ''
                ${activateVenv}
                poetry run pytest -rX || echo ""
              '';
              runtimeInputs = [ pkgs.poetry ];
            };
            lint = {
              text = withoutErrors ''
                poetry run pylint app
              '';
              runtimeInputs = [ pkgs.pylint ];
            };
          };
        in
        {
          packages = scripts;
          inherit scripts;
          devShells = mkDevShellsWithDefault
            {
              buildInputs = (builtins.attrValues scripts) ++ [ pkgs.poetry ];
              shellHook = ''
                ${activateVenv}
              '';
            }
            {
              tools = {
                buildInputs = (builtins.attrValues { inherit updateDependencies; })
                ;
              };
            }
          ;
        });
  nixConfig = {
    extra-substituters = [
      https://haskell-language-server.cachix.org
      https://nix-community.cachix.org
      https://hydra.iohk.io
      https://br4ch1st0chr0n3.cachix.org
    ];
    extra-trusted-public-keys = [
      haskell-language-server.cachix.org-1:juFfHrwkOxqIOZShtC4YC1uT1bBcq2RSvC7OMKx0Nz8=
      nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs=
      hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+a5NEWhJGzdjvKNGv0/EQ=
      br4ch1st0chr0n3.cachix.org-1:o1FA93L5vL4LWi+jk2ECFk1L1rDlMoTH21R1FHtSKaU=
    ];
  };
}
