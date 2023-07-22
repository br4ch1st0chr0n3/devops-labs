{ inputs, system }:
let
  pkgs = inputs.nixpkgs.legacyPackages.${system};
  inherit (inputs.codium.lib.${system}) mkCodium extensions extensionsCommon settingsCommonNix settingsCommon;
  inherit (inputs.drv-tools.lib.${system}) toList mkShellApp mkShellApps mkBin framedBrackets framedNewlines;
  inherit (inputs.flakes-tools.lib.${system}) mkFlakesTools;
  inherit (inputs.devshell.lib.${system}) mkCommands mkRunCommands mkShell;
  inherit (inputs.python-tools.lib.${system}) createVenvs;
  inherit (import ./data.nix) appPurescript appPython langPurescript langPython;
  inherit (builtins) map attrValues;

  writeConfigs = import ./write-configs.nix { inherit system pkgs commands inputs; };

  commands = import ./commands.nix {
    inherit pkgs system inputs;
    scripts = {
      ${langPurescript} = inputs.${appPurescript}.packages.${system};
      ${langPython} = inputs.${appPython}.packages.${system};
    };
  };

  dirs = [ appPurescript appPython ];

  tools = attrValues {
    inherit (pkgs)
      docker poetry direnv lorri
      rnix-lsp nixpkgs-fmt dhall-lsp-server
      geckodriver terraform terraform-ls
      kubernetes minikube kubernetes-helm
      sops age hadolint
      ;
  };

  scripts =
    let
      HELM_PLUGINS = "$HELM_PLUGINS";
      HELM_CONFIG_HOME = "$HELM_CONFIG_HOME";
      AGE_HOME = "$AGE_HOME";
    in
    (mkShellApps {
      lintDockerfiles =
        let
          dockerFile = "Dockerfile";
          dirs = [ appPython appPurescript ];
          inherit (pkgs.lib.strings) concatMapStringsSep concatStringsSep;
        in
        {
          runtimeInputs = [ pkgs.haskellPackages.hadolint ];
          text = ''
            set +e
            ${concatMapStringsSep
              ''printf "\n" ; ''
              (dir: '' ( printf "${framedBrackets "linting in ${dir}"}" ; hadolint ${dir}/${dockerFile});'')
              dirs
            }'';
          description = ''Lint dockerfiles in given directories'';
          longDescription = ''Lint ${dockerFile}s in ${concatStringsSep ", " dirs}'';
        };
      monitor = {
        text = ''
          set -a
          source .env
          cd monitoring
          source configs/datasources/.env
          docker compose up
        '';
        description = "Monitor via Prometheus";
        runtimeInputs = [ pkgs.docker ];
      };
      # variables are set in .env
      # Here, they're used just to create dirs
      init = {
        text = ''
          printf "${framedNewlines "Creating directories for `Helm`"}"
          mkdir -p ${HELM_PLUGINS}
          mkdir -p ${HELM_CONFIG_HOME}

          printf "${framedNewlines "Creating directories for `sops` and `age`"}"
          mkdir -p ${AGE_HOME}

          printf "${framedNewlines "Installing helm plugins into ${HELM_PLUGINS}"}"
          helm plugin install https://github.com/databus23/helm-diff || echo "installed 'helm-diff'"
          helm plugin install https://github.com/jkroepke/helm-secrets || echo "installed 'helm-secrets'"
        '';
        description = "Prepare for using `helm` and `sops`";
        runtimeInputs = [ pkgs.kubernetes-helm ];
      };
    })
    // {
      createVenvs = createVenvs [ appPython appPurescript ];
    };

  packages = {
    codium = mkCodium {
      extensions = extensionsCommon // {
        inherit (extensions) purescript docker python toml fish kubernetes terraform;
      };
    };
    inherit (mkFlakesTools { dirs = [ appPurescript appPython "." ]; inherit (inputs) root; }) updateLocks saveFlakes format;
  }
  // writeConfigs
  // commands.apps
  // scripts;

  devShells.default = mkShell {
    bash.extra = "";
    packages = [ ];
    commands =
      (mkCommands "packages" tools) ++
      (mkRunCommands "configs" writeConfigs) ++
      (mkRunCommands "apps-commands" commands.apps) ++
      (mkRunCommands "scripts" scripts);
  }
  ;
in
{
  inherit devShells packages;
}
