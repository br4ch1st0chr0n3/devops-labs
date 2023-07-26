{
  description = "Python app flake";
  outputs = _:
    let flakes = (import ../.).outputs.inputs.flakes; in
    flakes.makeFlake {
      inputs = { inherit (flakes.all) flake-utils nixpkgs poetry2nix codium drv-tools devshell; };
      perSystem = { inputs, system }:
        let
          pkgs = inputs.nixpkgs.legacyPackages.${system};
          inherit (inputs.drv-tools.lib.${system}) mkShellApps getExe;
          inherit (inputs.devshell.lib.${system}) mkShell mkRunCommands mkCommands;
          inherit (pkgs.extend inputs.poetry2nix.overlay) poetry2nix;
          inherit (import ../nix-files/data.nix) appPython;

          app = (poetry2nix.mkPoetryApplication {
            projectDir = ./.;
            preferWheels = true;
            python = pkgs.python3Full;
            overrides = poetry2nix.defaultPoetryOverrides.extend (self: super: {
              bs4 = super.bs4.overridePythonAttrs (old: {
                buildInputs = (old.buildInputs or [ ]) ++ [ super.setuptools ];
              });
            });
          });

          appScript = "app";

          appImage = pkgs.dockerTools.streamLayeredImage {
            name = appPython;
            tag = "latest";
            contents = [ app.dependencyEnv pkgs.bashInteractive pkgs.coreutils ];
            config.Entrypoint = [ "bash" "-c" ];
            config.Cmd = [ "cd app && uvicorn --reload --host $HOST --port $PORT app.main:app" ];
          };

          packages = mkShellApps
            {
              run-start = {
                text = ''poetry run ${appScript}'';
                description = "start app";
                runtimeInputs = [ pkgs.poetry app.dependencyEnv ];
              };
              test = {
                text = ''poetry run pytest -rX'';
                description = "test app";
                runtimeInputs = [ pkgs.poetry app.dependencyEnv ];
              };
              lint = {
                text = ''poetry run pylint app'';
                description = "lint app";
                runtimeInputs = [ pkgs.poetry app.dependencyEnv ];
              };
              snykTest = {
                text = "snyk test";
                runtimeInputs = [ pkgs.nodePackages.snyk pkgs.python3Full ];
              };
              dockerLoad = {
                text = ''$(nix build --no-link --print-out-paths ${appImage}) | docker load'';
                runtimeInputs = [ pkgs.nix pkgs.docker ];
              };
              dockerPush = {
                text = ''docker compose'';
              };
            }
          // {
            inherit app appImage;
          };

          devShells.default = mkShell {
            packages = [ pkgs.poetry ];
            packagesFrom = [ app.dependencyEnv ];
            commands =
              mkRunCommands "scripts" { inherit (packages) run-start test lint; }
              ++ mkCommands "tools" [ ];
          };
          devShells.poetry = app.dependencyEnv;
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

