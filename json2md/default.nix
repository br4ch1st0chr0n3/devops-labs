{ system ? builtins.currentSystem
, pkgs
, drv-tools
}:
let
  lib = drv-tools.lib.mergeAttrsRecursive [ builtins pkgs.lib drv-tools.lib ];
  json2md =
    # lib.withMeta
    (pkgs.buildNpmPackage rec {
      pname = "json2md";
      version = "2.0.0";

      src = ./.;

      npmDepsHash = "sha256-WjGhOEqL6Zg5tbBHgStr10ROcedJnkWCf5qiDwHOOp8=";
      meta.mainProgram = "json2md";
    });
  # (_: { mainProgram = "json2md"; });

  nix2mdSilent = outPath: dataNix:
    assert lib.isString outPath;
    assert lib.isList dataNix;
    let
      outName = baseNameOf outPath;
      outDir = dirOf outPath;
      tmpJSON = "${outName}.tmp.json";
      writeTmpJSON = lib.writeJSON "pre-md" "./${tmpJSON}" dataNix;
      # json2md = out1.packages.${system}.default;
      mdlint = pkgs.nodePackages.markdownlint-cli2;
      name = "nix-to-md";
    in
    lib.mkShellApp {
      name = name;
      text = ''
        ${lib.getExe writeTmpJSON}
        mkdir -p ${outDir}
        ${lib.getExe json2md} ${tmpJSON} > ${outPath}
        ${lib.getExe' mdlint "markdownlint-cli2-fix"} ${outPath} || echo ""
        rm ${tmpJSON}
      '';
    };

  nix2md = outPath: dataNix:
    assert lib.isString outPath;
    assert lib.isList dataNix;
    let
      nix2md_ = nix2mdSilent outPath dataNix;
      name = nix2md_.name;
    in
    lib.mkShellApp {
      name = name;
      text = ''
        ${lib.getExe nix2md_}
        printf "${lib.framedBrackets "%s"}" "ok ${name}"
      '';
      description = "Convert a Nix expression to ${outPath}";
    }
  ;

  test = lib.mkShellApps {
    testNix2md = {
      text = "${lib.getExe (nix2md "tmp/some.md" [{ h1 = "Some text"; }])}";
    };
  };
in
{
  packages = {
    inherit json2md;
  } // test;
  lib = {
    inherit nix2mdSilent nix2md;
  };
  devShells.default = pkgs.mkShell {
    buildInputs = [ json2md ] ++ lib.attrValues test;
  };
}
