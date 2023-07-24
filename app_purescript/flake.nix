{
  inputs.firefox-darwin.url = "github:bandithedoge/nixpkgs-firefox-darwin";

  description = "PureScript app flake";
  outputs = inputs:
    let flakes = (import ../.).outputs.inputs.flakes; in
    flakes.makeFlake {
      inputs = {
        inherit (flakes.all)
          flake-utils nixpkgs poetry2nix codium drv-tools
          devshell python-tools purescript-tools;
        inherit (inputs) firefox-darwin;
      };
      perSystem = { inputs, system }:
        let
          pkgs = inputs.nixpkgs.legacyPackages.${system};
          inherit (inputs.drv-tools.lib.${system}) mkShellApps getExe;
          inherit (inputs.purescript-tools.packages.${system}) purescript spago nodejs_18;
          inherit (inputs.devshell.lib.${system}) mkShell mkRunCommands;
          inherit (inputs.python-tools.lib.${system}) activateVenv;
          pkgs-firefox = pkgs.extend inputs.firefox-darwin.overlay;

          tools = [ purescript spago nodejs_18 ];

          packages =
            let build = ''npm run build''; in
            mkShellApps
              {
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
                  runtimeInputs = tools ++ [ pkgs.poetry pkgs.geckodriver pkgs-firefox.firefox-bin ];
                  description = "Test app";
                };
                build = {
                  text = build;
                  runtimeInputs = tools;
                  description = "Build app";
                };
                snykTest = {
                  text = "${getExe pkgs.nodePackages.snyk} test";
                  runtimeInputs = [ pkgs.python3Full ];
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

