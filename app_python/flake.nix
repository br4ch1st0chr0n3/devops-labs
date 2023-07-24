{
  description = "Python app flake";
  outputs = _:
    let flakes = (import ../.).outputs.inputs.flakes; in
    flakes.makeFlake {
      inputs = { inherit (flakes.all) flake-utils nixpkgs poetry2nix codium drv-tools devshell python-tools; };
      perSystem = { inputs, system }:
        let
          pkgs = inputs.nixpkgs.legacyPackages.${system};
          inherit (inputs.drv-tools.lib.${system}) mkShellApps getExe;
          inherit (inputs.devshell.lib.${system}) mkShell mkRunCommands mkCommands;
          inherit (inputs.python-tools.lib.${system}) activateVenv;
          inherit (pkgs.extend inputs.poetry2nix.overlay) poetry2nix;

          whenRootAtDepth = depth: ''when inside `$PROJECT_ROOT/${builtins.baseNameOf ./.}`'';

          # TODO enable disabled errors after command
          # https://unix.stackexchange.com/a/310963 
          withoutErrors = command: ''
            set +e
            ${activateVenv}
            poetry install
            ${command}
            echo ""
          '';

          tools = [ pkgs.poetry ];

          packages = mkShellApps {
            run-start =
              let appName = (pkgs.lib.modules.importTOML ./pyproject.toml).config.tool.poetry.name; in
              {
                text = withoutErrors '' poetry run ${appName}'';
                description = "start app";
                runtimeInputs = [ pkgs.poetry ];
              };
            test = {
              text = withoutErrors ''poetry run pytest -rX'';
              description = "test app";
              runtimeInputs = [ pkgs.poetry ];
            };
            lint = {
              text = withoutErrors ''poetry run pylint app'';
              description = "lint app";
              runtimeInputs = [ pkgs.poetry ];
            };
            snykTest = {
              text = "${getExe pkgs.nodePackages.snyk} test";
              runtimeInputs = [ pkgs.python3Full ];
            };
          };
          devShells.default = mkShell {
            packages = [ pkgs.poetry ];
            bash.extra = activateVenv;
            commands =
              mkRunCommands "scripts" { inherit (packages) run-start test lint; }
              ++ mkCommands "tools" tools;
          };
          devShells.poetry = (poetry2nix.mkPoetryEnv {
            projectDir = ./.;
            preferWheels = true;
            editablePackageSources = {
              app = ./app;
            };
            overrides = poetry2nix.defaultPoetryOverrides.extend (self: super: {
              bs4 = super.bs4.overridePythonAttrs (old: {
                buildInputs = (old.buildInputs or [ ]) ++ [ super.setuptools ];
              });
            });
          }).overrideAttrs (oldAttrs: {
            buildInputs = [ pkgs.poetry ];
          });
        in
        {
          inherit packages devShells;
        };
    };
  nixConfig = {
    extra-substituters = [
      https://nix-community.cachix.org
      https://hydra.iohk.io
      https://deemp.cachix.org
    ];
    extra-trusted-public-keys = [
      nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs=
      hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+a5NEWhJGzdjvKNGv0/EQ=
      deemp.cachix.org-1:o1FA93L5vL4LWi+jk2ECFk1L1rDlMoTH21R1FHtSKaU=
    ];
  };
}

