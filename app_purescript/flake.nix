{
  description = "app_purescript flake";

  inputs = {
    nixpkgs_.url = github:br4ch1st0chr0n3/flakes?dir=source-flake/nixpkgs;
    flake-utils_.url = github:br4ch1st0chr0n3/flakes?dir=source-flake/flake-utils;
    easy-purescript-nix_.url = github:br4ch1st0chr0n3/flakes?dir=source-flake/easy-purescript-nix;
    drv-tools.url = github:br4ch1st0chr0n3/flakes?dir=drv-tools;
    python-tools.url = github:br4ch1st0chr0n3/flakes?dir=language-tools/python;
    nixpkgs.follows = "nixpkgs_/nixpkgs";
    flake-utils.follows = "flake-utils_/flake-utils";
    easy-purescript-nix.follows = "easy-purescript-nix_/easy-purescript-nix";
  };

  outputs =
    { self
    , nixpkgs
    , easy-purescript-nix
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
          inherit (drv-tools.functions.${system})
            mkShellApp
            mkShellApps
            mkDevShellsWithDefault
            ;

          tools = {
            inherit (import easy-purescript-nix { inherit pkgs; }) purs-0_15_4 spago;
            inherit (pkgs) nodejs-16_x;
          };

          psInputs = builtins.attrValues tools;
          scripts =
            mkShellApps
              {
                run-start =
                  {
                    runtimeInputs = psInputs;
                    text =
                      let
                        dotenvFile = "app.env";
                        spago_ = "spago";
                      in
                      ''
                        ${spago_} install
                        ${spago_} build
                        source ${dotenvFile}
                        npx parcel serve -p $PORT --host $HOST dev/index.html
                      '';
                  };
                test = {
                  # https://github.com/mozilla/geckodriver/releases/tag/v0.31.0
                  text = ''
                    poetry install
                    ${activateVenv}
                    set +e
                    nix run .#run-start &
                    parcel_pid=$!
                    ADDRESS=
                    poetry run python ${./scripts/wait-for-server.py}
                    mkdir -p test_tmp
                    export TMPDIR=test_tmp
                    poetry run pytest -rX --rootdir test --driver Firefox
                    kill $parcel_pid
                    echo "test finished"
                  '';
                  runtimeInputs = psInputs ++ [ pkgs.poetry ];
                };
              };
          inherit (python-tools.snippets.${system}) activateVenv;
          devShells = mkDevShellsWithDefault
            {
              buildInputs = builtins.attrValues scripts ++ [ pkgs.poetry ];
              shellHook = ''
                ${activateVenv}
              '';
            }
            {
              fish = { };
            };
        in
        {
          inherit scripts;
          packages = scripts;
          inherit devShells;
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
