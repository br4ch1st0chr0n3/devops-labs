{
  description = "PureScript app flake";
  inputs = { };

  outputs =
    inputs@{ self, ... }:
    let
      inputs_ =
        let flakes = (import ../.).outputs.inputs.flakes; in
        {
          inherit (flakes.source-flake) flake-utils nixpkgs;
          inherit (flakes) codium drv-tools devshell;
          purescript-tools = flakes.language-tools.purescript;
          python-tools = flakes.language-tools.python;
        };

      outputs = outputs_ { } // { inputs = inputs_; outputs = outputs_; };

      outputs_ =
        inputs__:
        let inputs = inputs_ // inputs__; in
        inputs.flake-utils.lib.eachDefaultSystem
          (system:
          let
            pkgs = inputs.nixpkgs.legacyPackages.${system};
            inherit (inputs.drv-tools.lib.${system}) mkShellApps;
            inherit (inputs.purescript-tools.packages.${system}) purescript spago nodejs_18;
            inherit (inputs.devshell.lib.${system}) mkShell mkRunCommands;
            inherit (inputs.python-tools.lib.${system}) activateVenv;

            tools = [ purescript spago nodejs_18 ];

            packages =
              let build = ''npm run build''; in
              mkShellApps {
                run-start = {
                  runtimeInputs = tools;
                  text = ''
                    ${build}
                    source ${./app.env}
                    npx parcel serve -p $PORT --host $HOST dev/index.html
                  '';
                  description = "Run app";
                };
                test = {
                  # https://github.com/mozilla/geckodriver/releases/tag/v0.31.0
                  text = ''
                    ${activateVenv}
                    poetry install
                    set +e
                    nix run .#run-start &
                    parcel_pid=$!
                    poetry run python ${./scripts/wait-for-server.py}
                    mkdir -p test_tmp
                    export TMPDIR=test_tmp
                    poetry run pytest -rX --rootdir test --driver Firefox
                    kill $parcel_pid || echo "test finished"
                  '';
                  runtimeInputs = tools ++ [ pkgs.poetry pkgs.geckodriver pkgs.firefox ];
                  description = "Test app";
                };
                build = {
                  text = build;
                  runtimeInputs = tools;
                  description = "Build app";
                };
              };
            devShells.default = mkShell {
              packages = [ pkgs.poetry ] ++ tools;
              bash.extra = activateVenv;
              commands = mkRunCommands "scripts" { inherit (packages) run-start test build; };
            };
          in
          {
            inherit devShells packages;
          });
    in
    outputs;
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

