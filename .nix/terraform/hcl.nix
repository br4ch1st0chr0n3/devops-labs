{ pkgs }:
let
  inherit (pkgs.lib.strings)
    concatMapStringsSep concatStringsSep hasInfix
    stringToCharacters removePrefix removeSuffix;
  inherit (pkgs.lib.attrsets)
    genAttrs filterAttrs recursiveUpdate mapAttrs' mapAttrsToList;
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

  # block
  b = attrs@{ ... }: attrs // { __isBlock = null; };
  # argument
  a = attrs@{ ... }: attrs // { __isArgument = null; };

  # Standard library
  _lib = {
    abspath = arg: assert isString arg; {
      __toString = self: "abspath(${qq arg})";
      __isArgument = null;
      __hasToString = null;
    };
  } // mkAccessors {
    path.root = "";
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

  # new set if attribute is present else an empty set
  # String -> Set -> Set -> Set
  ifHasAttr = attr: attrs@{ ... }: expr: 
    if hasAttr attr attrs then expr else { };

  # map a function to a list of sets and then merge them
  # [Set] -> (Any -> Any) -> Set
  map_ = list: f: foldl' (x: y: recursiveUpdate x y) { } (map f list);

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

  # convert a variable to a value
  # if a variable contains an object with some optional default values
  # or optionals themselves
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


  # TODO how to represent a list of objects with optional values?
  # we don't
  # TODO how to update lists with such values

  # TODO can there be no type?
  # this is a top set of variables, so, we should to filter out the __toString

  mapToValue = variable@{ ... }: value: mapToValue_ variable.type value;

  # use variable as a template to supplement the value
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

  # Take a Set of variables and a Set of values
  # use variables as templates to supplement these values
  mkVariableValues = variables: attrs@{ ... }:
    let val_ = (mapAttrs
      (name: val: mkToString
        # FIXME
        (mapToValue variables."${name}" val)
        # val
      )
      attrs) // {
      __toString = self: toStringBody_ "\n\n" false self;
    };
    in val_ // { __ = mkAccessors { var = val_; }; };

  # Representation
  qq = x: ''"${x}"'';
  bb = x: "$" + "{${x}}";

  eot = arg: assert isString arg;
    ''
      <<-EOT
      ${arg}
      EOT
    '';

  brackets = x: "[${if x == "" then "" else "\n${x}\n"}]";
  braces = x: "{${if x == "" then "" else "\n${x}\n"}}";

  # toString any primitive value
  toStringPrimitive = arg:
    with builtins;
    if isBool arg then (if arg then "true" else "false")
    else if isString arg then
      (if elem "\n" (stringToCharacters arg) then eot else qq) arg
    # TODO what if a list of objects?
    else if isList arg then {
      __toString = self: brackets (
        concatMapStringsSep ",\n" toStringPrimitive arg
      );
    }
    else if elem (typeOf arg) [ "int" "float" "set" ] then "${toString arg}"
    # "path", "lambda", "null"
    else throw "what's your type?";

  # string representation of a body of an argument
  # we assume that it doesn't contain any blocks
  toStringBody = toStringBody_ "\n" true;
  toStringBody_ = nl: needBraces: attrs@{ ... }:
    # FIXME infinite recursion here
    if hasAttr KW.__hasToString attrs then attrs.__toString { }
    else
      (if needBraces then braces else id) (
        concatMapStringsSep nl (x: "${x}") (
          attrValues (
            mapAttrs (name: val: "${name} = ${toStringPrimitive val}") (
              filterOutNonTypes attrs
            )
          )
        )
      );

  # make argument values toString-able
  mkToString = arg:
    if isAttrs arg then mkToStringBody arg
    else if isList arg then mkToStringList arg
    else arg;

  # make objects and their values toString-able
  # we want to be able to print nested objects
  mkToStringBody = attrs@{ ... }:
    if hasAttr KW.__hasToString attrs then attrs
    else
      (mapAttrs (_: value: mkToString value) attrs) // {
        __toString = toStringBody;
      };

  # make lists toString-able
  mkToStringList = attrs: assert isList attrs; map (val: mkToString val) attrs;

  # TODO conditionally setting an optional attribute syntax
  # https://www.terraform.io/language/expressions/type-constraints#example-conditionally-setting-an-optional-attribute

  # add special attributes to object values so that
  # we can get a chain "a.b.c" when toString a.b.c
  mkAccessors = attrs@{ ... }: mkAccessors_ attrs "";
  mkAccessors_ = attrs@{ ... }: path:
    (mapAttrs
      (name: val:
        let path_ = "${path}${if path == "" then "" else "."}${name}"; in
        (
          if isAttrs val
          then mkAccessors_ val
          else x: {
            __toString = self: "${x}";
            __isArgument = null;
            __hasToString = null;
          }
        ) path_
      )
      (filterOutNonTypes attrs)
    ) // (
      let
        __functor = self: path_: mkAccessors_ { } "${path}.${path_}";
        __toString = self: path;
        __isArgument = null;
        # a special attribute that allows for custom toString representations
        __hasToString = null;
      in
      { inherit __functor __toString __hasToString __isArgument; }
    );

  # toString a block body
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
                    (toStringBlock val isLabel)
              )
            else [ ''${name} = ${toStringPrimitive val}'' ]
          )
          (filterOutNonTypes attrs)
      )
    )
  )
  ;

  # return a list of representations 
  # of blocks (a "b" "c" { ... })
  # and arguments (a = { ... })
  toStringBlock = attrs@{ ... }: isLabel:
    assert isBool isLabel;
    if hasAttr KW.__isArgument attrs then [ (toStringBody (mkToStringBody attrs)) ]
    else if hasAttr KW.__isBlock attrs then [ (toStringBlockBody attrs) ]
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
                  reprs = toStringBlock val true;
                in
                map (val_: "${name_}${infix}${val_}") reprs
              else [ "${name} = ${val}" ]
            )
            (filterOutNonTypes attrs)
        )
  ;

  # keywords
  KW = genAttrs [
    "__"
    "local"
    "locals"
    "resource"
    "var"
    "__isArgument"
    "__isBlock"
    "__toString"
    "__hasToString"
  ]
    id;

  # construct blocks and arguments from a set
  mkBlocks = mkBlocks_ { };
  mkBlocks_ = __@{ ... }: attrs@{ ... }:
    let as =
      mapAttrs
        (name: val@{ ... }:
          val // {
            __toString = self:
              let infix = if hasAttr KW.__isArgument val then " = " else " "; in
              concatStringsSep "\n" (
                map (str: "${name}${infix}${str}")
                  (toStringBlock val true)
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
                  local = ifHasAttr KW.locals as (mkAccessors_ (as.locals) KW.local);
                }
                // (ifHasAttr KW.resource as (mkAccessors (filterOutNonTypes as.resource)))
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

  # Tests -----------

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

  testType = list (object {
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

  testVariable = mkVariables {
    a = { type = object { a = number; }; };
    b = { type = optional string "b"; };
    buckets = { type = testType; };
  };

  testVar = mkVariableValues testVariable {
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

  # Docker

  appPurescript = "app_purescript";
  appPython = "app_python";
  apps = [ appPurescript appPython ];
  _mod = x: { try = "try_${x}"; path = "path_${x}"; };

  variablesTF = mkVariables (genAttrs apps (app: {
    type = object {
      DIR = optional string "/app";
      DOCKER_PORT = optional number 80;
      HOST = optional string "0.0.0.0";
      NAME = optional string "renamed_${app}";
      HOST_PORT = number;
    };
  }));

  tfvarsTF = mkVariableValues variablesTF {
    "${appPython}" = {
      HOST_PORT = 8002;
    };
    "${appPurescript}" = {
      HOST_PORT = 8003;
    };
  };

  # Should add stuff so that we don't refer to non-existing attributes
  mainTF =
    mkBlocks_ (tfvarsTF.__)
      (
        {
          terraform = b {
            required_providers = a {
              docker = a {
                source = "kreuzwerker/docker";
                version = "~> 2.22.0";
              };
            };
          };
        }
        // map_ apps (app:
          let app_ = _mod app; in
          {
            resource.docker_image =
              {
                "${app_.try}" = b {
                  name = "dademd/${app}:latest";
                  keep_locally = false;
                };
              };
            locals = b {
              "${app_.path}" = _lib.abspath "${bb _lib.path.root}/../../${app}";
            };
          }
        )
      )
      (__: map_ apps
        (
          app:
          let app_ = _mod app; in
          {
            resource.docker_container."${app_.try}" = b {
              image = __.docker_image."${app_.try}" "image_id";
              name = "${app_.try}";
              restart = "always";
              volumes = a {
                container_path = __.var."${app}".DIR;
                host_path = __.local."${app_.path}";
                read_only = false;
              };
              ports = a {
                internal = __.var."${app}".DOCKER_PORT;
                external = __.var."${app}".HOST_PORT;
              };
              env = [ "HOST=${bb __.var."${app}".HOST}" "PORT=${bb __.var."${app}".DOCKER_PORT}" ];
              host = b {
                host = "localhost";
                ip = __.var."${app}".HOST;
              };
            };
          }
        )
      );
in
{
  inherit testType mapToValue;
  inherit testVar testVariable;
  inherit testBlocks;
  inherit tfvarsTF variablesTF mainTF;
}
