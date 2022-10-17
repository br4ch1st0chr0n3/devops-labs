{ pkgs }:
let
  inherit (pkgs.lib.strings)
    concatMapStringsSep concatStringsSep hasInfix
    stringToCharacters removePrefix removeSuffix;
  inherit (pkgs.lib.attrsets) genAttrs filterAttrs recursiveUpdate mapAttrs' mapAttrsToList;
  inherit (pkgs.lib.trivial) id;
  inherit (pkgs.lib.lists) flatten;
  inherit (pkgs.lib.asserts) assertMsg;
  inherit (builtins)
    mapAttrs elem isAttrs isList isString isFloat
    isBool isInt hasAttr head map typeOf foldl'
    attrValues isNull throw;

  inherit (genAttrs [ "string" "bool" "number" "any" ] (
    name: { __type = name; __toString = self: "${self.__type}"; }
  )) string bool number any;

  optional_ = type: optional type null;
  optional = type: default: {
    __type = "optional";
    __args = {
      inherit type;
      default = mkToString default;
      __toString = self:
        let default_ = toStringPrimitive self.default; in
        ''${type}${
          if default_ == ""
          then "" else ", ${default_}"
        }'';
    };
    __toString = self: ''${self.__type}(${self.__args})'';
  };

  object = args@{ ... }: {
    __type = "object";
    __attrs = (mkToString args) // {
      __toString = self: toStringBody args;
    };
    __toString = self: ''${self.__type}(${self.__attrs})'';
  };

  list = type: {
    __type = "list";
    __toString = self: ''${self.__type}(${type})'';
    __arg = type;
  };

  # Operations

  # these aren't types that belong to HCL's typesystem
  filterOutNonTypes = args@{ ... }: with builtins;
    filterAttrs (name: val: !(elem (typeOf val) [ "lambda" "null" ])) args;

  mkVariables = attrs@{ ... }:
    (mapAttrs (name: value: value // { __toString = toStringBody; }) attrs
    ) // {
      __toString = self: concatStringsSep "\n" (
        mapAttrsToList (name: value: ''variable ${qq name} ${value}'') (filterOutNonTypes self)
      );
    };

  HCL = genAttrs [ "optional" "list" "tuple" "set" "string" "number" "bool" "object" ] (x: x);

  isTypeHCL = type: arg: isAttrs arg && arg.__type == type;
  isOptionalHCL = isTypeHCL HCL.optional;
  isListHCL = isTypeHCL HCL.list;
  isObjectHCL = isTypeHCL HCL.object;
  isStringHCL = isTypeHCL HCL.string;
  isNumberHCL = isTypeHCL HCL.number;
  isBoolHCL = isTypeHCL HCL.bool;
  isPrimitiveHCL = arg: isAttrs arg && elem arg.__type [ HCL.string HCL.number HCL.bool ];

  checkArgType = arg: type:
    (isAttrs arg && type == HCL.object) ||
    (isList arg && type == HCL.list) ||
    ((isInt arg || isFloat arg) && type == HCL.number) ||
    (isString arg && type == HCL.string) ||
    (isBool arg && type == HCL.bool)
  ;

  # check that an argument is of a given type
  assertValueOfType = arg: type:
    assert assertMsg (checkArgType arg type) ''type mismatch: expected HCL ${type}, got Nix ${typeOf arg}'';
    true;

  # check against multiple types
  isOfAnyTypeFrom = arg: types:
    assert isList types;
    foldl' (m: type: m || checkArgType arg type) false types;

  # can be converted into an actual value
  hasOptionalDefault_ = arg:
    if isOptionalHCL arg then arg.__args.default != null || hasOptionalDefault arg.__args.type
    else if isObjectHCL arg then foldl' (m: val: m || hasOptionalDefault val) false (attrValues arg.__attrs)
    # TODO add more checks
    else false;

  # can be used for mapping a variable to a value
  # list(object({a = optional(string, "a")}))
  # if someone accesses this list, one should get a list of objects [{a = "a"}]
  # What should be its length?
  # we'll leave only things that can be turned to values, not lists
  hasOptionalDefault = arg:
    hasOptionalDefault_ arg ||
    (isListHCL arg && hasOptionalDefault arg.__arg);

  toValue = variable@{ ... }:
    let type_ = variable.__type; in
    if type_ == HCL.object then
      let
        withDefaultValues_ = filterAttrs (_: val: hasOptionalDefault_ val) variable.__attrs;
        defaultValues = mapAttrs (_: val: toValue val) withDefaultValues_;
      in
      defaultValues
    # we should not discard the default since we don't yet have a value
    # we should combine type and the default
    else if type_ == HCL.optional then mapToValue_ variable.__args.type variable.__args.default
    else throw ''unexpected HCL ${type_}'';

  mapToValue_ = variable@{ ... }: value:
    let type_ = variable.__type; in
    if type_ == HCL.object && assertValueOfType value type_ then
      let
        withDefaultValues = filterAttrs (_: val: hasOptionalDefault val) (variable.__attrs);
        withDefaultValues_ = filterAttrs (_: val: hasOptionalDefault_ val) withDefaultValues;
        defaultValues = mapAttrs (_: val: toValue val) withDefaultValues_;
        mappedValues =
          mapAttrs
            (name: val:
              let attr = if hasAttr name withDefaultValues then withDefaultValues."${name}" else null; in
              if isNull attr then val else mapToValue_ attr val
            )
            (filterOutNonTypes value);
      in
      # we want to add the missing attributes to a value
      defaultValues // mappedValues

    else if type_ == HCL.list && assertValueOfType value type_ then
      map (val: mapToValue_ variable.__arg val) value
    # we can discard the default since we already have a value
    # no need to check value type since it can't directly represent an optional
    else if type_ == HCL.optional then mapToValue_ variable.__args.type value
    else if isOfAnyTypeFrom value [ HCL.string HCL.number HCL.bool ] then value
    else builtins.throw "not yet implemented for ${type_}";

  # TODO how to represent a list of objects with optional values?
  # we don't
  # TODO how to update lists with such values

  # TODO can there be no type?
  # this is a top set of variables, so, we should to filter out the __toString

  mapToValue = variable@{ ... }: value: mapToValue_ variable.type value;

  # TODO use default values of variables supplied via default

  mkVars = variable_: attrs@{ ... }: (mapAttrs
    (name: val: mkToString
      # FIXME
      (mapToValue variable_."${name}" val)
      # val
    )
    attrs) // {
    __toString = self: noBraces (toStringBody_ "\n\n" self);
  };

  # Representation

  qq = arg: assert isString arg; ''"${arg}"'';

  eot = arg: assert isString arg;
    ''
      <<-EOT
      ${arg}
      EOT
    '';

  toStringPrimitive = arg:
    with builtins;
    if isBool arg then (if arg then "true" else "false")
    else if isString arg then
      (if elem "\n" (stringToCharacters arg) then eot else qq) arg
    else if isList arg then {
      __toString = self: ''[
      ${concatStringsSep ",\n" arg}
      ]'';
    }
    else if elem (typeOf arg) [ "int" "float" "set" ] then "${toString arg}"
    # "path", "lambda", "null"
    else throw "what's your type?";

  braces = x: "{${if x == "" then "" else "\n${x}\n"}}";
  toStringBody_ = nl: args@{ ... }: with builtins; braces
    (
      concatMapStringsSep nl (x: "${x}") (
        attrValues (
          mapAttrs (name: val: "${name} = ${toStringPrimitive val}") (
            filterOutNonTypes args
          )
        )
      )
    );
  toStringBody = toStringBody_ "\n";

  mkToString = arg:
    if isAttrs arg then mkToStringBody arg
    else if isList arg then mkToStringList arg
    else arg;

  # we want to be able to print nested objects
  # that's why, we supplement nested objects with __toString
  mkToStringBody = attrs@{ ... }: with builtins;
    (mapAttrs (_: value: mkToString value) attrs) // {
      __toString = toStringBody;
    };

  # we also want to print lists
  mkToStringList = attrs: assert isList attrs; map (val: mkToString val) attrs;

  noBraces = arg: assert isString arg;
    removePrefix "{" (removeSuffix "}" arg);

  # TODO conditionally setting an optional attribute
  # https://www.terraform.io/language/expressions/type-constraints#example-conditionally-setting-an-optional-attribute


  mkAccessors = attrs@{ ... }: mkAccessors_ attrs "";
  mkAccessors_ = attrs@{ ... }: path:
    (mapAttrs
      (name: val:
        let path_ = "${path}${if path == "" then "" else "."}${name}"; in
        (
          if isAttrs val
          then mkAccessors_ val
          else x: { __toString = self: "${x}"; }
        ) path_
      )
      (filterOutNonTypes attrs)
    ) // (
      let
        # __functor = path_: assert isString path; { };
        __functor = self: path_: mkAccessors_ { } "${path}.${path_}";
        __toString = self: path;
      in
      { inherit __functor __toString; __isArgument = null; }
    );

  # Blocks
  # should make variables available with a set prefix
  # should handle the blocks based on their prefixes
  # will render them

  # assume arguments are values and contain no blocks
  toStringBlockBody = attrs@{ ... }: braces (
    concatStringsSep "\n" (
      # we want a list of representations of body attributes and blocks
      flatten (
        mapAttrsToList
          (name: val:
            if isAttrs val then
              (
                # a new block starts so the new block type won't be a label
                if hasAttr KW.__isArgument val then
                  [ ("${name} = ${toStringBody (mkToStringBody val)}") ]
                # if a new block starts, there go not labels, but block types
                else
                  let isLabel = !hasAttr KW.__isBlock val; in
                  map
                    (x: "${name} ${x}")
                    (mapBlockToString val isLabel)
              )
            else [ ''${name} = ${toStringPrimitive val}'' ]
          )
          (filterOutNonTypes attrs)
      )
    )
  )
  ;

  # how to render them
  mkVariable = { name, value }: value // { __toString = self: ''${qq name} ${toStringBody self}''; };
  # TODO render inner special blocks
  mkResource = { name, value }:
    value // { __toString = self: ''${qq name} ${toStringBody self}''; };

  # return a list of representations
  mapBlockToString = attrs@{ ... }: isLabel:
    assert isBool isLabel;
    if hasAttr KW.__isArgument attrs then [ (toStringBody (mkToStringBody attrs)) ]
    else if hasAttr KW.__isBlock attrs then [ (toStringBlockBody attrs) ]
    # else if hasAttr KW.__toString attrs then [ "${attrs}" ]
    # if hasAttr KW.__toString val then [ "${val}" ]
    # it's a part of a header of a block
    else
      flatten
        (
          mapAttrsToList
            (name: val:
              if isAttrs val then
                let
                  name_ = (if isLabel then qq else id) name;
                  infix = if hasAttr KW.__isArgument val then " = " else " ";
                  reprs = mapBlockToString val true;
                in
                map (val_: "${name_}${infix}${val_}") reprs
              else [ "${name} = ${val}" ]
            )
            (filterOutNonTypes attrs)
        )
  ;

  # block
  b = attrs@{ ... }: attrs // { __isBlock = null; };
  # argument
  a = attrs@{ ... }: attrs // { __isArgument = null; };

  ifHasAttr = attr: f: attrs@{ ... }: attrs // (
    if hasAttr attr attrs then { "${attr}" = f attr; } else { }
  );
  # no qq since top resource types have no quotation marks
  # TODO add as toString
  mkBlocks = mkBlocks_ { };

  # keywords
  KW = genAttrs [ "__" "local" "locals" "resource" "__isArgument" "__isBlock" "__toString" ] id;

  mkBlocks_ = __@{ ... }: attrs@{ ... }:
    let as =
      mapAttrs
        (name: val@{ ... }:
          val // {
            __toString = self:
              let infix = if hasAttr KW.__isArgument val then " = " else " "; in
              concatStringsSep "\n" (
                map (str: "${name}${infix}${str}")
                  (mapBlockToString val true)
              );
          })
        attrs;
    in
    as // (
      let
        std =
          {
            __toString = self:
              concatStringsSep "\n" (
                attrValues (filterAttrs (name: _: name != KW.__) (filterOutNonTypes self))
              );

            __ = recursiveUpdate __
              (
                {
                  local =
                    if hasAttr KW.locals as then mkAccessors_ (as.locals) KW.local else { };
                }
                // (if hasAttr KW.resource as then mkAccessors (filterOutNonTypes as.resource) else { })
              );
          };
        cont = {
          # Set -> (Set -> Set) -> Set
          __functor = self: x:
            (
              y: y // { __toString = self_: "${self}\n${y}"; }
            ) (mkBlocks_ self.__ (x self.__));
        };
      in
      std // cont
    );

  # TODO use filterAttrsRecursive?

  # mkBlocks {} {}

  # TODO should variables be declared separately?

  testBlocks = mkBlocks {
    terraform = b {
      required_providers = a {
        docker = a {
          source = "kreuzwerker/docker";
          version = "~> 2.22.0";
        };
      };
    };
    resource.b = b { d = b { }; };
    variable = a { };
  };

  # Tests

  t = list (object {
    name = string;
    enabled = optional bool true;
    website = optional
      (object {
        index_document = optional string "index.html";
        error_document = optional string "error.html";
        routing_rules = optional_ string;
      })
      { };
  });


  variable = mkVariables (genAttrs apps (app: {
    type = object {
      DIR = optional string "/app";
      DOCKER_PORT = optional number 80;
      HOST = optional string "0.0.0.0";
      NAME = optional string "renamed_${app}";
      HOST_PORT = number;
    };
  }));


  appPurescript = "app_purescript";
  appPython = "app_python";
  apps = [ appPurescript appPython ];

  var_ = mkVars variable {
    "${appPython}" = {
      HOST_PORT = 8002;
    };
    "${appPurescript}" = {
      HOST_PORT = 8003;
    };
  };

  inherit (mkAccessors { var = var_; }) var;

  testVariable = mkVariables {
    a = { type = object { a = number; }; };
    b = { type = optional string "b"; };
    buckets = { type = t; };
  };

  testVar = mkVars testVariable {
    a = { a = 100; };
    b = "c";
    buckets = [
      {
        name = "production";
        website = {
          routing_rules =
            ''
              [
                {
                  "Condition" = { "KeyPrefixEquals": "img/" }
                  "Redirect"  = { "ReplaceKeyPrefixWith": "images/" }
                }
              ]
            '';
        };
      }
      {
        name = "archived";
        enabled = false;
      }
      {
        name = "docs";
        website = {
          index_document = "index.txt";
          error_document = "error.txt";
        };
      }
    ];
  };

  # circular dependency?
  mainTF =
    mkBlocks
      {
        terraform = b {
          required_providers = a {
            docker = a {
              source = "kreuzwerker/docker";
              version = "~> 2.22.0";
            };
          };
        };
        resource.docker_image.try_app_python = b {
          name = "dademd/app_python:latest";
          keep_locally = false;
        };
        locals = b {
          path_app_python = "";
          path_app_purescript = "";
        };
      }
      (__: {
        resource.docker_container.try_app_python = b {
          image = __.docker_image.try_app_python "image_id";

          # name = "try_app_python";
          # restart = "always";
          # volumes = b {
          #   container_path = __.var.app_python_env.DIR;
          #   host_path = __.local.path_app_python;
          #   read_only = false;
          # };
          # ports = b {
          #   internal = __.var.app_python_env.DOCKER_PORT;
          #   external = __.var.app_python_env.HOST_PORT;
          # };
          # env = [ "HOST=${__.var.app_python_env.HOST}" "PORT=${__.var.app_python_env.DOCKER_PORT}" ];
          # host = b {
          #   host = "localhost";
          #   ip = __.var.app_python_env.HOST;
          # };
        };
      }
      );

  # f = x: with { y = 4; }; x;
  # g = f { inherit y; };
in
{
  # inherit g;
  inherit t var_ variable mapToValue;
  inherit testVar testVariable;
  inherit var;
  inherit testBlocks;
  inherit mainTF;
}
