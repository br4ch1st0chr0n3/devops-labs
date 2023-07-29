{
  description = "PureScript app flake";

  inputs = {
    firefox-darwin.url = "github:bandithedoge/nixpkgs-firefox-darwin";
    purescript-overlay.url = "github:deemp/purescript-overlay";

    purifix.url = "github:purifix/purifix";
    purifix.inputs.easy-purescript-nix.follows = "easy-purescript-nix";
    easy-purescript-nix.url = "github:justinwoo/easy-purescript-nix";

    dream2nix.url = "github:nix-community/dream2nix/legacy";
    dream2nix.inputs.nixpkgs.follows = "purescript-overlay/nixpkgs";
  };
  outputs = inputs:
    let flakes = (import ../.).outputs.inputs.flakes; in
    flakes.makeFlake {
      inputs = {
        inherit (flakes.all) nixpkgs poetry2nix codium drv-tools devshell purescript-tools;
        inherit (inputs) firefox-darwin purescript-overlay purifix dream2nix;
      };
      perSystem = { inputs, system }:
        let
          pkgs = inputs.nixpkgs.legacyPackages.${system};
          inherit (inputs.drv-tools.lib.${system}) mkShellApps getExe mapGenAttrs;
          inherit (inputs.devshell.lib.${system}) mkShell mkRunCommands;
          inherit (inputs.codium.lib.${system}) mkCodium extensions extensionsCommon settingsCommonNix settingsNix writeSettingsJSON;
          pkgs-firefox = pkgs.extend inputs.firefox-darwin.overlay;
          inherit (pkgs.extend inputs.poetry2nix.overlay) poetry2nix;
          pkgs-ps = pkgs.extend inputs.purescript-overlay.overlays.default;
          spago = pkgs-ps.spago-unstable;
          purs = pkgs-ps.purs-unstable;
          purs-tidy = pkgs-ps.purs-tidy;
          nodejs = pkgs.nodejs_18;

          inherit (import inputs.nixpkgs {
            inherit system;
            overlays = [
              (self: super: { purescript = purs; })
              inputs.purifix.overlay
            ];
          }) purifix;

          py = {
            args = {
              projectDir = ./test;
              preferWheels = true;
              python = pkgs.python3;
            };
            app = poetry2nix.mkPoetryApplication py.args;
            env = poetry2nix.mkPoetryEnv py.args;
          };

          ps = {
            app = purifix { src = ./.; };

            bundle = (ps.app.bundle {
              format = "esm";
              minify = true;
            });

            dev = pkgs.stdenv.mkDerivation {
              pname = "dev";
              version = "0.0.1";
              phases = [ "installPhase" ];
              installPhase = ''
                APP=$out/app
                mkdir -p $APP

                OUTPUT=$APP/output
                mkdir $OUTPUT

                DEV=$APP/dev
                mkdir $DEV

                BIN=$out/bin
                mkdir $BIN
                for i in ${packages.js.app}/lib/node_modules/.bin/*; do
                  ln -s $i $BIN/$(basename $i)
                done
              '';
            };

            release = pkgs.stdenv.mkDerivation {
              pname = "release";
              version = "0.0.1";
              phases = [ "installPhase" ];
              installPhase = ''
                APP=$out/app
                mkdir -p $APP

                DIST=$APP/output/Main
                mkdir -p $DIST
                cp ${ps.bundle} $DIST/index.js
              
                DEV=$APP/dev
                mkdir -p $DEV
                cp -r ${./dev}/* $DEV
              
                BIN=$out/bin
                mkdir -p $BIN
                for i in ${packages.js.app}/lib/node_modules/.bin/*; do
                  ln -s $i $BIN/$(basename $i)
                done
              '';
            };

            docker = {
              release = pkgs.dockerTools.streamLayeredImage {
                name = "app_purescript_release";
                tag = "latest";
                contents = [
                  ps.release
                  pkgs.bashInteractive
                  pkgs.findutils
                ];
                config.Entrypoint = [ "bash" "-c" ];
              };

              dev = pkgs.dockerTools.streamLayeredImage {
                name = "app_purescript_dev";
                tag = "latest";
                contents = [
                  ps.dev
                  pkgs.bashInteractive
                  pkgs.findutils
                  pkgs.coreutils
                ];
                config.Entrypoint = [ "bash" "-c" ];
              };
            };
          };

          js = {
            app = (inputs.dream2nix.lib.makeFlakeOutputs {
              systems = [ system ];
              config.projectRoot = ./.;
              source = ./.;
              # autoProjects = true;
              projects = {
                app_purescript = {
                  name = "app_purescript";
                  relPath = "";
                  subsystem = "nodejs";
                  translator = "package-lock";
                  subsystemInfo = {
                    nodejs = 18;
                  };
                };
              };
            }).packages.${system}.app_purescript;
          };

          packages =
            mkShellApps
              {
                script.kill = {
                  text = ''
                    lsof -i :$PORT | grep node | awk '{print $2}' | xargs -I {} kill {} &
                    wait
                  '';
                  runtimeInputs = [ pkgs.findutils ];
                };

                script.dev = {
                  runtimeInputs = [ purs spago nodejs ];
                  text = ''
                    sleep 99999 | npx esbuild dev/main.js --outfile=dev/index.js --bundle --watch &
                    npx parcel serve -p $PORT --host $HOST dev/index.html &
                  '';
                  description = "Run app";
                };

                script.test = {
                  text = ''
                    cd test
                    python -m pytest -rX --driver Firefox
                  '';
                  runtimeInputs = [ pkgs.poetry py.env pkgs.geckodriver pkgs-firefox.firefox-bin ];
                };

                local.test = {
                  # https://github.com/mozilla/geckodriver/releases/tag/v0.31.0
                  text = ''
                    set -a
                    source ${./local.env}
                    ${getExe packages.script.kill}
                    ${getExe packages.script.dev} &
                    ${getExe packages.script.test} &
                    wait $!
                    ${getExe packages.script.kill}
                  '';
                  description = "Test app";
                };

                local.dev = {
                  runtimeInputs = [ purs spago nodejs ];
                  text = ''
                    set -a
                    source ${./local.env}
                    ${getExe packages.script.kill}
                    ${getExe packages.script.dev}
                    ${getExe packages.script.kill}
                  '';
                  description = "Run app in dev mode";
                };

                docker.release = {
                  runtimeInputs = [ pkgs.docker ];
                  text = ''
                    ${ps.docker.release} | docker load
                    docker compose up release
                  '';
                  description = "Run release container";
                };

                docker.dev = {
                  runtimeInputs = [ pkgs.docker ];
                  text = ''
                    ${ps.docker.dev} | docker load
                    docker compose up dev
                  '';
                  description = "Run dev container";
                };

                snyk.test = {
                  text = "snyk test";
                  runtimeInputs = [ pkgs.python3 pkgs.nodePackages.snyk ];
                  description = "Test app with Snyk";
                };

                codium = mkCodium { extensions = extensionsCommon // { inherit (extensions) purescript; }; };
                writeSettings = writeSettingsJSON (settingsCommonNix // {
                  inherit (settingsNix) ide-purescript; extra = {
                  "purescript.buildCommand" = "spago build --json-errors";
                };
                });
              } // {
              inherit ps js py;
            };

          tools = {
            py = [ pkgs.poetry ];
            ps = [ purs spago purs-tidy nodejs ];
          };

          devShells.default = mkShell {
            packages = [
              tools.py
              py.env
              tools.ps
            ];
            commands =
              mkRunCommands "scripts"
                (
                  mapGenAttrs (x: { ${x.pname} = x; }) [
                    packages.docker.dev
                    packages.docker.release

                    packages.local.dev
                    packages.local.test

                    packages.snyk.test
                  ]
                )
              ++ mkRunCommands "ide" { inherit (packages) writeSettings; "codium ." = packages.codium; };
          };
        in
        {
          inherit devShells packages;
          inherit py ps js;
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

