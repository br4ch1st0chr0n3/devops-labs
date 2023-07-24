{
  inputs.flakes.url = "github:deemp/flakes";
  outputs = inputs:
    let flakes = inputs.flakes; in
    flakes.makeFlake {
      inputs = {
        inherit (inputs.flakes.all)
          nixpkgs formatter terrafix codium drv-tools devshell
          flakes-tools workflows haskell-tools env2json json2md
          python-tools;
        app_python = import ./app_python;
        app_purescript = import ./app_purescript;
        root = import ./.;
        inherit flakes;
      };
      perSystem = { inputs, system }:
        let inherit (import ./nix-files/default.nix { inherit inputs system; }) devShells packages; in
        {
          inherit devShells packages;
          formatter = inputs.formatter.${system};
        };
    };

  nixConfig = {
    extra-substituters = [
      "https://nix-community.cachix.org"
      "https://cache.iog.io"
      "https://deemp.cachix.org"
    ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      "hydra.iohk.io:f/Ea+s+dFdN+3Y/G+FDgSq+a5NEWhJGzdjvKNGv0/EQ="
      "deemp.cachix.org-1:9shDxyR2ANqEPQEEYDL/xIOnoPwxHot21L5fiZnFL18="
    ];
  };
}


