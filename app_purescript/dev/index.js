(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target5, all4) => {
    for (var name15 in all4)
      __defProp(target5, name15, { get: all4[name15], enumerable: true });
  };
  var __copyProps = (to, from3, except, desc) => {
    if (from3 && typeof from3 === "object" || typeof from3 === "function") {
      for (let key of __getOwnPropNames(from3))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod4) => __copyProps(__defProp({}, "__esModule", { value: true }), mod4);

  // output/Control.Apply/foreign.js
  var init_foreign = __esm({
    "output/Control.Apply/foreign.js"() {
    }
  });

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn;
  var init_Control = __esm({
    "output/Control.Semigroupoid/index.js"() {
      semigroupoidFn = {
        compose: function(f) {
          return function(g) {
            return function(x) {
              return f(g(x));
            };
          };
        }
      };
    }
  });

  // output/Control.Category/index.js
  var identity, categoryFn;
  var init_Control2 = __esm({
    "output/Control.Category/index.js"() {
      init_Control();
      init_Control();
      identity = function(dict) {
        return dict.identity;
      };
      categoryFn = {
        identity: function(x) {
          return x;
        },
        Semigroupoid0: function() {
          return semigroupoidFn;
        }
      };
    }
  });

  // output/Data.Boolean/index.js
  var otherwise;
  var init_Data = __esm({
    "output/Data.Boolean/index.js"() {
      otherwise = true;
    }
  });

  // output/Data.Function/index.js
  var flip, $$const;
  var init_Data2 = __esm({
    "output/Data.Function/index.js"() {
      init_Control2();
      init_Data();
      init_Control2();
      flip = function(f) {
        return function(b2) {
          return function(a2) {
            return f(a2)(b2);
          };
        };
      };
      $$const = function(a2) {
        return function(v) {
          return a2;
        };
      };
    }
  });

  // output/Data.Functor/foreign.js
  var arrayMap;
  var init_foreign2 = __esm({
    "output/Data.Functor/foreign.js"() {
      arrayMap = function(f) {
        return function(arr) {
          var l = arr.length;
          var result = new Array(l);
          for (var i2 = 0; i2 < l; i2++) {
            result[i2] = f(arr[i2]);
          }
          return result;
        };
      };
    }
  });

  // output/Data.Unit/foreign.js
  var unit;
  var init_foreign3 = __esm({
    "output/Data.Unit/foreign.js"() {
      unit = void 0;
    }
  });

  // output/Data.Unit/index.js
  var init_Data3 = __esm({
    "output/Data.Unit/index.js"() {
      init_foreign3();
      init_foreign3();
    }
  });

  // output/Type.Proxy/index.js
  var init_Type = __esm({
    "output/Type.Proxy/index.js"() {
    }
  });

  // output/Data.Functor/index.js
  var map, $$void, voidLeft, voidRight, functorArray;
  var init_Data4 = __esm({
    "output/Data.Functor/index.js"() {
      init_foreign2();
      init_Control();
      init_Data2();
      init_Data3();
      init_Type();
      map = function(dict) {
        return dict.map;
      };
      $$void = function(dictFunctor) {
        return map(dictFunctor)($$const(unit));
      };
      voidLeft = function(dictFunctor) {
        var map110 = map(dictFunctor);
        return function(f) {
          return function(x) {
            return map110($$const(x))(f);
          };
        };
      };
      voidRight = function(dictFunctor) {
        var map110 = map(dictFunctor);
        return function(x) {
          return map110($$const(x));
        };
      };
      functorArray = {
        map: arrayMap
      };
    }
  });

  // output/Control.Apply/index.js
  var identity2, apply, applySecond;
  var init_Control3 = __esm({
    "output/Control.Apply/index.js"() {
      init_foreign();
      init_Control2();
      init_Data2();
      init_Data4();
      init_Type();
      init_Data4();
      identity2 = /* @__PURE__ */ identity(categoryFn);
      apply = function(dict) {
        return dict.apply;
      };
      applySecond = function(dictApply) {
        var apply1 = apply(dictApply);
        var map21 = map(dictApply.Functor0());
        return function(a2) {
          return function(b2) {
            return apply1(map21($$const(identity2))(a2))(b2);
          };
        };
      };
    }
  });

  // output/Control.Applicative/index.js
  var pure, unless, when, liftA1;
  var init_Control4 = __esm({
    "output/Control.Applicative/index.js"() {
      init_Control3();
      init_Data4();
      init_Data3();
      init_Type();
      init_Control3();
      init_Data4();
      pure = function(dict) {
        return dict.pure;
      };
      unless = function(dictApplicative) {
        var pure13 = pure(dictApplicative);
        return function(v) {
          return function(v1) {
            if (!v) {
              return v1;
            }
            ;
            if (v) {
              return pure13(unit);
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
          };
        };
      };
      when = function(dictApplicative) {
        var pure13 = pure(dictApplicative);
        return function(v) {
          return function(v1) {
            if (v) {
              return v1;
            }
            ;
            if (!v) {
              return pure13(unit);
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
          };
        };
      };
      liftA1 = function(dictApplicative) {
        var apply3 = apply(dictApplicative.Apply0());
        var pure13 = pure(dictApplicative);
        return function(f) {
          return function(a2) {
            return apply3(pure13(f))(a2);
          };
        };
      };
    }
  });

  // output/Control.Bind/foreign.js
  var init_foreign4 = __esm({
    "output/Control.Bind/foreign.js"() {
    }
  });

  // output/Control.Bind/index.js
  var identity3, discard, bind, bindFlipped, composeKleisliFlipped, discardUnit, join;
  var init_Control5 = __esm({
    "output/Control.Bind/index.js"() {
      init_foreign4();
      init_Control4();
      init_Control3();
      init_Control2();
      init_Data2();
      init_Data4();
      init_Type();
      init_Control4();
      init_Control3();
      init_Data4();
      identity3 = /* @__PURE__ */ identity(categoryFn);
      discard = function(dict) {
        return dict.discard;
      };
      bind = function(dict) {
        return dict.bind;
      };
      bindFlipped = function(dictBind) {
        return flip(bind(dictBind));
      };
      composeKleisliFlipped = function(dictBind) {
        var bindFlipped12 = bindFlipped(dictBind);
        return function(f) {
          return function(g) {
            return function(a2) {
              return bindFlipped12(f)(g(a2));
            };
          };
        };
      };
      discardUnit = {
        discard: function(dictBind) {
          return bind(dictBind);
        }
      };
      join = function(dictBind) {
        var bind15 = bind(dictBind);
        return function(m) {
          return bind15(m)(identity3);
        };
      };
    }
  });

  // output/Control.Monad/index.js
  var unlessM, ap;
  var init_Control6 = __esm({
    "output/Control.Monad/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Data4();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Data4();
      unlessM = function(dictMonad) {
        var bind7 = bind(dictMonad.Bind1());
        var unless2 = unless(dictMonad.Applicative0());
        return function(mb) {
          return function(m) {
            return bind7(mb)(function(b2) {
              return unless2(b2)(m);
            });
          };
        };
      };
      ap = function(dictMonad) {
        var bind7 = bind(dictMonad.Bind1());
        var pure10 = pure(dictMonad.Applicative0());
        return function(f) {
          return function(a2) {
            return bind7(f)(function(f$prime) {
              return bind7(a2)(function(a$prime) {
                return pure10(f$prime(a$prime));
              });
            });
          };
        };
      };
    }
  });

  // output/Data.Semigroup/foreign.js
  var concatString, concatArray;
  var init_foreign5 = __esm({
    "output/Data.Semigroup/foreign.js"() {
      concatString = function(s1) {
        return function(s2) {
          return s1 + s2;
        };
      };
      concatArray = function(xs) {
        return function(ys) {
          if (xs.length === 0)
            return ys;
          if (ys.length === 0)
            return xs;
          return xs.concat(ys);
        };
      };
    }
  });

  // output/Data.Symbol/foreign.js
  var init_foreign6 = __esm({
    "output/Data.Symbol/foreign.js"() {
    }
  });

  // output/Data.Symbol/index.js
  var init_Data5 = __esm({
    "output/Data.Symbol/index.js"() {
      init_foreign6();
      init_Type();
    }
  });

  // output/Data.Void/index.js
  var init_Data6 = __esm({
    "output/Data.Void/index.js"() {
    }
  });

  // output/Record.Unsafe/foreign.js
  var init_foreign7 = __esm({
    "output/Record.Unsafe/foreign.js"() {
    }
  });

  // output/Record.Unsafe/index.js
  var init_Record = __esm({
    "output/Record.Unsafe/index.js"() {
      init_foreign7();
      init_foreign7();
    }
  });

  // output/Data.Semigroup/index.js
  var semigroupString, semigroupArray, append;
  var init_Data7 = __esm({
    "output/Data.Semigroup/index.js"() {
      init_foreign5();
      init_Data5();
      init_Data3();
      init_Data6();
      init_Record();
      init_Type();
      semigroupString = {
        append: concatString
      };
      semigroupArray = {
        append: concatArray
      };
      append = function(dict) {
        return dict.append;
      };
    }
  });

  // output/Control.Alt/index.js
  var init_Control7 = __esm({
    "output/Control.Alt/index.js"() {
      init_Data4();
      init_Data7();
      init_Data4();
    }
  });

  // output/Data.Bounded/foreign.js
  var topInt, bottomInt, topChar, bottomChar, topNumber, bottomNumber;
  var init_foreign8 = __esm({
    "output/Data.Bounded/foreign.js"() {
      topInt = 2147483647;
      bottomInt = -2147483648;
      topChar = String.fromCharCode(65535);
      bottomChar = String.fromCharCode(0);
      topNumber = Number.POSITIVE_INFINITY;
      bottomNumber = Number.NEGATIVE_INFINITY;
    }
  });

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl, ordIntImpl, ordStringImpl, ordCharImpl;
  var init_foreign9 = __esm({
    "output/Data.Ord/foreign.js"() {
      unsafeCompareImpl = function(lt) {
        return function(eq5) {
          return function(gt) {
            return function(x) {
              return function(y) {
                return x < y ? lt : x === y ? eq5 : gt;
              };
            };
          };
        };
      };
      ordIntImpl = unsafeCompareImpl;
      ordStringImpl = unsafeCompareImpl;
      ordCharImpl = unsafeCompareImpl;
    }
  });

  // output/Data.Eq/foreign.js
  var refEq, eqIntImpl, eqCharImpl, eqStringImpl;
  var init_foreign10 = __esm({
    "output/Data.Eq/foreign.js"() {
      refEq = function(r1) {
        return function(r2) {
          return r1 === r2;
        };
      };
      eqIntImpl = refEq;
      eqCharImpl = refEq;
      eqStringImpl = refEq;
    }
  });

  // output/Data.Eq/index.js
  var eqString, eqInt, eqChar, eq;
  var init_Data8 = __esm({
    "output/Data.Eq/index.js"() {
      init_foreign10();
      init_Data5();
      init_Record();
      init_Type();
      eqString = {
        eq: eqStringImpl
      };
      eqInt = {
        eq: eqIntImpl
      };
      eqChar = {
        eq: eqCharImpl
      };
      eq = function(dict) {
        return dict.eq;
      };
    }
  });

  // output/Data.Ordering/index.js
  var LT, GT, EQ;
  var init_Data9 = __esm({
    "output/Data.Ordering/index.js"() {
      LT = /* @__PURE__ */ function() {
        function LT2() {
        }
        ;
        LT2.value = new LT2();
        return LT2;
      }();
      GT = /* @__PURE__ */ function() {
        function GT2() {
        }
        ;
        GT2.value = new GT2();
        return GT2;
      }();
      EQ = /* @__PURE__ */ function() {
        function EQ2() {
        }
        ;
        EQ2.value = new EQ2();
        return EQ2;
      }();
    }
  });

  // output/Data.Ring/foreign.js
  var intSub;
  var init_foreign11 = __esm({
    "output/Data.Ring/foreign.js"() {
      intSub = function(x) {
        return function(y) {
          return x - y | 0;
        };
      };
    }
  });

  // output/Data.Semiring/foreign.js
  var intAdd, intMul;
  var init_foreign12 = __esm({
    "output/Data.Semiring/foreign.js"() {
      intAdd = function(x) {
        return function(y) {
          return x + y | 0;
        };
      };
      intMul = function(x) {
        return function(y) {
          return x * y | 0;
        };
      };
    }
  });

  // output/Data.Semiring/index.js
  var zero, semiringInt;
  var init_Data10 = __esm({
    "output/Data.Semiring/index.js"() {
      init_foreign12();
      init_Data5();
      init_Data3();
      init_Record();
      init_Type();
      zero = function(dict) {
        return dict.zero;
      };
      semiringInt = {
        add: intAdd,
        zero: 0,
        mul: intMul,
        one: 1
      };
    }
  });

  // output/Data.Ring/index.js
  var sub, ringInt, negate;
  var init_Data11 = __esm({
    "output/Data.Ring/index.js"() {
      init_foreign11();
      init_Data10();
      init_Data5();
      init_Data3();
      init_Record();
      init_Type();
      init_Data10();
      sub = function(dict) {
        return dict.sub;
      };
      ringInt = {
        sub: intSub,
        Semiring0: function() {
          return semiringInt;
        }
      };
      negate = function(dictRing) {
        var sub1 = sub(dictRing);
        var zero2 = zero(dictRing.Semiring0());
        return function(a2) {
          return sub1(zero2)(a2);
        };
      };
    }
  });

  // output/Data.Ord/index.js
  var ordString, ordInt, ordChar, compare, greaterThanOrEq, abs;
  var init_Data12 = __esm({
    "output/Data.Ord/index.js"() {
      init_foreign9();
      init_Data8();
      init_Data9();
      init_Data11();
      init_Data10();
      init_Data5();
      init_Record();
      init_Type();
      init_Data9();
      ordString = /* @__PURE__ */ function() {
        return {
          compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
          Eq0: function() {
            return eqString;
          }
        };
      }();
      ordInt = /* @__PURE__ */ function() {
        return {
          compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
          Eq0: function() {
            return eqInt;
          }
        };
      }();
      ordChar = /* @__PURE__ */ function() {
        return {
          compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
          Eq0: function() {
            return eqChar;
          }
        };
      }();
      compare = function(dict) {
        return dict.compare;
      };
      greaterThanOrEq = function(dictOrd) {
        var compare3 = compare(dictOrd);
        return function(a1) {
          return function(a2) {
            var v = compare3(a1)(a2);
            if (v instanceof LT) {
              return false;
            }
            ;
            return true;
          };
        };
      };
      abs = function(dictOrd) {
        var greaterThanOrEq1 = greaterThanOrEq(dictOrd);
        return function(dictRing) {
          var zero2 = zero(dictRing.Semiring0());
          var negate1 = negate(dictRing);
          return function(x) {
            var $99 = greaterThanOrEq1(x)(zero2);
            if ($99) {
              return x;
            }
            ;
            return negate1(x);
          };
        };
      };
    }
  });

  // output/Data.Bounded/index.js
  var top, boundedInt, boundedChar, bottom;
  var init_Data13 = __esm({
    "output/Data.Bounded/index.js"() {
      init_foreign8();
      init_Data12();
      init_Data9();
      init_Data5();
      init_Data3();
      init_Record();
      init_Type();
      init_Data12();
      top = function(dict) {
        return dict.top;
      };
      boundedInt = {
        top: topInt,
        bottom: bottomInt,
        Ord0: function() {
          return ordInt;
        }
      };
      boundedChar = {
        top: topChar,
        bottom: bottomChar,
        Ord0: function() {
          return ordChar;
        }
      };
      bottom = function(dict) {
        return dict.bottom;
      };
    }
  });

  // output/Data.Functor.Invariant/index.js
  var init_Data_Functor = __esm({
    "output/Data.Functor.Invariant/index.js"() {
      init_Data4();
    }
  });

  // output/Data.Show/foreign.js
  var showIntImpl;
  var init_foreign13 = __esm({
    "output/Data.Show/foreign.js"() {
      showIntImpl = function(n) {
        return n.toString();
      };
    }
  });

  // output/Data.Show/index.js
  var showInt, show;
  var init_Data14 = __esm({
    "output/Data.Show/index.js"() {
      init_foreign13();
      init_Data5();
      init_Data6();
      init_Record();
      init_Type();
      showInt = {
        show: showIntImpl
      };
      show = function(dict) {
        return dict.show;
      };
    }
  });

  // output/Data.Generic.Rep/index.js
  var init_Data_Generic = __esm({
    "output/Data.Generic.Rep/index.js"() {
      init_Data14();
      init_Data5();
      init_Type();
    }
  });

  // output/Data.Maybe/index.js
  var identity4, Nothing, Just, maybe, isNothing, isJust, functorMaybe, map2, fromMaybe, fromJust, applyMaybe, bindMaybe;
  var init_Data15 = __esm({
    "output/Data.Maybe/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control2();
      init_Data13();
      init_Data8();
      init_Data2();
      init_Data4();
      init_Data_Functor();
      init_Data_Generic();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data10();
      init_Data14();
      init_Data3();
      identity4 = /* @__PURE__ */ identity(categoryFn);
      Nothing = /* @__PURE__ */ function() {
        function Nothing2() {
        }
        ;
        Nothing2.value = new Nothing2();
        return Nothing2;
      }();
      Just = /* @__PURE__ */ function() {
        function Just2(value0) {
          this.value0 = value0;
        }
        ;
        Just2.create = function(value0) {
          return new Just2(value0);
        };
        return Just2;
      }();
      maybe = function(v) {
        return function(v1) {
          return function(v2) {
            if (v2 instanceof Nothing) {
              return v;
            }
            ;
            if (v2 instanceof Just) {
              return v1(v2.value0);
            }
            ;
            throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
          };
        };
      };
      isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
      isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
      functorMaybe = {
        map: function(v) {
          return function(v1) {
            if (v1 instanceof Just) {
              return new Just(v(v1.value0));
            }
            ;
            return Nothing.value;
          };
        }
      };
      map2 = /* @__PURE__ */ map(functorMaybe);
      fromMaybe = function(a2) {
        return maybe(a2)(identity4);
      };
      fromJust = function() {
        return function(v) {
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
        };
      };
      applyMaybe = {
        apply: function(v) {
          return function(v1) {
            if (v instanceof Just) {
              return map2(v.value0)(v1);
            }
            ;
            if (v instanceof Nothing) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
          };
        },
        Functor0: function() {
          return functorMaybe;
        }
      };
      bindMaybe = {
        bind: function(v) {
          return function(v1) {
            if (v instanceof Just) {
              return v1(v.value0);
            }
            ;
            if (v instanceof Nothing) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
          };
        },
        Apply0: function() {
          return applyMaybe;
        }
      };
    }
  });

  // output/Data.Either/index.js
  var Left, Right, either;
  var init_Data16 = __esm({
    "output/Data.Either/index.js"() {
      init_Control7();
      init_Control3();
      init_Data13();
      init_Data8();
      init_Data2();
      init_Data4();
      init_Data_Functor();
      init_Data_Generic();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data14();
      init_Data3();
      Left = /* @__PURE__ */ function() {
        function Left2(value0) {
          this.value0 = value0;
        }
        ;
        Left2.create = function(value0) {
          return new Left2(value0);
        };
        return Left2;
      }();
      Right = /* @__PURE__ */ function() {
        function Right2(value0) {
          this.value0 = value0;
        }
        ;
        Right2.create = function(value0) {
          return new Right2(value0);
        };
        return Right2;
      }();
      either = function(v) {
        return function(v1) {
          return function(v2) {
            if (v2 instanceof Left) {
              return v(v2.value0);
            }
            ;
            if (v2 instanceof Right) {
              return v1(v2.value0);
            }
            ;
            throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
          };
        };
      };
    }
  });

  // output/Data.Identity/index.js
  var init_Data17 = __esm({
    "output/Data.Identity/index.js"() {
      init_Data8();
      init_Data_Functor();
      init_Data12();
      init_Data14();
    }
  });

  // output/Data.EuclideanRing/foreign.js
  var intDegree, intDiv, intMod;
  var init_foreign14 = __esm({
    "output/Data.EuclideanRing/foreign.js"() {
      intDegree = function(x) {
        return Math.min(Math.abs(x), 2147483647);
      };
      intDiv = function(x) {
        return function(y) {
          if (y === 0)
            return 0;
          return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
        };
      };
      intMod = function(x) {
        return function(y) {
          if (y === 0)
            return 0;
          var yy = Math.abs(y);
          return (x % yy + yy) % yy;
        };
      };
    }
  });

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt;
  var init_Data18 = __esm({
    "output/Data.CommutativeRing/index.js"() {
      init_Data11();
      init_Data10();
      init_Data10();
      commutativeRingInt = {
        Ring0: function() {
          return ringInt;
        }
      };
    }
  });

  // output/Data.EuclideanRing/index.js
  var mod, euclideanRingInt, div;
  var init_Data19 = __esm({
    "output/Data.EuclideanRing/index.js"() {
      init_foreign14();
      init_Data18();
      init_Data8();
      init_Data11();
      init_Data10();
      init_Data11();
      init_Data10();
      mod = function(dict) {
        return dict.mod;
      };
      euclideanRingInt = {
        degree: intDegree,
        div: intDiv,
        mod: intMod,
        CommutativeRing0: function() {
          return commutativeRingInt;
        }
      };
      div = function(dict) {
        return dict.div;
      };
    }
  });

  // output/Data.Monoid/index.js
  var monoidString, mempty;
  var init_Data20 = __esm({
    "output/Data.Monoid/index.js"() {
      init_Data();
      init_Data19();
      init_Data9();
      init_Data7();
      init_Data5();
      init_Data3();
      init_Record();
      init_Type();
      monoidString = {
        mempty: "",
        Semigroup0: function() {
          return semigroupString;
        }
      };
      mempty = function(dict) {
        return dict.mempty;
      };
    }
  });

  // output/Effect/foreign.js
  var pureE, bindE;
  var init_foreign15 = __esm({
    "output/Effect/foreign.js"() {
      pureE = function(a2) {
        return function() {
          return a2;
        };
      };
      bindE = function(a2) {
        return function(f) {
          return function() {
            return f(a2())();
          };
        };
      };
    }
  });

  // output/Effect/index.js
  var $runtime_lazy, monadEffect, bindEffect, applicativeEffect, $lazy_functorEffect, $lazy_applyEffect, functorEffect;
  var init_Effect = __esm({
    "output/Effect/index.js"() {
      init_foreign15();
      init_Control4();
      init_Control3();
      init_Control6();
      init_Data20();
      init_Data7();
      init_foreign15();
      $runtime_lazy = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      monadEffect = {
        Applicative0: function() {
          return applicativeEffect;
        },
        Bind1: function() {
          return bindEffect;
        }
      };
      bindEffect = {
        bind: bindE,
        Apply0: function() {
          return $lazy_applyEffect(0);
        }
      };
      applicativeEffect = {
        pure: pureE,
        Apply0: function() {
          return $lazy_applyEffect(0);
        }
      };
      $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
        return {
          map: liftA1(applicativeEffect)
        };
      });
      $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
        return {
          apply: ap(monadEffect),
          Functor0: function() {
            return $lazy_functorEffect(0);
          }
        };
      });
      functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
    }
  });

  // output/Effect.Ref/foreign.js
  var _new, read, modifyImpl, write;
  var init_foreign16 = __esm({
    "output/Effect.Ref/foreign.js"() {
      _new = function(val) {
        return function() {
          return { value: val };
        };
      };
      read = function(ref2) {
        return function() {
          return ref2.value;
        };
      };
      modifyImpl = function(f) {
        return function(ref2) {
          return function() {
            var t = f(ref2.value);
            ref2.value = t.state;
            return t.value;
          };
        };
      };
      write = function(val) {
        return function(ref2) {
          return function() {
            ref2.value = val;
          };
        };
      };
    }
  });

  // output/Effect.Ref/index.js
  var $$void2, $$new, modify$prime, modify, modify_;
  var init_Effect2 = __esm({
    "output/Effect.Ref/index.js"() {
      init_foreign16();
      init_Data4();
      init_Effect();
      init_foreign16();
      $$void2 = /* @__PURE__ */ $$void(functorEffect);
      $$new = _new;
      modify$prime = modifyImpl;
      modify = function(f) {
        return modify$prime(function(s) {
          var s$prime = f(s);
          return {
            state: s$prime,
            value: s$prime
          };
        });
      };
      modify_ = function(f) {
        return function(s) {
          return $$void2(modify(f)(s));
        };
      };
    }
  });

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2, map3, Loop, Done, tailRecM, monadRecEffect, forever;
  var init_Control_Monad_Rec = __esm({
    "output/Control.Monad.Rec.Class/index.js"() {
      init_Control5();
      init_Control6();
      init_Data16();
      init_Data4();
      init_Data17();
      init_Data15();
      init_Data20();
      init_Data7();
      init_Data3();
      init_Effect();
      init_Effect2();
      bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
      map3 = /* @__PURE__ */ map(functorEffect);
      Loop = /* @__PURE__ */ function() {
        function Loop2(value0) {
          this.value0 = value0;
        }
        ;
        Loop2.create = function(value0) {
          return new Loop2(value0);
        };
        return Loop2;
      }();
      Done = /* @__PURE__ */ function() {
        function Done2(value0) {
          this.value0 = value0;
        }
        ;
        Done2.create = function(value0) {
          return new Done2(value0);
        };
        return Done2;
      }();
      tailRecM = function(dict) {
        return dict.tailRecM;
      };
      monadRecEffect = {
        tailRecM: function(f) {
          return function(a2) {
            var fromDone = function(v) {
              if (v instanceof Done) {
                return v.value0;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
            };
            return function __do2() {
              var r = bindFlipped2($$new)(f(a2))();
              (function() {
                while (!function __do3() {
                  var v = read(r)();
                  if (v instanceof Loop) {
                    var e = f(v.value0)();
                    write(e)(r)();
                    return false;
                  }
                  ;
                  if (v instanceof Done) {
                    return true;
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
                }()) {
                }
                ;
                return {};
              })();
              return map3(fromDone)(read(r))();
            };
          };
        },
        Monad0: function() {
          return monadEffect;
        }
      };
      forever = function(dictMonadRec) {
        var tailRecM1 = tailRecM(dictMonadRec);
        var voidRight2 = voidRight(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
        return function(ma) {
          return tailRecM1(function(u2) {
            return voidRight2(new Loop(u2))(ma);
          })(unit);
        };
      };
    }
  });

  // output/Control.Lazy/index.js
  var init_Control8 = __esm({
    "output/Control.Lazy/index.js"() {
      init_Data3();
    }
  });

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj, boolDisj, boolNot;
  var init_foreign17 = __esm({
    "output/Data.HeytingAlgebra/foreign.js"() {
      boolConj = function(b1) {
        return function(b2) {
          return b1 && b2;
        };
      };
      boolDisj = function(b1) {
        return function(b2) {
          return b1 || b2;
        };
      };
      boolNot = function(b2) {
        return !b2;
      };
    }
  });

  // output/Data.HeytingAlgebra/index.js
  var tt, not, implies, ff, disj, heytingAlgebraBoolean, conj, heytingAlgebraFunction;
  var init_Data21 = __esm({
    "output/Data.HeytingAlgebra/index.js"() {
      init_foreign17();
      init_Data5();
      init_Data3();
      init_Record();
      init_Type();
      tt = function(dict) {
        return dict.tt;
      };
      not = function(dict) {
        return dict.not;
      };
      implies = function(dict) {
        return dict.implies;
      };
      ff = function(dict) {
        return dict.ff;
      };
      disj = function(dict) {
        return dict.disj;
      };
      heytingAlgebraBoolean = {
        ff: false,
        tt: true,
        implies: function(a2) {
          return function(b2) {
            return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
          };
        },
        conj: boolConj,
        disj: boolDisj,
        not: boolNot
      };
      conj = function(dict) {
        return dict.conj;
      };
      heytingAlgebraFunction = function(dictHeytingAlgebra) {
        var ff1 = ff(dictHeytingAlgebra);
        var tt1 = tt(dictHeytingAlgebra);
        var implies1 = implies(dictHeytingAlgebra);
        var conj1 = conj(dictHeytingAlgebra);
        var disj1 = disj(dictHeytingAlgebra);
        var not1 = not(dictHeytingAlgebra);
        return {
          ff: function(v) {
            return ff1;
          },
          tt: function(v) {
            return tt1;
          },
          implies: function(f) {
            return function(g) {
              return function(a2) {
                return implies1(f(a2))(g(a2));
              };
            };
          },
          conj: function(f) {
            return function(g) {
              return function(a2) {
                return conj1(f(a2))(g(a2));
              };
            };
          },
          disj: function(f) {
            return function(g) {
              return function(a2) {
                return disj1(f(a2))(g(a2));
              };
            };
          },
          not: function(f) {
            return function(a2) {
              return not1(f(a2));
            };
          }
        };
      };
    }
  });

  // output/Data.Tuple/index.js
  var Tuple, snd, functorTuple, fst;
  var init_Data22 = __esm({
    "output/Data.Tuple/index.js"() {
      init_Control8();
      init_Data13();
      init_Data8();
      init_Data_Functor();
      init_Data_Generic();
      init_Data21();
      init_Data20();
      init_Data12();
      init_Data9();
      init_Data11();
      init_Data7();
      init_Data10();
      init_Data14();
      init_Data3();
      Tuple = /* @__PURE__ */ function() {
        function Tuple2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Tuple2.create = function(value0) {
          return function(value1) {
            return new Tuple2(value0, value1);
          };
        };
        return Tuple2;
      }();
      snd = function(v) {
        return v.value1;
      };
      functorTuple = {
        map: function(f) {
          return function(m) {
            return new Tuple(m.value0, f(m.value1));
          };
        }
      };
      fst = function(v) {
        return v.value0;
      };
    }
  });

  // output/Control.Monad.State.Class/index.js
  var state, modify_2;
  var init_Control_Monad_State = __esm({
    "output/Control.Monad.State.Class/index.js"() {
      init_Data22();
      init_Data3();
      state = function(dict) {
        return dict.state;
      };
      modify_2 = function(dictMonadState) {
        var state1 = state(dictMonadState);
        return function(f) {
          return state1(function(s) {
            return new Tuple(unit, f(s));
          });
        };
      };
    }
  });

  // output/Data.DateTime/foreign.js
  function adjustImpl(just) {
    return function(nothing) {
      return function(offset) {
        return function(rec) {
          var msUTC = createUTC(rec.year, rec.month - 1, rec.day, rec.hour, rec.minute, rec.second, rec.millisecond);
          var dt2 = new Date(msUTC + offset);
          return isNaN(dt2.getTime()) ? nothing : just({
            year: dt2.getUTCFullYear(),
            month: dt2.getUTCMonth() + 1,
            day: dt2.getUTCDate(),
            hour: dt2.getUTCHours(),
            minute: dt2.getUTCMinutes(),
            second: dt2.getUTCSeconds(),
            millisecond: dt2.getUTCMilliseconds()
          });
        };
      };
    };
  }
  var createUTC;
  var init_foreign18 = __esm({
    "output/Data.DateTime/foreign.js"() {
      createUTC = function(y, mo, d, h, m, s, ms) {
        var date2 = new Date(Date.UTC(y, mo, d, h, m, s, ms));
        if (y >= 0 && y < 100) {
          date2.setUTCFullYear(y);
        }
        return date2.getTime();
      };
    }
  });

  // output/Data.Date/foreign.js
  function canonicalDateImpl(ctor, y, m, d) {
    var date2 = createDate(y, m - 1, d);
    return ctor(date2.getUTCFullYear())(date2.getUTCMonth() + 1)(date2.getUTCDate());
  }
  function calcWeekday(y, m, d) {
    return createDate(y, m - 1, d).getUTCDay();
  }
  var createDate;
  var init_foreign19 = __esm({
    "output/Data.Date/foreign.js"() {
      createDate = function(y, m, d) {
        var date2 = new Date(Date.UTC(y, m, d));
        if (y >= 0 && y < 100) {
          date2.setUTCFullYear(y);
        }
        return date2;
      };
    }
  });

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }
  var init_foreign20 = __esm({
    "output/Data.Enum/foreign.js"() {
    }
  });

  // output/Control.Plus/index.js
  var empty;
  var init_Control9 = __esm({
    "output/Control.Plus/index.js"() {
      init_Control7();
      init_Data4();
      init_Control7();
      init_Data4();
      empty = function(dict) {
        return dict.empty;
      };
    }
  });

  // output/Control.Alternative/index.js
  var init_Control10 = __esm({
    "output/Control.Alternative/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control9();
      init_Data4();
      init_Data3();
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control9();
      init_Data4();
    }
  });

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl;
  var init_foreign21 = __esm({
    "output/Data.Unfoldable/foreign.js"() {
      unfoldrArrayImpl = function(isNothing2) {
        return function(fromJust7) {
          return function(fst2) {
            return function(snd2) {
              return function(f) {
                return function(b2) {
                  var result = [];
                  var value12 = b2;
                  while (true) {
                    var maybe2 = f(value12);
                    if (isNothing2(maybe2))
                      return result;
                    var tuple = fromJust7(maybe2);
                    result.push(fst2(tuple));
                    value12 = snd2(tuple);
                  }
                };
              };
            };
          };
        };
      };
    }
  });

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl;
  var init_foreign22 = __esm({
    "output/Data.Traversable/foreign.js"() {
      traverseArrayImpl = function() {
        function array1(a2) {
          return [a2];
        }
        function array2(a2) {
          return function(b2) {
            return [a2, b2];
          };
        }
        function array3(a2) {
          return function(b2) {
            return function(c) {
              return [a2, b2, c];
            };
          };
        }
        function concat2(xs) {
          return function(ys) {
            return xs.concat(ys);
          };
        }
        return function(apply3) {
          return function(map21) {
            return function(pure10) {
              return function(f) {
                return function(array) {
                  function go2(bot, top3) {
                    switch (top3 - bot) {
                      case 0:
                        return pure10([]);
                      case 1:
                        return map21(array1)(f(array[bot]));
                      case 2:
                        return apply3(map21(array2)(f(array[bot])))(f(array[bot + 1]));
                      case 3:
                        return apply3(apply3(map21(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                      default:
                        var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                        return apply3(map21(concat2)(go2(bot, pivot)))(go2(pivot, top3));
                    }
                  }
                  return go2(0, array.length);
                };
              };
            };
          };
        };
      }();
    }
  });

  // output/Data.Const/index.js
  var init_Data23 = __esm({
    "output/Data.Const/index.js"() {
      init_Data8();
      init_Data_Functor();
      init_Data20();
      init_Data12();
      init_Data7();
      init_Data14();
    }
  });

  // output/Data.Foldable/foreign.js
  var foldrArray, foldlArray;
  var init_foreign23 = __esm({
    "output/Data.Foldable/foreign.js"() {
      foldrArray = function(f) {
        return function(init3) {
          return function(xs) {
            var acc = init3;
            var len = xs.length;
            for (var i2 = len - 1; i2 >= 0; i2--) {
              acc = f(xs[i2])(acc);
            }
            return acc;
          };
        };
      };
      foldlArray = function(f) {
        return function(init3) {
          return function(xs) {
            var acc = init3;
            var len = xs.length;
            for (var i2 = 0; i2 < len; i2++) {
              acc = f(acc)(xs[i2]);
            }
            return acc;
          };
        };
      };
    }
  });

  // output/Control.Extend/foreign.js
  var init_foreign24 = __esm({
    "output/Control.Extend/foreign.js"() {
    }
  });

  // output/Control.Extend/index.js
  var init_Control11 = __esm({
    "output/Control.Extend/index.js"() {
      init_foreign24();
      init_Control2();
      init_Data4();
      init_Data7();
      init_Data4();
    }
  });

  // output/Control.Comonad/index.js
  var init_Control12 = __esm({
    "output/Control.Comonad/index.js"() {
      init_Control11();
      init_Data4();
      init_Control11();
      init_Data4();
    }
  });

  // output/Data.Bifunctor/index.js
  var bimap;
  var init_Data24 = __esm({
    "output/Data.Bifunctor/index.js"() {
      init_Control2();
      init_Data16();
      init_Data22();
      bimap = function(dict) {
        return dict.bimap;
      };
    }
  });

  // output/Data.Functor.Coproduct/index.js
  var init_Data_Functor2 = __esm({
    "output/Data.Functor.Coproduct/index.js"() {
      init_Control12();
      init_Control11();
      init_Data24();
      init_Data16();
      init_Data8();
      init_Data4();
      init_Data12();
      init_Data9();
      init_Data14();
    }
  });

  // output/Data.Maybe.First/index.js
  var init_Data_Maybe = __esm({
    "output/Data.Maybe.First/index.js"() {
      init_Data15();
      init_Data20();
      init_Data7();
      init_Data14();
    }
  });

  // output/Data.Monoid.Conj/index.js
  var init_Data_Monoid = __esm({
    "output/Data.Monoid.Conj/index.js"() {
      init_Data8();
      init_Data21();
      init_Data12();
      init_Data14();
    }
  });

  // output/Data.Monoid.Disj/index.js
  var init_Data_Monoid2 = __esm({
    "output/Data.Monoid.Disj/index.js"() {
      init_Data8();
      init_Data21();
      init_Data12();
      init_Data14();
    }
  });

  // output/Data.Monoid.Dual/index.js
  var init_Data_Monoid3 = __esm({
    "output/Data.Monoid.Dual/index.js"() {
      init_Data8();
      init_Data20();
      init_Data12();
      init_Data7();
      init_Data14();
    }
  });

  // output/Data.Monoid.Endo/index.js
  var init_Data_Monoid4 = __esm({
    "output/Data.Monoid.Endo/index.js"() {
      init_Control2();
      init_Control();
      init_Data14();
    }
  });

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2;
  var init_foreign25 = __esm({
    "output/Unsafe.Coerce/foreign.js"() {
      unsafeCoerce2 = function(x) {
        return x;
      };
    }
  });

  // output/Unsafe.Coerce/index.js
  var init_Unsafe = __esm({
    "output/Unsafe.Coerce/index.js"() {
      init_foreign25();
      init_foreign25();
    }
  });

  // output/Safe.Coerce/index.js
  var coerce;
  var init_Safe = __esm({
    "output/Safe.Coerce/index.js"() {
      init_Unsafe();
      coerce = function() {
        return unsafeCoerce2;
      };
    }
  });

  // output/Data.Newtype/index.js
  var coerce2, unwrap;
  var init_Data25 = __esm({
    "output/Data.Newtype/index.js"() {
      init_Safe();
      coerce2 = /* @__PURE__ */ coerce();
      unwrap = function() {
        return coerce2;
      };
    }
  });

  // output/Data.Foldable/index.js
  var foldr, traverse_, for_, foldl, foldableMaybe, foldMapDefaultR, foldableArray, foldMap;
  var init_Data26 = __esm({
    "output/Data.Foldable/index.js"() {
      init_foreign23();
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control9();
      init_Data16();
      init_Data8();
      init_Data2();
      init_Data_Functor2();
      init_Data21();
      init_Data15();
      init_Data_Maybe();
      init_Data20();
      init_Data_Monoid();
      init_Data_Monoid2();
      init_Data_Monoid3();
      init_Data_Monoid4();
      init_Data25();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data10();
      init_Data3();
      foldr = function(dict) {
        return dict.foldr;
      };
      traverse_ = function(dictApplicative) {
        var applySecond2 = applySecond(dictApplicative.Apply0());
        var pure10 = pure(dictApplicative);
        return function(dictFoldable) {
          var foldr22 = foldr(dictFoldable);
          return function(f) {
            return foldr22(function($454) {
              return applySecond2(f($454));
            })(pure10(unit));
          };
        };
      };
      for_ = function(dictApplicative) {
        var traverse_14 = traverse_(dictApplicative);
        return function(dictFoldable) {
          return flip(traverse_14(dictFoldable));
        };
      };
      foldl = function(dict) {
        return dict.foldl;
      };
      foldableMaybe = {
        foldr: function(v) {
          return function(v1) {
            return function(v2) {
              if (v2 instanceof Nothing) {
                return v1;
              }
              ;
              if (v2 instanceof Just) {
                return v(v2.value0)(v1);
              }
              ;
              throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
            };
          };
        },
        foldl: function(v) {
          return function(v1) {
            return function(v2) {
              if (v2 instanceof Nothing) {
                return v1;
              }
              ;
              if (v2 instanceof Just) {
                return v(v1)(v2.value0);
              }
              ;
              throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
            };
          };
        },
        foldMap: function(dictMonoid) {
          var mempty2 = mempty(dictMonoid);
          return function(v) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return mempty2;
              }
              ;
              if (v1 instanceof Just) {
                return v(v1.value0);
              }
              ;
              throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
            };
          };
        }
      };
      foldMapDefaultR = function(dictFoldable) {
        var foldr22 = foldr(dictFoldable);
        return function(dictMonoid) {
          var append5 = append(dictMonoid.Semigroup0());
          var mempty2 = mempty(dictMonoid);
          return function(f) {
            return foldr22(function(x) {
              return function(acc) {
                return append5(f(x))(acc);
              };
            })(mempty2);
          };
        };
      };
      foldableArray = {
        foldr: foldrArray,
        foldl: foldlArray,
        foldMap: function(dictMonoid) {
          return foldMapDefaultR(foldableArray)(dictMonoid);
        }
      };
      foldMap = function(dict) {
        return dict.foldMap;
      };
    }
  });

  // output/Data.Functor.App/index.js
  var init_Data_Functor3 = __esm({
    "output/Data.Functor.App/index.js"() {
      init_Control4();
      init_Control3();
      init_Data8();
      init_Data20();
      init_Data12();
      init_Data7();
      init_Data14();
      init_Unsafe();
    }
  });

  // output/Data.Functor.Compose/index.js
  var init_Data_Functor4 = __esm({
    "output/Data.Functor.Compose/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control9();
      init_Data8();
      init_Data4();
      init_Data_Functor3();
      init_Data12();
      init_Data14();
    }
  });

  // output/Data.Functor.Product/index.js
  var init_Data_Functor5 = __esm({
    "output/Data.Functor.Product/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Data24();
      init_Data8();
      init_Data4();
      init_Data25();
      init_Data12();
      init_Data9();
      init_Data14();
      init_Data22();
    }
  });

  // output/Data.Maybe.Last/index.js
  var init_Data_Maybe2 = __esm({
    "output/Data.Maybe.Last/index.js"() {
      init_Data15();
      init_Data20();
      init_Data7();
      init_Data14();
    }
  });

  // output/Data.Monoid.Additive/index.js
  var init_Data_Monoid5 = __esm({
    "output/Data.Monoid.Additive/index.js"() {
      init_Data8();
      init_Data12();
      init_Data10();
      init_Data14();
    }
  });

  // output/Data.Monoid.Multiplicative/index.js
  var init_Data_Monoid6 = __esm({
    "output/Data.Monoid.Multiplicative/index.js"() {
      init_Data8();
      init_Data12();
      init_Data10();
      init_Data14();
    }
  });

  // output/Data.Traversable.Accum.Internal/index.js
  var init_Data_Traversable_Accum = __esm({
    "output/Data.Traversable.Accum.Internal/index.js"() {
    }
  });

  // output/Data.Traversable/index.js
  var init_Data27 = __esm({
    "output/Data.Traversable/index.js"() {
      init_foreign22();
      init_Control4();
      init_Control3();
      init_Control2();
      init_Data23();
      init_Data16();
      init_Data26();
      init_Data4();
      init_Data_Functor3();
      init_Data_Functor4();
      init_Data_Functor2();
      init_Data_Functor5();
      init_Data17();
      init_Data15();
      init_Data_Maybe();
      init_Data_Maybe2();
      init_Data_Monoid5();
      init_Data_Monoid();
      init_Data_Monoid2();
      init_Data_Monoid3();
      init_Data_Monoid6();
      init_Data_Traversable_Accum();
      init_Data22();
      init_Data26();
    }
  });

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl;
  var init_foreign26 = __esm({
    "output/Data.Unfoldable1/foreign.js"() {
      unfoldr1ArrayImpl = function(isNothing2) {
        return function(fromJust7) {
          return function(fst2) {
            return function(snd2) {
              return function(f) {
                return function(b2) {
                  var result = [];
                  var value12 = b2;
                  while (true) {
                    var tuple = f(value12);
                    result.push(fst2(tuple));
                    var maybe2 = snd2(tuple);
                    if (isNothing2(maybe2))
                      return result;
                    value12 = fromJust7(maybe2);
                  }
                };
              };
            };
          };
        };
      };
    }
  });

  // output/Data.Ord.Max/index.js
  var init_Data_Ord = __esm({
    "output/Data.Ord.Max/index.js"() {
      init_Data13();
      init_Data12();
      init_Data14();
    }
  });

  // output/Data.Ord.Min/index.js
  var init_Data_Ord2 = __esm({
    "output/Data.Ord.Min/index.js"() {
      init_Data13();
      init_Data12();
      init_Data14();
    }
  });

  // output/Data.Semigroup.Foldable/index.js
  var init_Data_Semigroup = __esm({
    "output/Data.Semigroup.Foldable/index.js"() {
      init_Control3();
      init_Control2();
      init_Data8();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data_Monoid3();
      init_Data25();
      init_Data_Ord();
      init_Data_Ord2();
      init_Data9();
      init_Data7();
      init_Data3();
    }
  });

  // output/Data.Semigroup.Traversable/index.js
  var init_Data_Semigroup2 = __esm({
    "output/Data.Semigroup.Traversable/index.js"() {
      init_Control2();
      init_Data4();
      init_Data17();
      init_Data_Monoid3();
      init_Data_Monoid6();
      init_Data_Semigroup();
      init_Data27();
      init_Data22();
    }
  });

  // output/Data.Unfoldable1/index.js
  var fromJust2, unfoldable1Array;
  var init_Data28 = __esm({
    "output/Data.Unfoldable1/index.js"() {
      init_foreign26();
      init_Data();
      init_Data15();
      init_Data_Semigroup2();
      init_Data22();
      fromJust2 = /* @__PURE__ */ fromJust();
      unfoldable1Array = {
        unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
      };
    }
  });

  // output/Data.Unfoldable/index.js
  var fromJust3, unfoldr, unfoldableArray;
  var init_Data29 = __esm({
    "output/Data.Unfoldable/index.js"() {
      init_foreign21();
      init_Data2();
      init_Data4();
      init_Data15();
      init_Data27();
      init_Data22();
      init_Data28();
      init_Data3();
      init_Data28();
      fromJust3 = /* @__PURE__ */ fromJust();
      unfoldr = function(dict) {
        return dict.unfoldr;
      };
      unfoldableArray = {
        unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
        Unfoldable10: function() {
          return unfoldable1Array;
        }
      };
    }
  });

  // output/Data.Enum/index.js
  var bottom1, top1, toEnum, fromEnum, toEnumWithDefaults, defaultSucc, defaultPred, charToEnum, enumChar, boundedEnumChar;
  var init_Data30 = __esm({
    "output/Data.Enum/index.js"() {
      init_foreign20();
      init_Control10();
      init_Control3();
      init_Control5();
      init_Data();
      init_Data13();
      init_Data16();
      init_Data8();
      init_Data2();
      init_Data4();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data14();
      init_Data22();
      init_Data29();
      init_Data28();
      init_Data3();
      bottom1 = /* @__PURE__ */ bottom(boundedChar);
      top1 = /* @__PURE__ */ top(boundedChar);
      toEnum = function(dict) {
        return dict.toEnum;
      };
      fromEnum = function(dict) {
        return dict.fromEnum;
      };
      toEnumWithDefaults = function(dictBoundedEnum) {
        var toEnum12 = toEnum(dictBoundedEnum);
        var fromEnum13 = fromEnum(dictBoundedEnum);
        var bottom22 = bottom(dictBoundedEnum.Bounded0());
        return function(low2) {
          return function(high2) {
            return function(x) {
              var v = toEnum12(x);
              if (v instanceof Just) {
                return v.value0;
              }
              ;
              if (v instanceof Nothing) {
                var $140 = x < fromEnum13(bottom22);
                if ($140) {
                  return low2;
                }
                ;
                return high2;
              }
              ;
              throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
            };
          };
        };
      };
      defaultSucc = function(toEnum$prime) {
        return function(fromEnum$prime) {
          return function(a2) {
            return toEnum$prime(fromEnum$prime(a2) + 1 | 0);
          };
        };
      };
      defaultPred = function(toEnum$prime) {
        return function(fromEnum$prime) {
          return function(a2) {
            return toEnum$prime(fromEnum$prime(a2) - 1 | 0);
          };
        };
      };
      charToEnum = function(v) {
        if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
          return new Just(fromCharCode(v));
        }
        ;
        return Nothing.value;
      };
      enumChar = {
        succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
        pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
        Ord0: function() {
          return ordChar;
        }
      };
      boundedEnumChar = /* @__PURE__ */ function() {
        return {
          cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
          toEnum: charToEnum,
          fromEnum: toCharCode,
          Bounded0: function() {
            return boundedChar;
          },
          Enum1: function() {
            return enumChar;
          }
        };
      }();
    }
  });

  // output/Data.Date.Component/index.js
  var $runtime_lazy2, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, January, February, March, April, May, June, July, August, September, October, November, December, showWeekday, showMonth, ordYear, ordDay, eqYear, eqWeekday, ordWeekday, eqMonth, ordMonth, eqDay, boundedYear, boundedWeekday, boundedMonth, boundedEnumYear, $lazy_enumYear, boundedEnumWeekday, $lazy_enumWeekday, boundedEnumMonth, $lazy_enumMonth, boundedDay, boundedEnumDay, $lazy_enumDay;
  var init_Data_Date = __esm({
    "output/Data.Date.Component/index.js"() {
      init_Data();
      init_Data30();
      init_Data8();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data14();
      $runtime_lazy2 = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      Monday = /* @__PURE__ */ function() {
        function Monday2() {
        }
        ;
        Monday2.value = new Monday2();
        return Monday2;
      }();
      Tuesday = /* @__PURE__ */ function() {
        function Tuesday2() {
        }
        ;
        Tuesday2.value = new Tuesday2();
        return Tuesday2;
      }();
      Wednesday = /* @__PURE__ */ function() {
        function Wednesday2() {
        }
        ;
        Wednesday2.value = new Wednesday2();
        return Wednesday2;
      }();
      Thursday = /* @__PURE__ */ function() {
        function Thursday2() {
        }
        ;
        Thursday2.value = new Thursday2();
        return Thursday2;
      }();
      Friday = /* @__PURE__ */ function() {
        function Friday2() {
        }
        ;
        Friday2.value = new Friday2();
        return Friday2;
      }();
      Saturday = /* @__PURE__ */ function() {
        function Saturday2() {
        }
        ;
        Saturday2.value = new Saturday2();
        return Saturday2;
      }();
      Sunday = /* @__PURE__ */ function() {
        function Sunday2() {
        }
        ;
        Sunday2.value = new Sunday2();
        return Sunday2;
      }();
      January = /* @__PURE__ */ function() {
        function January2() {
        }
        ;
        January2.value = new January2();
        return January2;
      }();
      February = /* @__PURE__ */ function() {
        function February2() {
        }
        ;
        February2.value = new February2();
        return February2;
      }();
      March = /* @__PURE__ */ function() {
        function March2() {
        }
        ;
        March2.value = new March2();
        return March2;
      }();
      April = /* @__PURE__ */ function() {
        function April2() {
        }
        ;
        April2.value = new April2();
        return April2;
      }();
      May = /* @__PURE__ */ function() {
        function May2() {
        }
        ;
        May2.value = new May2();
        return May2;
      }();
      June = /* @__PURE__ */ function() {
        function June2() {
        }
        ;
        June2.value = new June2();
        return June2;
      }();
      July = /* @__PURE__ */ function() {
        function July2() {
        }
        ;
        July2.value = new July2();
        return July2;
      }();
      August = /* @__PURE__ */ function() {
        function August2() {
        }
        ;
        August2.value = new August2();
        return August2;
      }();
      September = /* @__PURE__ */ function() {
        function September2() {
        }
        ;
        September2.value = new September2();
        return September2;
      }();
      October = /* @__PURE__ */ function() {
        function October2() {
        }
        ;
        October2.value = new October2();
        return October2;
      }();
      November = /* @__PURE__ */ function() {
        function November2() {
        }
        ;
        November2.value = new November2();
        return November2;
      }();
      December = /* @__PURE__ */ function() {
        function December2() {
        }
        ;
        December2.value = new December2();
        return December2;
      }();
      showWeekday = {
        show: function(v) {
          if (v instanceof Monday) {
            return "Monday";
          }
          ;
          if (v instanceof Tuesday) {
            return "Tuesday";
          }
          ;
          if (v instanceof Wednesday) {
            return "Wednesday";
          }
          ;
          if (v instanceof Thursday) {
            return "Thursday";
          }
          ;
          if (v instanceof Friday) {
            return "Friday";
          }
          ;
          if (v instanceof Saturday) {
            return "Saturday";
          }
          ;
          if (v instanceof Sunday) {
            return "Sunday";
          }
          ;
          throw new Error("Failed pattern match at Data.Date.Component (line 184, column 1 - line 191, column 25): " + [v.constructor.name]);
        }
      };
      showMonth = {
        show: function(v) {
          if (v instanceof January) {
            return "January";
          }
          ;
          if (v instanceof February) {
            return "February";
          }
          ;
          if (v instanceof March) {
            return "March";
          }
          ;
          if (v instanceof April) {
            return "April";
          }
          ;
          if (v instanceof May) {
            return "May";
          }
          ;
          if (v instanceof June) {
            return "June";
          }
          ;
          if (v instanceof July) {
            return "July";
          }
          ;
          if (v instanceof August) {
            return "August";
          }
          ;
          if (v instanceof September) {
            return "September";
          }
          ;
          if (v instanceof October) {
            return "October";
          }
          ;
          if (v instanceof November) {
            return "November";
          }
          ;
          if (v instanceof December) {
            return "December";
          }
          ;
          throw new Error("Failed pattern match at Data.Date.Component (line 101, column 1 - line 113, column 29): " + [v.constructor.name]);
        }
      };
      ordYear = ordInt;
      ordDay = ordInt;
      eqYear = eqInt;
      eqWeekday = {
        eq: function(x) {
          return function(y) {
            if (x instanceof Monday && y instanceof Monday) {
              return true;
            }
            ;
            if (x instanceof Tuesday && y instanceof Tuesday) {
              return true;
            }
            ;
            if (x instanceof Wednesday && y instanceof Wednesday) {
              return true;
            }
            ;
            if (x instanceof Thursday && y instanceof Thursday) {
              return true;
            }
            ;
            if (x instanceof Friday && y instanceof Friday) {
              return true;
            }
            ;
            if (x instanceof Saturday && y instanceof Saturday) {
              return true;
            }
            ;
            if (x instanceof Sunday && y instanceof Sunday) {
              return true;
            }
            ;
            return false;
          };
        }
      };
      ordWeekday = {
        compare: function(x) {
          return function(y) {
            if (x instanceof Monday && y instanceof Monday) {
              return EQ.value;
            }
            ;
            if (x instanceof Monday) {
              return LT.value;
            }
            ;
            if (y instanceof Monday) {
              return GT.value;
            }
            ;
            if (x instanceof Tuesday && y instanceof Tuesday) {
              return EQ.value;
            }
            ;
            if (x instanceof Tuesday) {
              return LT.value;
            }
            ;
            if (y instanceof Tuesday) {
              return GT.value;
            }
            ;
            if (x instanceof Wednesday && y instanceof Wednesday) {
              return EQ.value;
            }
            ;
            if (x instanceof Wednesday) {
              return LT.value;
            }
            ;
            if (y instanceof Wednesday) {
              return GT.value;
            }
            ;
            if (x instanceof Thursday && y instanceof Thursday) {
              return EQ.value;
            }
            ;
            if (x instanceof Thursday) {
              return LT.value;
            }
            ;
            if (y instanceof Thursday) {
              return GT.value;
            }
            ;
            if (x instanceof Friday && y instanceof Friday) {
              return EQ.value;
            }
            ;
            if (x instanceof Friday) {
              return LT.value;
            }
            ;
            if (y instanceof Friday) {
              return GT.value;
            }
            ;
            if (x instanceof Saturday && y instanceof Saturday) {
              return EQ.value;
            }
            ;
            if (x instanceof Saturday) {
              return LT.value;
            }
            ;
            if (y instanceof Saturday) {
              return GT.value;
            }
            ;
            if (x instanceof Sunday && y instanceof Sunday) {
              return EQ.value;
            }
            ;
            throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
          };
        },
        Eq0: function() {
          return eqWeekday;
        }
      };
      eqMonth = {
        eq: function(x) {
          return function(y) {
            if (x instanceof January && y instanceof January) {
              return true;
            }
            ;
            if (x instanceof February && y instanceof February) {
              return true;
            }
            ;
            if (x instanceof March && y instanceof March) {
              return true;
            }
            ;
            if (x instanceof April && y instanceof April) {
              return true;
            }
            ;
            if (x instanceof May && y instanceof May) {
              return true;
            }
            ;
            if (x instanceof June && y instanceof June) {
              return true;
            }
            ;
            if (x instanceof July && y instanceof July) {
              return true;
            }
            ;
            if (x instanceof August && y instanceof August) {
              return true;
            }
            ;
            if (x instanceof September && y instanceof September) {
              return true;
            }
            ;
            if (x instanceof October && y instanceof October) {
              return true;
            }
            ;
            if (x instanceof November && y instanceof November) {
              return true;
            }
            ;
            if (x instanceof December && y instanceof December) {
              return true;
            }
            ;
            return false;
          };
        }
      };
      ordMonth = {
        compare: function(x) {
          return function(y) {
            if (x instanceof January && y instanceof January) {
              return EQ.value;
            }
            ;
            if (x instanceof January) {
              return LT.value;
            }
            ;
            if (y instanceof January) {
              return GT.value;
            }
            ;
            if (x instanceof February && y instanceof February) {
              return EQ.value;
            }
            ;
            if (x instanceof February) {
              return LT.value;
            }
            ;
            if (y instanceof February) {
              return GT.value;
            }
            ;
            if (x instanceof March && y instanceof March) {
              return EQ.value;
            }
            ;
            if (x instanceof March) {
              return LT.value;
            }
            ;
            if (y instanceof March) {
              return GT.value;
            }
            ;
            if (x instanceof April && y instanceof April) {
              return EQ.value;
            }
            ;
            if (x instanceof April) {
              return LT.value;
            }
            ;
            if (y instanceof April) {
              return GT.value;
            }
            ;
            if (x instanceof May && y instanceof May) {
              return EQ.value;
            }
            ;
            if (x instanceof May) {
              return LT.value;
            }
            ;
            if (y instanceof May) {
              return GT.value;
            }
            ;
            if (x instanceof June && y instanceof June) {
              return EQ.value;
            }
            ;
            if (x instanceof June) {
              return LT.value;
            }
            ;
            if (y instanceof June) {
              return GT.value;
            }
            ;
            if (x instanceof July && y instanceof July) {
              return EQ.value;
            }
            ;
            if (x instanceof July) {
              return LT.value;
            }
            ;
            if (y instanceof July) {
              return GT.value;
            }
            ;
            if (x instanceof August && y instanceof August) {
              return EQ.value;
            }
            ;
            if (x instanceof August) {
              return LT.value;
            }
            ;
            if (y instanceof August) {
              return GT.value;
            }
            ;
            if (x instanceof September && y instanceof September) {
              return EQ.value;
            }
            ;
            if (x instanceof September) {
              return LT.value;
            }
            ;
            if (y instanceof September) {
              return GT.value;
            }
            ;
            if (x instanceof October && y instanceof October) {
              return EQ.value;
            }
            ;
            if (x instanceof October) {
              return LT.value;
            }
            ;
            if (y instanceof October) {
              return GT.value;
            }
            ;
            if (x instanceof November && y instanceof November) {
              return EQ.value;
            }
            ;
            if (x instanceof November) {
              return LT.value;
            }
            ;
            if (y instanceof November) {
              return GT.value;
            }
            ;
            if (x instanceof December && y instanceof December) {
              return EQ.value;
            }
            ;
            throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
          };
        },
        Eq0: function() {
          return eqMonth;
        }
      };
      eqDay = eqInt;
      boundedYear = /* @__PURE__ */ function() {
        return {
          bottom: -271820 | 0,
          top: 275759,
          Ord0: function() {
            return ordYear;
          }
        };
      }();
      boundedWeekday = /* @__PURE__ */ function() {
        return {
          bottom: Monday.value,
          top: Sunday.value,
          Ord0: function() {
            return ordWeekday;
          }
        };
      }();
      boundedMonth = /* @__PURE__ */ function() {
        return {
          bottom: January.value,
          top: December.value,
          Ord0: function() {
            return ordMonth;
          }
        };
      }();
      boundedEnumYear = {
        cardinality: 547580,
        toEnum: function(n) {
          if (n >= (-271820 | 0) && n <= 275759) {
            return new Just(n);
          }
          ;
          if (otherwise) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Date.Component (line 35, column 1 - line 40, column 24): " + [n.constructor.name]);
        },
        fromEnum: function(v) {
          return v;
        },
        Bounded0: function() {
          return boundedYear;
        },
        Enum1: function() {
          return $lazy_enumYear(0);
        }
      };
      $lazy_enumYear = /* @__PURE__ */ $runtime_lazy2("enumYear", "Data.Date.Component", function() {
        return {
          succ: function() {
            var $55 = toEnum(boundedEnumYear);
            var $56 = fromEnum(boundedEnumYear);
            return function($57) {
              return $55(function(v) {
                return v + 1 | 0;
              }($56($57)));
            };
          }(),
          pred: function() {
            var $58 = toEnum(boundedEnumYear);
            var $59 = fromEnum(boundedEnumYear);
            return function($60) {
              return $58(function(v) {
                return v - 1 | 0;
              }($59($60)));
            };
          }(),
          Ord0: function() {
            return ordYear;
          }
        };
      });
      boundedEnumWeekday = {
        cardinality: 7,
        toEnum: function(v) {
          if (v === 1) {
            return new Just(Monday.value);
          }
          ;
          if (v === 2) {
            return new Just(Tuesday.value);
          }
          ;
          if (v === 3) {
            return new Just(Wednesday.value);
          }
          ;
          if (v === 4) {
            return new Just(Thursday.value);
          }
          ;
          if (v === 5) {
            return new Just(Friday.value);
          }
          ;
          if (v === 6) {
            return new Just(Saturday.value);
          }
          ;
          if (v === 7) {
            return new Just(Sunday.value);
          }
          ;
          return Nothing.value;
        },
        fromEnum: function(v) {
          if (v instanceof Monday) {
            return 1;
          }
          ;
          if (v instanceof Tuesday) {
            return 2;
          }
          ;
          if (v instanceof Wednesday) {
            return 3;
          }
          ;
          if (v instanceof Thursday) {
            return 4;
          }
          ;
          if (v instanceof Friday) {
            return 5;
          }
          ;
          if (v instanceof Saturday) {
            return 6;
          }
          ;
          if (v instanceof Sunday) {
            return 7;
          }
          ;
          throw new Error("Failed pattern match at Data.Date.Component (line 175, column 14 - line 182, column 16): " + [v.constructor.name]);
        },
        Bounded0: function() {
          return boundedWeekday;
        },
        Enum1: function() {
          return $lazy_enumWeekday(0);
        }
      };
      $lazy_enumWeekday = /* @__PURE__ */ $runtime_lazy2("enumWeekday", "Data.Date.Component", function() {
        return {
          succ: function() {
            var $61 = toEnum(boundedEnumWeekday);
            var $62 = fromEnum(boundedEnumWeekday);
            return function($63) {
              return $61(function(v) {
                return v + 1 | 0;
              }($62($63)));
            };
          }(),
          pred: function() {
            var $64 = toEnum(boundedEnumWeekday);
            var $65 = fromEnum(boundedEnumWeekday);
            return function($66) {
              return $64(function(v) {
                return v - 1 | 0;
              }($65($66)));
            };
          }(),
          Ord0: function() {
            return ordWeekday;
          }
        };
      });
      boundedEnumMonth = {
        cardinality: 12,
        toEnum: function(v) {
          if (v === 1) {
            return new Just(January.value);
          }
          ;
          if (v === 2) {
            return new Just(February.value);
          }
          ;
          if (v === 3) {
            return new Just(March.value);
          }
          ;
          if (v === 4) {
            return new Just(April.value);
          }
          ;
          if (v === 5) {
            return new Just(May.value);
          }
          ;
          if (v === 6) {
            return new Just(June.value);
          }
          ;
          if (v === 7) {
            return new Just(July.value);
          }
          ;
          if (v === 8) {
            return new Just(August.value);
          }
          ;
          if (v === 9) {
            return new Just(September.value);
          }
          ;
          if (v === 10) {
            return new Just(October.value);
          }
          ;
          if (v === 11) {
            return new Just(November.value);
          }
          ;
          if (v === 12) {
            return new Just(December.value);
          }
          ;
          return Nothing.value;
        },
        fromEnum: function(v) {
          if (v instanceof January) {
            return 1;
          }
          ;
          if (v instanceof February) {
            return 2;
          }
          ;
          if (v instanceof March) {
            return 3;
          }
          ;
          if (v instanceof April) {
            return 4;
          }
          ;
          if (v instanceof May) {
            return 5;
          }
          ;
          if (v instanceof June) {
            return 6;
          }
          ;
          if (v instanceof July) {
            return 7;
          }
          ;
          if (v instanceof August) {
            return 8;
          }
          ;
          if (v instanceof September) {
            return 9;
          }
          ;
          if (v instanceof October) {
            return 10;
          }
          ;
          if (v instanceof November) {
            return 11;
          }
          ;
          if (v instanceof December) {
            return 12;
          }
          ;
          throw new Error("Failed pattern match at Data.Date.Component (line 87, column 14 - line 99, column 19): " + [v.constructor.name]);
        },
        Bounded0: function() {
          return boundedMonth;
        },
        Enum1: function() {
          return $lazy_enumMonth(0);
        }
      };
      $lazy_enumMonth = /* @__PURE__ */ $runtime_lazy2("enumMonth", "Data.Date.Component", function() {
        return {
          succ: function() {
            var $67 = toEnum(boundedEnumMonth);
            var $68 = fromEnum(boundedEnumMonth);
            return function($69) {
              return $67(function(v) {
                return v + 1 | 0;
              }($68($69)));
            };
          }(),
          pred: function() {
            var $70 = toEnum(boundedEnumMonth);
            var $71 = fromEnum(boundedEnumMonth);
            return function($72) {
              return $70(function(v) {
                return v - 1 | 0;
              }($71($72)));
            };
          }(),
          Ord0: function() {
            return ordMonth;
          }
        };
      });
      boundedDay = {
        bottom: 1,
        top: 31,
        Ord0: function() {
          return ordDay;
        }
      };
      boundedEnumDay = {
        cardinality: 31,
        toEnum: function(n) {
          if (n >= 1 && n <= 31) {
            return new Just(n);
          }
          ;
          if (otherwise) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Date.Component (line 133, column 1 - line 138, column 23): " + [n.constructor.name]);
        },
        fromEnum: function(v) {
          return v;
        },
        Bounded0: function() {
          return boundedDay;
        },
        Enum1: function() {
          return $lazy_enumDay(0);
        }
      };
      $lazy_enumDay = /* @__PURE__ */ $runtime_lazy2("enumDay", "Data.Date.Component", function() {
        return {
          succ: function() {
            var $73 = toEnum(boundedEnumDay);
            var $74 = fromEnum(boundedEnumDay);
            return function($75) {
              return $73(function(v) {
                return v + 1 | 0;
              }($74($75)));
            };
          }(),
          pred: function() {
            var $76 = toEnum(boundedEnumDay);
            var $77 = fromEnum(boundedEnumDay);
            return function($78) {
              return $76(function(v) {
                return v - 1 | 0;
              }($77($78)));
            };
          }(),
          Ord0: function() {
            return ordDay;
          }
        };
      });
    }
  });

  // output/Data.Int/foreign.js
  var fromNumberImpl, toNumber;
  var init_foreign27 = __esm({
    "output/Data.Int/foreign.js"() {
      fromNumberImpl = function(just) {
        return function(nothing) {
          return function(n) {
            return (n | 0) === n ? just(n) : nothing;
          };
        };
      };
      toNumber = function(n) {
        return n;
      };
    }
  });

  // output/Data.Number/foreign.js
  var isFiniteImpl, floor;
  var init_foreign28 = __esm({
    "output/Data.Number/foreign.js"() {
      isFiniteImpl = isFinite;
      floor = Math.floor;
    }
  });

  // output/Data.Number/index.js
  var init_Data31 = __esm({
    "output/Data.Number/index.js"() {
      init_foreign28();
      init_Data15();
      init_foreign28();
    }
  });

  // output/Data.Int/index.js
  var top2, bottom2, fromNumber, unsafeClamp, floor2;
  var init_Data32 = __esm({
    "output/Data.Int/index.js"() {
      init_foreign27();
      init_Control2();
      init_Data();
      init_Data13();
      init_Data8();
      init_Data15();
      init_Data31();
      init_Data9();
      init_Data10();
      init_foreign27();
      top2 = /* @__PURE__ */ top(boundedInt);
      bottom2 = /* @__PURE__ */ bottom(boundedInt);
      fromNumber = /* @__PURE__ */ function() {
        return fromNumberImpl(Just.create)(Nothing.value);
      }();
      unsafeClamp = function(x) {
        if (!isFiniteImpl(x)) {
          return 0;
        }
        ;
        if (x >= toNumber(top2)) {
          return top2;
        }
        ;
        if (x <= toNumber(bottom2)) {
          return bottom2;
        }
        ;
        if (otherwise) {
          return fromMaybe(0)(fromNumber(x));
        }
        ;
        throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
      };
      floor2 = function($39) {
        return unsafeClamp(floor($39));
      };
    }
  });

  // output/Data.Time.Duration/index.js
  var identity5, fromDuration, durationMilliseconds;
  var init_Data_Time = __esm({
    "output/Data.Time.Duration/index.js"() {
      init_Control2();
      init_Data8();
      init_Data25();
      init_Data12();
      init_Data11();
      init_Data14();
      identity5 = /* @__PURE__ */ identity(categoryFn);
      fromDuration = function(dict) {
        return dict.fromDuration;
      };
      durationMilliseconds = {
        fromDuration: identity5,
        toDuration: identity5
      };
    }
  });

  // output/Data.Date/index.js
  var fromEnum2, fromJust4, toEnum2, eq12, eq2, eq3, toEnum22, $$Date, year, weekday, month, eqDate, eq4, day, canonicalDate, exactDate;
  var init_Data33 = __esm({
    "output/Data.Date/index.js"() {
      init_foreign19();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Data();
      init_Data13();
      init_Data_Date();
      init_Data30();
      init_Data8();
      init_Data19();
      init_Data2();
      init_Data4();
      init_Data32();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data14();
      init_Data_Time();
      init_Data_Date();
      fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
      fromJust4 = /* @__PURE__ */ fromJust();
      toEnum2 = /* @__PURE__ */ toEnum(boundedEnumWeekday);
      eq12 = /* @__PURE__ */ eq(eqYear);
      eq2 = /* @__PURE__ */ eq(eqMonth);
      eq3 = /* @__PURE__ */ eq(eqDay);
      toEnum22 = /* @__PURE__ */ toEnum(boundedEnumMonth);
      $$Date = /* @__PURE__ */ function() {
        function $$Date2(value0, value1, value22) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
        }
        ;
        $$Date2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return new $$Date2(value0, value1, value22);
            };
          };
        };
        return $$Date2;
      }();
      year = function(v) {
        return v.value0;
      };
      weekday = function(v) {
        var n = calcWeekday(v.value0, fromEnum2(v.value1), v.value2);
        var $86 = n === 0;
        if ($86) {
          return fromJust4(toEnum2(7));
        }
        ;
        return fromJust4(toEnum2(n));
      };
      month = function(v) {
        return v.value1;
      };
      eqDate = {
        eq: function(x) {
          return function(y) {
            return eq12(x.value0)(y.value0) && eq2(x.value1)(y.value1) && eq3(x.value2)(y.value2);
          };
        }
      };
      eq4 = /* @__PURE__ */ eq(eqDate);
      day = function(v) {
        return v.value2;
      };
      canonicalDate = function(y) {
        return function(m) {
          return function(d) {
            var mkDate = function(y$prime) {
              return function(m$prime) {
                return function(d$prime) {
                  return new $$Date(y$prime, fromJust4(toEnum22(m$prime)), d$prime);
                };
              };
            };
            return canonicalDateImpl(mkDate, y, fromEnum2(m), d);
          };
        };
      };
      exactDate = function(y) {
        return function(m) {
          return function(d) {
            var dt2 = new $$Date(y, m, d);
            var $144 = eq4(canonicalDate(y)(m)(d))(dt2);
            if ($144) {
              return new Just(dt2);
            }
            ;
            return Nothing.value;
          };
        };
      };
    }
  });

  // output/Data.Time.Component/index.js
  var $runtime_lazy3, ordSecond, ordMinute, ordMillisecond, ordHour, boundedSecond, boundedMinute, boundedMillisecond, boundedHour, boundedEnumSecond, $lazy_enumSecond, boundedEnumMinute, $lazy_enumMinute, boundedEnumMillisecond, $lazy_enumMillisecond, boundedEnumHour, $lazy_enumHour;
  var init_Data_Time2 = __esm({
    "output/Data.Time.Component/index.js"() {
      init_Data();
      init_Data30();
      init_Data8();
      init_Data15();
      init_Data12();
      init_Data14();
      $runtime_lazy3 = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      ordSecond = ordInt;
      ordMinute = ordInt;
      ordMillisecond = ordInt;
      ordHour = ordInt;
      boundedSecond = {
        bottom: 0,
        top: 59,
        Ord0: function() {
          return ordSecond;
        }
      };
      boundedMinute = {
        bottom: 0,
        top: 59,
        Ord0: function() {
          return ordMinute;
        }
      };
      boundedMillisecond = {
        bottom: 0,
        top: 999,
        Ord0: function() {
          return ordMillisecond;
        }
      };
      boundedHour = {
        bottom: 0,
        top: 23,
        Ord0: function() {
          return ordHour;
        }
      };
      boundedEnumSecond = {
        cardinality: 60,
        toEnum: function(n) {
          if (n >= 0 && n <= 59) {
            return new Just(n);
          }
          ;
          if (otherwise) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Time.Component (line 90, column 1 - line 95, column 26): " + [n.constructor.name]);
        },
        fromEnum: function(v) {
          return v;
        },
        Bounded0: function() {
          return boundedSecond;
        },
        Enum1: function() {
          return $lazy_enumSecond(0);
        }
      };
      $lazy_enumSecond = /* @__PURE__ */ $runtime_lazy3("enumSecond", "Data.Time.Component", function() {
        return {
          succ: function() {
            var $36 = toEnum(boundedEnumSecond);
            var $37 = fromEnum(boundedEnumSecond);
            return function($38) {
              return $36(function(v) {
                return v + 1 | 0;
              }($37($38)));
            };
          }(),
          pred: function() {
            var $39 = toEnum(boundedEnumSecond);
            var $40 = fromEnum(boundedEnumSecond);
            return function($41) {
              return $39(function(v) {
                return v - 1 | 0;
              }($40($41)));
            };
          }(),
          Ord0: function() {
            return ordSecond;
          }
        };
      });
      boundedEnumMinute = {
        cardinality: 60,
        toEnum: function(n) {
          if (n >= 0 && n <= 59) {
            return new Just(n);
          }
          ;
          if (otherwise) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Time.Component (line 61, column 1 - line 66, column 26): " + [n.constructor.name]);
        },
        fromEnum: function(v) {
          return v;
        },
        Bounded0: function() {
          return boundedMinute;
        },
        Enum1: function() {
          return $lazy_enumMinute(0);
        }
      };
      $lazy_enumMinute = /* @__PURE__ */ $runtime_lazy3("enumMinute", "Data.Time.Component", function() {
        return {
          succ: function() {
            var $42 = toEnum(boundedEnumMinute);
            var $43 = fromEnum(boundedEnumMinute);
            return function($44) {
              return $42(function(v) {
                return v + 1 | 0;
              }($43($44)));
            };
          }(),
          pred: function() {
            var $45 = toEnum(boundedEnumMinute);
            var $46 = fromEnum(boundedEnumMinute);
            return function($47) {
              return $45(function(v) {
                return v - 1 | 0;
              }($46($47)));
            };
          }(),
          Ord0: function() {
            return ordMinute;
          }
        };
      });
      boundedEnumMillisecond = {
        cardinality: 1e3,
        toEnum: function(n) {
          if (n >= 0 && n <= 999) {
            return new Just(n);
          }
          ;
          if (otherwise) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Time.Component (line 120, column 1 - line 125, column 31): " + [n.constructor.name]);
        },
        fromEnum: function(v) {
          return v;
        },
        Bounded0: function() {
          return boundedMillisecond;
        },
        Enum1: function() {
          return $lazy_enumMillisecond(0);
        }
      };
      $lazy_enumMillisecond = /* @__PURE__ */ $runtime_lazy3("enumMillisecond", "Data.Time.Component", function() {
        return {
          succ: function() {
            var $48 = toEnum(boundedEnumMillisecond);
            var $49 = fromEnum(boundedEnumMillisecond);
            return function($50) {
              return $48(function(v) {
                return v + 1 | 0;
              }($49($50)));
            };
          }(),
          pred: function() {
            var $51 = toEnum(boundedEnumMillisecond);
            var $52 = fromEnum(boundedEnumMillisecond);
            return function($53) {
              return $51(function(v) {
                return v - 1 | 0;
              }($52($53)));
            };
          }(),
          Ord0: function() {
            return ordMillisecond;
          }
        };
      });
      boundedEnumHour = {
        cardinality: 24,
        toEnum: function(n) {
          if (n >= 0 && n <= 23) {
            return new Just(n);
          }
          ;
          if (otherwise) {
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Time.Component (line 32, column 1 - line 37, column 24): " + [n.constructor.name]);
        },
        fromEnum: function(v) {
          return v;
        },
        Bounded0: function() {
          return boundedHour;
        },
        Enum1: function() {
          return $lazy_enumHour(0);
        }
      };
      $lazy_enumHour = /* @__PURE__ */ $runtime_lazy3("enumHour", "Data.Time.Component", function() {
        return {
          succ: function() {
            var $54 = toEnum(boundedEnumHour);
            var $55 = fromEnum(boundedEnumHour);
            return function($56) {
              return $54(function(v) {
                return v + 1 | 0;
              }($55($56)));
            };
          }(),
          pred: function() {
            var $57 = toEnum(boundedEnumHour);
            var $58 = fromEnum(boundedEnumHour);
            return function($59) {
              return $57(function(v) {
                return v - 1 | 0;
              }($58($59)));
            };
          }(),
          Ord0: function() {
            return ordHour;
          }
        };
      });
    }
  });

  // output/Data.Time/index.js
  var Time, second, minute, millisecond, hour;
  var init_Data34 = __esm({
    "output/Data.Time/index.js"() {
      init_Control3();
      init_Data13();
      init_Data30();
      init_Data8();
      init_Data4();
      init_Data32();
      init_Data15();
      init_Data25();
      init_Data31();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data14();
      init_Data_Time2();
      init_Data_Time();
      init_Data22();
      Time = /* @__PURE__ */ function() {
        function Time2(value0, value1, value22, value32) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
        }
        ;
        Time2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return new Time2(value0, value1, value22, value32);
              };
            };
          };
        };
        return Time2;
      }();
      second = function(v) {
        return v.value2;
      };
      minute = function(v) {
        return v.value1;
      };
      millisecond = function(v) {
        return v.value3;
      };
      hour = function(v) {
        return v.value0;
      };
    }
  });

  // output/Data.DateTime/index.js
  var fromEnum3, fromEnum1, fromEnum22, fromEnum32, fromEnum4, fromEnum5, fromEnum6, bind2, apply2, map4, join2, toEnum3, toEnum1, toEnum23, toEnum32, toEnum4, toEnum5, toEnum6, DateTime, toRecord, adjust;
  var init_Data35 = __esm({
    "output/Data.DateTime/index.js"() {
      init_foreign18();
      init_Control3();
      init_Control5();
      init_Data13();
      init_Data33();
      init_Data_Date();
      init_Data30();
      init_Data8();
      init_Data2();
      init_Data4();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data14();
      init_Data34();
      init_Data_Time2();
      init_Data_Time();
      init_Data33();
      init_Data34();
      fromEnum3 = /* @__PURE__ */ fromEnum(boundedEnumYear);
      fromEnum1 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
      fromEnum22 = /* @__PURE__ */ fromEnum(boundedEnumDay);
      fromEnum32 = /* @__PURE__ */ fromEnum(boundedEnumHour);
      fromEnum4 = /* @__PURE__ */ fromEnum(boundedEnumMinute);
      fromEnum5 = /* @__PURE__ */ fromEnum(boundedEnumSecond);
      fromEnum6 = /* @__PURE__ */ fromEnum(boundedEnumMillisecond);
      bind2 = /* @__PURE__ */ bind(bindMaybe);
      apply2 = /* @__PURE__ */ apply(applyMaybe);
      map4 = /* @__PURE__ */ map(functorMaybe);
      join2 = /* @__PURE__ */ join(bindMaybe);
      toEnum3 = /* @__PURE__ */ toEnum(boundedEnumYear);
      toEnum1 = /* @__PURE__ */ toEnum(boundedEnumMonth);
      toEnum23 = /* @__PURE__ */ toEnum(boundedEnumDay);
      toEnum32 = /* @__PURE__ */ toEnum(boundedEnumHour);
      toEnum4 = /* @__PURE__ */ toEnum(boundedEnumMinute);
      toEnum5 = /* @__PURE__ */ toEnum(boundedEnumSecond);
      toEnum6 = /* @__PURE__ */ toEnum(boundedEnumMillisecond);
      DateTime = /* @__PURE__ */ function() {
        function DateTime2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        DateTime2.create = function(value0) {
          return function(value1) {
            return new DateTime2(value0, value1);
          };
        };
        return DateTime2;
      }();
      toRecord = function(v) {
        return {
          year: fromEnum3(year(v.value0)),
          month: fromEnum1(month(v.value0)),
          day: fromEnum22(day(v.value0)),
          hour: fromEnum32(hour(v.value1)),
          minute: fromEnum4(minute(v.value1)),
          second: fromEnum5(second(v.value1)),
          millisecond: fromEnum6(millisecond(v.value1))
        };
      };
      adjust = function(dictDuration) {
        var fromDuration2 = fromDuration(dictDuration);
        return function(d) {
          return function(dt2) {
            return bind2(adjustImpl(Just.create)(Nothing.value)(fromDuration2(d))(toRecord(dt2)))(function(rec) {
              return apply2(map4(DateTime.create)(join2(apply2(apply2(map4(exactDate)(toEnum3(rec.year)))(toEnum1(rec.month)))(toEnum23(rec.day)))))(apply2(apply2(apply2(map4(Time.create)(toEnum32(rec.hour)))(toEnum4(rec.minute)))(toEnum5(rec.second)))(toEnum6(rec.millisecond)));
            });
          };
        };
      };
    }
  });

  // output/Control.Monad.Reader.Class/index.js
  var init_Control_Monad_Reader = __esm({
    "output/Control.Monad.Reader.Class/index.js"() {
      init_Control2();
      init_Control6();
      init_Control();
      init_Data4();
    }
  });

  // output/Control.Monad.Cont.Class/index.js
  var init_Control_Monad_Cont = __esm({
    "output/Control.Monad.Cont.Class/index.js"() {
    }
  });

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }
  var init_foreign29 = __esm({
    "output/Effect.Exception/foreign.js"() {
    }
  });

  // output/Effect.Exception/index.js
  var $$throw;
  var init_Effect3 = __esm({
    "output/Effect.Exception/index.js"() {
      init_foreign29();
      init_Control4();
      init_Data16();
      init_Data4();
      init_Data15();
      init_Effect();
      init_foreign29();
      $$throw = function($4) {
        return throwException(error($4));
      };
    }
  });

  // output/Control.Monad.Error.Class/index.js
  var throwError, catchError, $$try;
  var init_Control_Monad_Error = __esm({
    "output/Control.Monad.Error.Class/index.js"() {
      init_Control4();
      init_Control5();
      init_Data16();
      init_Data2();
      init_Data4();
      init_Data15();
      init_Data3();
      init_Effect();
      init_Effect3();
      throwError = function(dict) {
        return dict.throwError;
      };
      catchError = function(dict) {
        return dict.catchError;
      };
      $$try = function(dictMonadError) {
        var catchError1 = catchError(dictMonadError);
        var Monad0 = dictMonadError.MonadThrow0().Monad0();
        var map21 = map(Monad0.Bind1().Apply0().Functor0());
        var pure10 = pure(Monad0.Applicative0());
        return function(a2) {
          return catchError1(map21(Right.create)(a2))(function($52) {
            return pure10(Left.create($52));
          });
        };
      };
    }
  });

  // output/Control.Monad.Trans.Class/index.js
  var init_Control_Monad_Trans = __esm({
    "output/Control.Monad.Trans.Class/index.js"() {
    }
  });

  // output/Control.Monad.Writer.Class/index.js
  var init_Control_Monad_Writer = __esm({
    "output/Control.Monad.Writer.Class/index.js"() {
      init_Control4();
      init_Control5();
      init_Data22();
    }
  });

  // output/Type.Equality/index.js
  var init_Type2 = __esm({
    "output/Type.Equality/index.js"() {
    }
  });

  // output/Data.Distributive/index.js
  var init_Data36 = __esm({
    "output/Data.Distributive/index.js"() {
      init_Control2();
      init_Data4();
      init_Data17();
      init_Data25();
      init_Data22();
      init_Data3();
      init_Type2();
    }
  });

  // output/Effect.Class/index.js
  var monadEffectEffect, liftEffect;
  var init_Effect4 = __esm({
    "output/Effect.Class/index.js"() {
      init_Control2();
      init_Effect();
      monadEffectEffect = {
        liftEffect: /* @__PURE__ */ identity(categoryFn),
        Monad0: function() {
          return monadEffect;
        }
      };
      liftEffect = function(dict) {
        return dict.liftEffect;
      };
    }
  });

  // output/Control.Monad.Reader.Trans/index.js
  var init_Control_Monad_Reader2 = __esm({
    "output/Control.Monad.Reader.Trans/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control_Monad_Cont();
      init_Control_Monad_Error();
      init_Control_Monad_Reader();
      init_Control_Monad_Rec();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Control_Monad_Writer();
      init_Control9();
      init_Data36();
      init_Data2();
      init_Data4();
      init_Data20();
      init_Data7();
      init_Effect4();
      init_Control_Monad_Reader();
      init_Control_Monad_Trans();
    }
  });

  // output/Control.Monad.State.Trans/index.js
  var init_Control_Monad_State2 = __esm({
    "output/Control.Monad.State.Trans/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control6();
      init_Control_Monad_Cont();
      init_Control_Monad_Error();
      init_Control_Monad_Reader();
      init_Control_Monad_Rec();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Control_Monad_Writer();
      init_Control9();
      init_Data4();
      init_Data20();
      init_Data7();
      init_Data22();
      init_Data3();
      init_Effect4();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
    }
  });

  // output/Control.Monad.State/index.js
  var init_Control_Monad = __esm({
    "output/Control.Monad.State/index.js"() {
      init_Control_Monad_State();
      init_Control_Monad_State2();
      init_Data17();
      init_Data25();
      init_Control_Monad_State();
      init_Control_Monad_State2();
    }
  });

  // output/Data.Array/foreign.js
  var replicateFill, replicatePolyfill, replicateImpl, fromFoldableImpl, length, findIndexImpl, _deleteAt, sortByImpl;
  var init_foreign30 = __esm({
    "output/Data.Array/foreign.js"() {
      replicateFill = function(count, value12) {
        if (count < 1) {
          return [];
        }
        var result = new Array(count);
        return result.fill(value12);
      };
      replicatePolyfill = function(count, value12) {
        var result = [];
        var n = 0;
        for (var i2 = 0; i2 < count; i2++) {
          result[n++] = value12;
        }
        return result;
      };
      replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
      fromFoldableImpl = function() {
        function Cons3(head5, tail2) {
          this.head = head5;
          this.tail = tail2;
        }
        var emptyList = {};
        function curryCons(head5) {
          return function(tail2) {
            return new Cons3(head5, tail2);
          };
        }
        function listToArray(list) {
          var result = [];
          var count = 0;
          var xs = list;
          while (xs !== emptyList) {
            result[count++] = xs.head;
            xs = xs.tail;
          }
          return result;
        }
        return function(foldr4, xs) {
          return listToArray(foldr4(curryCons)(emptyList)(xs));
        };
      }();
      length = function(xs) {
        return xs.length;
      };
      findIndexImpl = function(just, nothing, f, xs) {
        for (var i2 = 0, l = xs.length; i2 < l; i2++) {
          if (f(xs[i2]))
            return just(i2);
        }
        return nothing;
      };
      _deleteAt = function(just, nothing, i2, l) {
        if (i2 < 0 || i2 >= l.length)
          return nothing;
        var l1 = l.slice();
        l1.splice(i2, 1);
        return just(l1);
      };
      sortByImpl = function() {
        function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to) {
          var mid;
          var i2;
          var j;
          var k;
          var x;
          var y;
          var c;
          mid = from3 + (to - from3 >> 1);
          if (mid - from3 > 1)
            mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
          if (to - mid > 1)
            mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
          i2 = from3;
          j = mid;
          k = from3;
          while (i2 < mid && j < to) {
            x = xs2[i2];
            y = xs2[j];
            c = fromOrdering(compare2(x)(y));
            if (c > 0) {
              xs1[k++] = y;
              ++j;
            } else {
              xs1[k++] = x;
              ++i2;
            }
          }
          while (i2 < mid) {
            xs1[k++] = xs2[i2++];
          }
          while (j < to) {
            xs1[k++] = xs2[j++];
          }
        }
        return function(compare2, fromOrdering, xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      }();
    }
  });

  // output/Control.Monad.ST.Internal/foreign.js
  var init_foreign31 = __esm({
    "output/Control.Monad.ST.Internal/foreign.js"() {
    }
  });

  // output/Control.Monad.ST.Internal/index.js
  var init_Control_Monad_ST = __esm({
    "output/Control.Monad.ST.Internal/index.js"() {
      init_foreign31();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control6();
      init_Control_Monad_Rec();
      init_Data4();
      init_Data20();
      init_Data7();
      init_Data3();
      init_foreign31();
    }
  });

  // output/Data.Array.ST/foreign.js
  var sortByImpl2;
  var init_foreign32 = __esm({
    "output/Data.Array.ST/foreign.js"() {
      sortByImpl2 = function() {
        function mergeFromTo(compare2, fromOrdering, xs1, xs2, from3, to) {
          var mid;
          var i2;
          var j;
          var k;
          var x;
          var y;
          var c;
          mid = from3 + (to - from3 >> 1);
          if (mid - from3 > 1)
            mergeFromTo(compare2, fromOrdering, xs2, xs1, from3, mid);
          if (to - mid > 1)
            mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
          i2 = from3;
          j = mid;
          k = from3;
          while (i2 < mid && j < to) {
            x = xs2[i2];
            y = xs2[j];
            c = fromOrdering(compare2(x)(y));
            if (c > 0) {
              xs1[k++] = y;
              ++j;
            } else {
              xs1[k++] = x;
              ++i2;
            }
          }
          while (i2 < mid) {
            xs1[k++] = xs2[i2++];
          }
          while (j < to) {
            xs1[k++] = xs2[j++];
          }
        }
        return function(compare2, fromOrdering, xs) {
          if (xs.length < 2)
            return xs;
          mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
          return xs;
        };
      }();
    }
  });

  // output/Control.Monad.ST.Uncurried/foreign.js
  var init_foreign33 = __esm({
    "output/Control.Monad.ST.Uncurried/foreign.js"() {
    }
  });

  // output/Control.Monad.ST.Uncurried/index.js
  var init_Control_Monad_ST2 = __esm({
    "output/Control.Monad.ST.Uncurried/index.js"() {
      init_foreign33();
      init_foreign33();
    }
  });

  // output/Data.Array.ST/index.js
  var init_Data_Array = __esm({
    "output/Data.Array.ST/index.js"() {
      init_foreign32();
      init_Control5();
      init_Control_Monad_ST();
      init_Control_Monad_ST2();
      init_Data15();
      init_Data12();
      init_Data9();
      init_foreign32();
    }
  });

  // output/Data.Array.ST.Iterator/index.js
  var init_Data_Array_ST = __esm({
    "output/Data.Array.ST.Iterator/index.js"() {
      init_Control_Monad_ST();
      init_Data_Array();
      init_Data2();
      init_Data4();
      init_Data21();
      init_Data15();
    }
  });

  // output/Data.Function.Uncurried/foreign.js
  var runFn4;
  var init_foreign34 = __esm({
    "output/Data.Function.Uncurried/foreign.js"() {
      runFn4 = function(fn) {
        return function(a2) {
          return function(b2) {
            return function(c) {
              return function(d) {
                return fn(a2, b2, c, d);
              };
            };
          };
        };
      };
    }
  });

  // output/Data.Function.Uncurried/index.js
  var init_Data_Function = __esm({
    "output/Data.Function.Uncurried/index.js"() {
      init_foreign34();
      init_foreign34();
    }
  });

  // output/Data.FunctorWithIndex/foreign.js
  var init_foreign35 = __esm({
    "output/Data.FunctorWithIndex/foreign.js"() {
    }
  });

  // output/Data.FunctorWithIndex/index.js
  var init_Data37 = __esm({
    "output/Data.FunctorWithIndex/index.js"() {
      init_foreign35();
      init_Data24();
      init_Data23();
      init_Data16();
      init_Data2();
      init_Data4();
      init_Data_Functor3();
      init_Data_Functor4();
      init_Data_Functor2();
      init_Data_Functor5();
      init_Data17();
      init_Data15();
      init_Data_Maybe();
      init_Data_Maybe2();
      init_Data_Monoid5();
      init_Data_Monoid();
      init_Data_Monoid2();
      init_Data_Monoid3();
      init_Data_Monoid6();
      init_Data22();
      init_Data3();
    }
  });

  // output/Data.Array/index.js
  var fromJust5, findIndex, deleteAt, deleteBy;
  var init_Data38 = __esm({
    "output/Data.Array/index.js"() {
      init_foreign30();
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control8();
      init_Control_Monad_Rec();
      init_Control_Monad_ST();
      init_Data_Array();
      init_Data_Array_ST();
      init_Data();
      init_Data8();
      init_Data26();
      init_Data2();
      init_Data_Function();
      init_Data4();
      init_Data37();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data27();
      init_Data22();
      init_Data29();
      init_foreign30();
      fromJust5 = /* @__PURE__ */ fromJust();
      findIndex = /* @__PURE__ */ function() {
        return runFn4(findIndexImpl)(Just.create)(Nothing.value);
      }();
      deleteAt = /* @__PURE__ */ function() {
        return runFn4(_deleteAt)(Just.create)(Nothing.value);
      }();
      deleteBy = function(v) {
        return function(v1) {
          return function(v2) {
            if (v2.length === 0) {
              return [];
            }
            ;
            return maybe(v2)(function(i2) {
              return fromJust5(deleteAt(i2)(v2));
            })(findIndex(v(v1))(v2));
          };
        };
      };
    }
  });

  // output/Data.DateTime.Instant/foreign.js
  function fromDateTimeImpl(y, mo, d, h, mi, s, ms) {
    return createDateTime(y, mo - 1, d, h, mi, s, ms).getTime();
  }
  function toDateTimeImpl(ctor) {
    return function(instant2) {
      var dt2 = new Date(instant2);
      return ctor(dt2.getUTCFullYear())(dt2.getUTCMonth() + 1)(dt2.getUTCDate())(dt2.getUTCHours())(dt2.getUTCMinutes())(dt2.getUTCSeconds())(dt2.getUTCMilliseconds());
    };
  }
  var createDateTime;
  var init_foreign36 = __esm({
    "output/Data.DateTime.Instant/foreign.js"() {
      createDateTime = function(y, m, d, h, mi, s, ms) {
        var dateTime3 = new Date(Date.UTC(y, m, d, h, mi, s, ms));
        if (y >= 0 && y < 100) {
          dateTime3.setUTCFullYear(y);
        }
        return dateTime3;
      };
    }
  });

  // output/Data.DateTime.Instant/index.js
  var fromJust6, toEnum7, fromEnum7, unInstant, toDateTime, fromDateTime;
  var init_Data_DateTime = __esm({
    "output/Data.DateTime.Instant/index.js"() {
      init_foreign36();
      init_Data();
      init_Data13();
      init_Data33();
      init_Data_Date();
      init_Data35();
      init_Data30();
      init_Data15();
      init_Data7();
      init_Data14();
      init_Data34();
      init_Data_Time2();
      init_Data_Time();
      fromJust6 = /* @__PURE__ */ fromJust();
      toEnum7 = /* @__PURE__ */ toEnum(boundedEnumMonth);
      fromEnum7 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
      unInstant = function(v) {
        return v;
      };
      toDateTime = /* @__PURE__ */ function() {
        var mkDateTime = function(y) {
          return function(mo) {
            return function(d) {
              return function(h) {
                return function(mi) {
                  return function(s) {
                    return function(ms) {
                      return new DateTime(canonicalDate(y)(fromJust6(toEnum7(mo)))(d), new Time(h, mi, s, ms));
                    };
                  };
                };
              };
            };
          };
        };
        return toDateTimeImpl(mkDateTime);
      }();
      fromDateTime = function(v) {
        return fromDateTimeImpl(year(v.value0), fromEnum7(month(v.value0)), day(v.value0), hour(v.value1), minute(v.value1), second(v.value1), millisecond(v.value1));
      };
    }
  });

  // output/Data.Formatter.Internal/index.js
  var init_Data_Formatter = __esm({
    "output/Data.Formatter.Internal/index.js"() {
      init_Data26();
      init_Data20();
      init_Data7();
    }
  });

  // output/Control.Monad.Except.Trans/index.js
  var init_Control_Monad_Except = __esm({
    "output/Control.Monad.Except.Trans/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control6();
      init_Control_Monad_Cont();
      init_Control_Monad_Error();
      init_Control_Monad_Reader();
      init_Control_Monad_Rec();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Control_Monad_Writer();
      init_Data16();
      init_Data4();
      init_Data20();
      init_Data7();
      init_Data22();
      init_Effect4();
      init_Control_Monad_Error();
      init_Control_Monad_Trans();
    }
  });

  // output/Data.Lazy/foreign.js
  var init_foreign37 = __esm({
    "output/Data.Lazy/foreign.js"() {
    }
  });

  // output/Data.Lazy/index.js
  var init_Data39 = __esm({
    "output/Data.Lazy/index.js"() {
      init_foreign37();
      init_Control3();
      init_Data13();
      init_Data8();
      init_Data19();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data_Functor();
      init_Data21();
      init_Data20();
      init_Data12();
      init_Data11();
      init_Data7();
      init_Data10();
      init_Data14();
      init_Data27();
      init_Data3();
      init_foreign37();
    }
  });

  // output/Data.Show.Generic/foreign.js
  var init_foreign38 = __esm({
    "output/Data.Show.Generic/foreign.js"() {
    }
  });

  // output/Data.Show.Generic/index.js
  var init_Data_Show = __esm({
    "output/Data.Show.Generic/index.js"() {
      init_foreign38();
      init_Data_Generic();
      init_Data7();
      init_Data14();
      init_Data5();
      init_Type();
    }
  });

  // output/Parsing/index.js
  var init_Parsing = __esm({
    "output/Parsing/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control_Monad_Error();
      init_Control_Monad_Except();
      init_Control_Monad_Reader();
      init_Control_Monad_Rec();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Data16();
      init_Data8();
      init_Data4();
      init_Data39();
      init_Data15();
      init_Data20();
      init_Data25();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data14();
      init_Data_Show();
      init_Data22();
      init_Data3();
    }
  });

  // output/Data.FoldableWithIndex/index.js
  var init_Data40 = __esm({
    "output/Data.FoldableWithIndex/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Data16();
      init_Data26();
      init_Data2();
      init_Data_Functor2();
      init_Data37();
      init_Data15();
      init_Data20();
      init_Data_Monoid();
      init_Data_Monoid2();
      init_Data_Monoid3();
      init_Data_Monoid4();
      init_Data25();
      init_Data7();
      init_Data22();
      init_Data3();
    }
  });

  // output/Data.TraversableWithIndex/index.js
  var init_Data41 = __esm({
    "output/Data.TraversableWithIndex/index.js"() {
      init_Control4();
      init_Control3();
      init_Data16();
      init_Data40();
      init_Data2();
      init_Data4();
      init_Data_Functor3();
      init_Data_Functor4();
      init_Data_Functor2();
      init_Data_Functor5();
      init_Data37();
      init_Data17();
      init_Data27();
      init_Data_Traversable_Accum();
      init_Data22();
      init_Data3();
    }
  });

  // output/Data.NonEmpty/index.js
  var NonEmpty, singleton2;
  var init_Data42 = __esm({
    "output/Data.NonEmpty/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control9();
      init_Data8();
      init_Data26();
      init_Data40();
      init_Data4();
      init_Data37();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data_Semigroup();
      init_Data14();
      init_Data27();
      init_Data41();
      init_Data22();
      init_Data29();
      NonEmpty = /* @__PURE__ */ function() {
        function NonEmpty2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        NonEmpty2.create = function(value0) {
          return function(value1) {
            return new NonEmpty2(value0, value1);
          };
        };
        return NonEmpty2;
      }();
      singleton2 = function(dictPlus) {
        var empty7 = empty(dictPlus);
        return function(a2) {
          return new NonEmpty(a2, empty7);
        };
      };
    }
  });

  // output/Data.List.Types/index.js
  var Nil, Cons, NonEmptyList, listMap, functorList, foldableList, foldr2, semigroupList, append1, altList, plusList;
  var init_Data_List = __esm({
    "output/Data.List.Types/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Data8();
      init_Data26();
      init_Data40();
      init_Data2();
      init_Data4();
      init_Data37();
      init_Data15();
      init_Data20();
      init_Data42();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data_Semigroup2();
      init_Data10();
      init_Data14();
      init_Data27();
      init_Data41();
      init_Data22();
      Nil = /* @__PURE__ */ function() {
        function Nil3() {
        }
        ;
        Nil3.value = new Nil3();
        return Nil3;
      }();
      Cons = /* @__PURE__ */ function() {
        function Cons3(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Cons3.create = function(value0) {
          return function(value1) {
            return new Cons3(value0, value1);
          };
        };
        return Cons3;
      }();
      NonEmptyList = function(x) {
        return x;
      };
      listMap = function(f) {
        var chunkedRevMap = function($copy_v) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1) {
              if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
                $tco_var_v = new Cons(v1, v);
                $copy_v1 = v1.value1.value1.value1;
                return;
              }
              ;
              var unrolledMap = function(v2) {
                if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
                  return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
                }
                ;
                if (v2 instanceof Cons && v2.value1 instanceof Nil) {
                  return new Cons(f(v2.value0), Nil.value);
                }
                ;
                return Nil.value;
              };
              var reverseUnrolledMap = function($copy_v2) {
                return function($copy_v3) {
                  var $tco_var_v2 = $copy_v2;
                  var $tco_done1 = false;
                  var $tco_result2;
                  function $tco_loop2(v2, v3) {
                    if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                      $tco_var_v2 = v2.value1;
                      $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                      return;
                    }
                    ;
                    $tco_done1 = true;
                    return v3;
                  }
                  ;
                  while (!$tco_done1) {
                    $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
                  }
                  ;
                  return $tco_result2;
                };
              };
              $tco_done = true;
              return reverseUnrolledMap(v)(unrolledMap(v1));
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return chunkedRevMap(Nil.value);
      };
      functorList = {
        map: listMap
      };
      foldableList = {
        foldr: function(f) {
          return function(b2) {
            var rev3 = function() {
              var go2 = function($copy_v) {
                return function($copy_v1) {
                  var $tco_var_v = $copy_v;
                  var $tco_done = false;
                  var $tco_result;
                  function $tco_loop(v, v1) {
                    if (v1 instanceof Nil) {
                      $tco_done = true;
                      return v;
                    }
                    ;
                    if (v1 instanceof Cons) {
                      $tco_var_v = new Cons(v1.value0, v);
                      $copy_v1 = v1.value1;
                      return;
                    }
                    ;
                    throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
                  }
                  ;
                  while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_v, $copy_v1);
                  }
                  ;
                  return $tco_result;
                };
              };
              return go2(Nil.value);
            }();
            var $284 = foldl(foldableList)(flip(f))(b2);
            return function($285) {
              return $284(rev3($285));
            };
          };
        },
        foldl: function(f) {
          var go2 = function($copy_b) {
            return function($copy_v) {
              var $tco_var_b = $copy_b;
              var $tco_done1 = false;
              var $tco_result;
              function $tco_loop(b2, v) {
                if (v instanceof Nil) {
                  $tco_done1 = true;
                  return b2;
                }
                ;
                if (v instanceof Cons) {
                  $tco_var_b = f(b2)(v.value0);
                  $copy_v = v.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
              }
              ;
              while (!$tco_done1) {
                $tco_result = $tco_loop($tco_var_b, $copy_v);
              }
              ;
              return $tco_result;
            };
          };
          return go2;
        },
        foldMap: function(dictMonoid) {
          var append22 = append(dictMonoid.Semigroup0());
          var mempty2 = mempty(dictMonoid);
          return function(f) {
            return foldl(foldableList)(function(acc) {
              var $286 = append22(acc);
              return function($287) {
                return $286(f($287));
              };
            })(mempty2);
          };
        }
      };
      foldr2 = /* @__PURE__ */ foldr(foldableList);
      semigroupList = {
        append: function(xs) {
          return function(ys) {
            return foldr2(Cons.create)(ys)(xs);
          };
        }
      };
      append1 = /* @__PURE__ */ append(semigroupList);
      altList = {
        alt: append1,
        Functor0: function() {
          return functorList;
        }
      };
      plusList = /* @__PURE__ */ function() {
        return {
          empty: Nil.value,
          Alt0: function() {
            return altList;
          }
        };
      }();
    }
  });

  // output/Data.List.Internal/index.js
  var init_Data_List2 = __esm({
    "output/Data.List.Internal/index.js"() {
      init_Data_List();
      init_Data9();
    }
  });

  // output/Data.List/index.js
  var reverse2, $$null, fromFoldable;
  var init_Data43 = __esm({
    "output/Data.List/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control8();
      init_Control_Monad_Rec();
      init_Data24();
      init_Data();
      init_Data8();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data21();
      init_Data_List2();
      init_Data_List();
      init_Data15();
      init_Data42();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data14();
      init_Data27();
      init_Data22();
      init_Data29();
      init_Data3();
      init_Data26();
      init_Data_List();
      init_Data27();
      reverse2 = /* @__PURE__ */ function() {
        var go2 = function($copy_v) {
          return function($copy_v1) {
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v, v1) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return v;
              }
              ;
              if (v1 instanceof Cons) {
                $tco_var_v = new Cons(v1.value0, v);
                $copy_v1 = v1.value1;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
        return go2(Nil.value);
      }();
      $$null = function(v) {
        if (v instanceof Nil) {
          return true;
        }
        ;
        return false;
      };
      fromFoldable = function(dictFoldable) {
        return foldr(dictFoldable)(Cons.create)(Nil.value);
      };
    }
  });

  // output/Data.List.Lazy.Types/index.js
  var init_Data_List_Lazy = __esm({
    "output/Data.List.Lazy.Types/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control8();
      init_Control6();
      init_Data8();
      init_Data26();
      init_Data40();
      init_Data2();
      init_Data4();
      init_Data37();
      init_Data39();
      init_Data15();
      init_Data20();
      init_Data25();
      init_Data42();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data10();
      init_Data14();
      init_Data27();
      init_Data41();
      init_Data22();
      init_Data28();
    }
  });

  // output/Data.List.Lazy/index.js
  var init_Data_List3 = __esm({
    "output/Data.List.Lazy/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control8();
      init_Control_Monad_Rec();
      init_Data();
      init_Data8();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data21();
      init_Data39();
      init_Data_List2();
      init_Data_List_Lazy();
      init_Data15();
      init_Data25();
      init_Data42();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data14();
      init_Data27();
      init_Data22();
      init_Data29();
      init_Data26();
      init_Data_List_Lazy();
      init_Data27();
    }
  });

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial;
  var init_foreign39 = __esm({
    "output/Partial.Unsafe/foreign.js"() {
      _unsafePartial = function(f) {
        return f();
      };
    }
  });

  // output/Partial/foreign.js
  var _crashWith;
  var init_foreign40 = __esm({
    "output/Partial/foreign.js"() {
      _crashWith = function(msg) {
        throw new Error(msg);
      };
    }
  });

  // output/Partial/index.js
  var crashWith;
  var init_Partial = __esm({
    "output/Partial/index.js"() {
      init_foreign40();
      crashWith = function() {
        return _crashWith;
      };
    }
  });

  // output/Partial.Unsafe/index.js
  var crashWith2, unsafePartial, unsafeCrashWith;
  var init_Partial2 = __esm({
    "output/Partial.Unsafe/index.js"() {
      init_foreign39();
      init_Partial();
      crashWith2 = /* @__PURE__ */ crashWith();
      unsafePartial = _unsafePartial;
      unsafeCrashWith = function(msg) {
        return unsafePartial(function() {
          return crashWith2(msg);
        });
      };
    }
  });

  // output/Data.List.NonEmpty/index.js
  var singleton3, cons2;
  var init_Data_List4 = __esm({
    "output/Data.List.NonEmpty/index.js"() {
      init_Control5();
      init_Control2();
      init_Data();
      init_Data8();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data43();
      init_Data_List();
      init_Data15();
      init_Data42();
      init_Data12();
      init_Data7();
      init_Data_Semigroup();
      init_Data_Semigroup2();
      init_Data27();
      init_Data22();
      init_Data29();
      init_Partial2();
      init_Data26();
      init_Data_List();
      init_Data_Semigroup();
      init_Data_Semigroup2();
      init_Data27();
      singleton3 = /* @__PURE__ */ function() {
        var $200 = singleton2(plusList);
        return function($201) {
          return NonEmptyList($200($201));
        };
      }();
      cons2 = function(y) {
        return function(v) {
          return new NonEmpty(y, new Cons(v.value0, v.value1));
        };
      };
    }
  });

  // output/Parsing.Combinators/index.js
  var init_Parsing2 = __esm({
    "output/Parsing.Combinators/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control8();
      init_Control_Monad_Error();
      init_Control_Monad_Rec();
      init_Control9();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data43();
      init_Data_List3();
      init_Data_List4();
      init_Data_List();
      init_Data15();
      init_Data14();
      init_Data22();
      init_Data29();
      init_Data28();
      init_Data3();
      init_Parsing();
      init_Control9();
      init_Data_List3();
      init_Data29();
      init_Data28();
    }
  });

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl;
  var init_foreign41 = __esm({
    "output/Data.Array.NonEmpty.Internal/foreign.js"() {
      traverse1Impl = function() {
        function Cont(fn) {
          this.fn = fn;
        }
        var emptyList = {};
        var ConsCell = function(head5, tail2) {
          this.head = head5;
          this.tail = tail2;
        };
        function finalCell(head5) {
          return new ConsCell(head5, emptyList);
        }
        function consList(x) {
          return function(xs) {
            return new ConsCell(x, xs);
          };
        }
        function listToArray(list) {
          var arr = [];
          var xs = list;
          while (xs !== emptyList) {
            arr.push(xs.head);
            xs = xs.tail;
          }
          return arr;
        }
        return function(apply3, map21, f) {
          var buildFrom = function(x, ys) {
            return apply3(map21(consList)(f(x)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last3 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last3, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map21(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map21(listToArray)(result);
          };
        };
      }();
    }
  });

  // output/Data.Array.NonEmpty.Internal/index.js
  var init_Data_Array_NonEmpty = __esm({
    "output/Data.Array.NonEmpty.Internal/index.js"() {
      init_foreign41();
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control6();
      init_Data8();
      init_Data26();
      init_Data40();
      init_Data_Function();
      init_Data4();
      init_Data37();
      init_Data12();
      init_Data7();
      init_Data_Semigroup();
      init_Data_Semigroup2();
      init_Data14();
      init_Data27();
      init_Data41();
      init_Data28();
    }
  });

  // output/Data.Array.NonEmpty/index.js
  var init_Data_Array2 = __esm({
    "output/Data.Array.NonEmpty/index.js"() {
      init_Control5();
      init_Data38();
      init_Data_Array_NonEmpty();
      init_Data24();
      init_Data();
      init_Data8();
      init_Data2();
      init_Data4();
      init_Data15();
      init_Data42();
      init_Data12();
      init_Data7();
      init_Data_Semigroup();
      init_Data22();
      init_Data28();
      init_Safe();
      init_Unsafe();
    }
  });

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom, hasStringIterator, hasFromCodePoint, hasCodePointAt, _unsafeCodePointAt0, _singleton, _take, _toCodePointArray;
  var init_foreign42 = __esm({
    "output/Data.String.CodePoints/foreign.js"() {
      hasArrayFrom = typeof Array.from === "function";
      hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
      hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
      hasCodePointAt = typeof String.prototype.codePointAt === "function";
      _unsafeCodePointAt0 = function(fallback) {
        return hasCodePointAt ? function(str) {
          return str.codePointAt(0);
        } : fallback;
      };
      _singleton = function(fallback) {
        return hasFromCodePoint ? String.fromCodePoint : fallback;
      };
      _take = function(fallback) {
        return function(n) {
          if (hasStringIterator) {
            return function(str) {
              var accum = "";
              var iter = str[Symbol.iterator]();
              for (var i2 = 0; i2 < n; ++i2) {
                var o = iter.next();
                if (o.done)
                  return accum;
                accum += o.value;
              }
              return accum;
            };
          }
          return fallback(n);
        };
      };
      _toCodePointArray = function(fallback) {
        return function(unsafeCodePointAt02) {
          if (hasArrayFrom) {
            return function(str) {
              return Array.from(str, unsafeCodePointAt02);
            };
          }
          return fallback;
        };
      };
    }
  });

  // output/Data.String.CodeUnits/foreign.js
  var singleton5, length3, drop3;
  var init_foreign43 = __esm({
    "output/Data.String.CodeUnits/foreign.js"() {
      singleton5 = function(c) {
        return c;
      };
      length3 = function(s) {
        return s.length;
      };
      drop3 = function(n) {
        return function(s) {
          return s.substring(n);
        };
      };
    }
  });

  // output/Data.String.Unsafe/foreign.js
  var charAt;
  var init_foreign44 = __esm({
    "output/Data.String.Unsafe/foreign.js"() {
      charAt = function(i2) {
        return function(s) {
          if (i2 >= 0 && i2 < s.length)
            return s.charAt(i2);
          throw new Error("Data.String.Unsafe.charAt: Invalid index.");
        };
      };
    }
  });

  // output/Data.String.Unsafe/index.js
  var init_Data_String = __esm({
    "output/Data.String.Unsafe/index.js"() {
      init_foreign44();
      init_foreign44();
    }
  });

  // output/Data.String.CodeUnits/index.js
  var init_Data_String2 = __esm({
    "output/Data.String.CodeUnits/index.js"() {
      init_foreign43();
      init_Data15();
      init_Data_String();
      init_foreign43();
    }
  });

  // output/Data.String.Common/foreign.js
  var joinWith;
  var init_foreign45 = __esm({
    "output/Data.String.Common/foreign.js"() {
      joinWith = function(s) {
        return function(xs) {
          return xs.join(s);
        };
      };
    }
  });

  // output/Data.String.Common/index.js
  var init_Data_String3 = __esm({
    "output/Data.String.Common/index.js"() {
      init_foreign45();
      init_Data9();
      init_foreign45();
    }
  });

  // output/Data.String.CodePoints/index.js
  var fromEnum8, map5, unfoldr2, div2, mod2, unsurrogate, isTrail, isLead, uncons3, unconsButWithTuple, toCodePointArrayFallback, unsafeCodePointAt0Fallback, unsafeCodePointAt0, toCodePointArray, length4, fromCharCode2, singletonFallback, singleton6, takeFallback, take4, drop4;
  var init_Data_String4 = __esm({
    "output/Data.String.CodePoints/index.js"() {
      init_foreign42();
      init_Data38();
      init_Data();
      init_Data13();
      init_Data30();
      init_Data19();
      init_Data4();
      init_Data32();
      init_Data15();
      init_Data12();
      init_Data_String2();
      init_Data_String3();
      init_Data_String();
      init_Data22();
      init_Data29();
      init_Data_String2();
      fromEnum8 = /* @__PURE__ */ fromEnum(boundedEnumChar);
      map5 = /* @__PURE__ */ map(functorMaybe);
      unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
      div2 = /* @__PURE__ */ div(euclideanRingInt);
      mod2 = /* @__PURE__ */ mod(euclideanRingInt);
      unsurrogate = function(lead) {
        return function(trail) {
          return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
        };
      };
      isTrail = function(cu) {
        return 56320 <= cu && cu <= 57343;
      };
      isLead = function(cu) {
        return 55296 <= cu && cu <= 56319;
      };
      uncons3 = function(s) {
        var v = length3(s);
        if (v === 0) {
          return Nothing.value;
        }
        ;
        if (v === 1) {
          return new Just({
            head: fromEnum8(charAt(0)(s)),
            tail: ""
          });
        }
        ;
        var cu1 = fromEnum8(charAt(1)(s));
        var cu0 = fromEnum8(charAt(0)(s));
        var $43 = isLead(cu0) && isTrail(cu1);
        if ($43) {
          return new Just({
            head: unsurrogate(cu0)(cu1),
            tail: drop3(2)(s)
          });
        }
        ;
        return new Just({
          head: cu0,
          tail: drop3(1)(s)
        });
      };
      unconsButWithTuple = function(s) {
        return map5(function(v) {
          return new Tuple(v.head, v.tail);
        })(uncons3(s));
      };
      toCodePointArrayFallback = function(s) {
        return unfoldr2(unconsButWithTuple)(s);
      };
      unsafeCodePointAt0Fallback = function(s) {
        var cu0 = fromEnum8(charAt(0)(s));
        var $47 = isLead(cu0) && length3(s) > 1;
        if ($47) {
          var cu1 = fromEnum8(charAt(1)(s));
          var $48 = isTrail(cu1);
          if ($48) {
            return unsurrogate(cu0)(cu1);
          }
          ;
          return cu0;
        }
        ;
        return cu0;
      };
      unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
      toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
      length4 = function($74) {
        return length(toCodePointArray($74));
      };
      fromCharCode2 = /* @__PURE__ */ function() {
        var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
        return function($76) {
          return singleton5($75($76));
        };
      }();
      singletonFallback = function(v) {
        if (v <= 65535) {
          return fromCharCode2(v);
        }
        ;
        var lead = div2(v - 65536 | 0)(1024) + 55296 | 0;
        var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
        return fromCharCode2(lead) + fromCharCode2(trail);
      };
      singleton6 = /* @__PURE__ */ _singleton(singletonFallback);
      takeFallback = function(v) {
        return function(v1) {
          if (v < 1) {
            return "";
          }
          ;
          var v2 = uncons3(v1);
          if (v2 instanceof Just) {
            return singleton6(v2.value0.head) + takeFallback(v - 1 | 0)(v2.value0.tail);
          }
          ;
          return v1;
        };
      };
      take4 = /* @__PURE__ */ _take(takeFallback);
      drop4 = function(n) {
        return function(s) {
          return drop3(length3(take4(n)(s)))(s);
        };
      };
    }
  });

  // output/Data.String.Regex/foreign.js
  var init_foreign46 = __esm({
    "output/Data.String.Regex/foreign.js"() {
    }
  });

  // output/Data.String.Regex.Flags/index.js
  var init_Data_String_Regex = __esm({
    "output/Data.String.Regex.Flags/index.js"() {
      init_Control10();
      init_Data8();
      init_Data4();
      init_Data7();
      init_Data_String3();
    }
  });

  // output/Data.String.Regex/index.js
  var init_Data_String5 = __esm({
    "output/Data.String.Regex/index.js"() {
      init_foreign46();
      init_Data16();
      init_Data15();
      init_Data_String2();
      init_Data_String_Regex();
      init_foreign46();
    }
  });

  // output/Parsing.String/index.js
  var init_Parsing3 = __esm({
    "output/Parsing.String/index.js"() {
      init_Control7();
      init_Control4();
      init_Control5();
      init_Control_Monad_Rec();
      init_Data38();
      init_Data_Array2();
      init_Data();
      init_Data16();
      init_Data30();
      init_Data8();
      init_Data19();
      init_Data2();
      init_Data_Function();
      init_Data4();
      init_Data32();
      init_Data15();
      init_Data12();
      init_Data14();
      init_Data_String4();
      init_Data_String2();
      init_Data_String3();
      init_Data_String5();
      init_Data22();
      init_Data3();
      init_Parsing();
      init_Parsing2();
    }
  });

  // output/Data.Formatter.Parser.Utils/index.js
  var init_Data_Formatter_Parser = __esm({
    "output/Data.Formatter.Parser.Utils/index.js"() {
      init_Control3();
      init_Data24();
      init_Data4();
      init_Data14();
      init_Parsing();
      init_Parsing2();
      init_Parsing3();
    }
  });

  // output/Data.Char/index.js
  var init_Data44 = __esm({
    "output/Data.Char/index.js"() {
      init_Data30();
    }
  });

  // output/Data.CodePoint.Unicode.Internal/index.js
  var init_Data_CodePoint_Unicode = __esm({
    "output/Data.CodePoint.Unicode.Internal/index.js"() {
      init_Data38();
      init_Data();
      init_Data8();
      init_Data4();
      init_Data32();
      init_Data15();
      init_Data9();
      init_Data14();
    }
  });

  // output/Data.CodePoint.Unicode.Internal.Casing/index.js
  var init_Data_CodePoint_Unicode_Internal = __esm({
    "output/Data.CodePoint.Unicode.Internal.Casing/index.js"() {
      init_Data38();
      init_Data_CodePoint_Unicode();
      init_Data15();
      init_Data12();
    }
  });

  // output/Data.CodePoint.Unicode/index.js
  var init_Data_CodePoint = __esm({
    "output/Data.CodePoint.Unicode/index.js"() {
      init_Data();
      init_Data44();
      init_Data_CodePoint_Unicode();
      init_Data_CodePoint_Unicode_Internal();
      init_Data30();
      init_Data4();
      init_Data15();
      init_Data12();
      init_Data_String4();
      init_Unsafe();
    }
  });

  // output/Parsing.String.Basic/index.js
  var init_Parsing_String = __esm({
    "output/Parsing.String.Basic/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Data38();
      init_Data_CodePoint();
      init_Data16();
      init_Data8();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data32();
      init_Data15();
      init_Data20();
      init_Data31();
      init_Data14();
      init_Data_String4();
      init_Data_String2();
      init_Data_String_Regex();
      init_Parsing();
      init_Parsing2();
      init_Parsing3();
      init_Partial2();
    }
  });

  // output/Data.Formatter.Parser.Number/index.js
  var init_Data_Formatter_Parser2 = __esm({
    "output/Data.Formatter.Parser.Number/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Data38();
      init_Data26();
      init_Data_Formatter();
      init_Data_Formatter_Parser();
      init_Data4();
      init_Data32();
      init_Data15();
      init_Data20();
      init_Data31();
      init_Data10();
      init_Data14();
      init_Data22();
      init_Parsing();
      init_Parsing2();
      init_Parsing3();
      init_Parsing_String();
    }
  });

  // output/Data.Formatter.DateTime/index.js
  var show2, foldMap2, foldMap12, abs3, fromEnum9, show1, fromEnum12, fromEnum23, unwrap2, fromEnum33, show22, fromEnum42, mod3, fromEnum52, fromEnum62, fromEnum72, div1, YearFull, YearTwoDigits, YearAbsolute, MonthFull, MonthShort, MonthTwoDigits, DayOfMonthTwoDigits, DayOfMonth, UnixTimestamp, DayOfWeek, DayOfWeekName, DayOfWeekNameShort, Hours24, Hours12, Meridiem, Minutes, MinutesTwoDigits, Seconds, SecondsTwoDigits, Milliseconds, MillisecondsShort, MillisecondsTwoDigits, Placeholder, printShortMonth, padSingleDigit, padQuadrupleDigit, padDoubleDigit, formatYearTwoDigits, fix12, formatCommand, format;
  var init_Data_Formatter2 = __esm({
    "output/Data.Formatter.DateTime/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control8();
      init_Control_Monad_Reader();
      init_Control_Monad_Reader2();
      init_Control_Monad_Rec();
      init_Control_Monad();
      init_Control_Monad_State();
      init_Control_Monad_State2();
      init_Control_Monad_Trans();
      init_Data38();
      init_Data();
      init_Data33();
      init_Data_Date();
      init_Data35();
      init_Data_DateTime();
      init_Data16();
      init_Data30();
      init_Data19();
      init_Data26();
      init_Data_Formatter();
      init_Data_Formatter_Parser2();
      init_Data_Formatter_Parser();
      init_Data2();
      init_Data4();
      init_Data_Generic();
      init_Data17();
      init_Data32();
      init_Data43();
      init_Data_List();
      init_Data15();
      init_Data20();
      init_Data25();
      init_Data12();
      init_Data9();
      init_Data11();
      init_Data7();
      init_Data10();
      init_Data14();
      init_Data_Show();
      init_Data_String4();
      init_Data_String2();
      init_Data34();
      init_Data_Time2();
      init_Data22();
      init_Data3();
      init_Parsing();
      init_Parsing2();
      init_Parsing3();
      init_Parsing_String();
      show2 = /* @__PURE__ */ show(showInt);
      foldMap2 = /* @__PURE__ */ foldMap(foldableList);
      foldMap12 = /* @__PURE__ */ foldMap2(monoidString);
      abs3 = /* @__PURE__ */ abs(ordInt)(ringInt);
      fromEnum9 = /* @__PURE__ */ fromEnum(boundedEnumYear);
      show1 = /* @__PURE__ */ show(showMonth);
      fromEnum12 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
      fromEnum23 = /* @__PURE__ */ fromEnum(boundedEnumDay);
      unwrap2 = /* @__PURE__ */ unwrap();
      fromEnum33 = /* @__PURE__ */ fromEnum(boundedEnumWeekday);
      show22 = /* @__PURE__ */ show(showWeekday);
      fromEnum42 = /* @__PURE__ */ fromEnum(boundedEnumHour);
      mod3 = /* @__PURE__ */ mod(euclideanRingInt);
      fromEnum52 = /* @__PURE__ */ fromEnum(boundedEnumMinute);
      fromEnum62 = /* @__PURE__ */ fromEnum(boundedEnumSecond);
      fromEnum72 = /* @__PURE__ */ fromEnum(boundedEnumMillisecond);
      div1 = /* @__PURE__ */ div(euclideanRingInt);
      YearFull = /* @__PURE__ */ function() {
        function YearFull2() {
        }
        ;
        YearFull2.value = new YearFull2();
        return YearFull2;
      }();
      YearTwoDigits = /* @__PURE__ */ function() {
        function YearTwoDigits2() {
        }
        ;
        YearTwoDigits2.value = new YearTwoDigits2();
        return YearTwoDigits2;
      }();
      YearAbsolute = /* @__PURE__ */ function() {
        function YearAbsolute2() {
        }
        ;
        YearAbsolute2.value = new YearAbsolute2();
        return YearAbsolute2;
      }();
      MonthFull = /* @__PURE__ */ function() {
        function MonthFull2() {
        }
        ;
        MonthFull2.value = new MonthFull2();
        return MonthFull2;
      }();
      MonthShort = /* @__PURE__ */ function() {
        function MonthShort2() {
        }
        ;
        MonthShort2.value = new MonthShort2();
        return MonthShort2;
      }();
      MonthTwoDigits = /* @__PURE__ */ function() {
        function MonthTwoDigits2() {
        }
        ;
        MonthTwoDigits2.value = new MonthTwoDigits2();
        return MonthTwoDigits2;
      }();
      DayOfMonthTwoDigits = /* @__PURE__ */ function() {
        function DayOfMonthTwoDigits2() {
        }
        ;
        DayOfMonthTwoDigits2.value = new DayOfMonthTwoDigits2();
        return DayOfMonthTwoDigits2;
      }();
      DayOfMonth = /* @__PURE__ */ function() {
        function DayOfMonth2() {
        }
        ;
        DayOfMonth2.value = new DayOfMonth2();
        return DayOfMonth2;
      }();
      UnixTimestamp = /* @__PURE__ */ function() {
        function UnixTimestamp2() {
        }
        ;
        UnixTimestamp2.value = new UnixTimestamp2();
        return UnixTimestamp2;
      }();
      DayOfWeek = /* @__PURE__ */ function() {
        function DayOfWeek2() {
        }
        ;
        DayOfWeek2.value = new DayOfWeek2();
        return DayOfWeek2;
      }();
      DayOfWeekName = /* @__PURE__ */ function() {
        function DayOfWeekName2() {
        }
        ;
        DayOfWeekName2.value = new DayOfWeekName2();
        return DayOfWeekName2;
      }();
      DayOfWeekNameShort = /* @__PURE__ */ function() {
        function DayOfWeekNameShort2() {
        }
        ;
        DayOfWeekNameShort2.value = new DayOfWeekNameShort2();
        return DayOfWeekNameShort2;
      }();
      Hours24 = /* @__PURE__ */ function() {
        function Hours242() {
        }
        ;
        Hours242.value = new Hours242();
        return Hours242;
      }();
      Hours12 = /* @__PURE__ */ function() {
        function Hours122() {
        }
        ;
        Hours122.value = new Hours122();
        return Hours122;
      }();
      Meridiem = /* @__PURE__ */ function() {
        function Meridiem2() {
        }
        ;
        Meridiem2.value = new Meridiem2();
        return Meridiem2;
      }();
      Minutes = /* @__PURE__ */ function() {
        function Minutes2() {
        }
        ;
        Minutes2.value = new Minutes2();
        return Minutes2;
      }();
      MinutesTwoDigits = /* @__PURE__ */ function() {
        function MinutesTwoDigits2() {
        }
        ;
        MinutesTwoDigits2.value = new MinutesTwoDigits2();
        return MinutesTwoDigits2;
      }();
      Seconds = /* @__PURE__ */ function() {
        function Seconds2() {
        }
        ;
        Seconds2.value = new Seconds2();
        return Seconds2;
      }();
      SecondsTwoDigits = /* @__PURE__ */ function() {
        function SecondsTwoDigits2() {
        }
        ;
        SecondsTwoDigits2.value = new SecondsTwoDigits2();
        return SecondsTwoDigits2;
      }();
      Milliseconds = /* @__PURE__ */ function() {
        function Milliseconds3() {
        }
        ;
        Milliseconds3.value = new Milliseconds3();
        return Milliseconds3;
      }();
      MillisecondsShort = /* @__PURE__ */ function() {
        function MillisecondsShort2() {
        }
        ;
        MillisecondsShort2.value = new MillisecondsShort2();
        return MillisecondsShort2;
      }();
      MillisecondsTwoDigits = /* @__PURE__ */ function() {
        function MillisecondsTwoDigits2() {
        }
        ;
        MillisecondsTwoDigits2.value = new MillisecondsTwoDigits2();
        return MillisecondsTwoDigits2;
      }();
      Placeholder = /* @__PURE__ */ function() {
        function Placeholder2(value0) {
          this.value0 = value0;
        }
        ;
        Placeholder2.create = function(value0) {
          return new Placeholder2(value0);
        };
        return Placeholder2;
      }();
      printShortMonth = function(v) {
        if (v instanceof January) {
          return "Jan";
        }
        ;
        if (v instanceof February) {
          return "Feb";
        }
        ;
        if (v instanceof March) {
          return "Mar";
        }
        ;
        if (v instanceof April) {
          return "Apr";
        }
        ;
        if (v instanceof May) {
          return "May";
        }
        ;
        if (v instanceof June) {
          return "Jun";
        }
        ;
        if (v instanceof July) {
          return "Jul";
        }
        ;
        if (v instanceof August) {
          return "Aug";
        }
        ;
        if (v instanceof September) {
          return "Sep";
        }
        ;
        if (v instanceof October) {
          return "Oct";
        }
        ;
        if (v instanceof November) {
          return "Nov";
        }
        ;
        if (v instanceof December) {
          return "Dec";
        }
        ;
        throw new Error("Failed pattern match at Data.Formatter.DateTime (line 489, column 19 - line 501, column 22): " + [v.constructor.name]);
      };
      padSingleDigit = function(i2) {
        if (i2 < 0) {
          return "-" + padSingleDigit(-i2 | 0);
        }
        ;
        if (i2 < 10) {
          return "0" + show2(i2);
        }
        ;
        if (otherwise) {
          return show2(i2);
        }
        ;
        throw new Error("Failed pattern match at Data.Formatter.DateTime (line 194, column 1 - line 194, column 32): " + [i2.constructor.name]);
      };
      padQuadrupleDigit = function(i2) {
        if (i2 < 0) {
          return "-" + padQuadrupleDigit(-i2 | 0);
        }
        ;
        if (i2 < 10) {
          return "000" + show2(i2);
        }
        ;
        if (i2 < 100) {
          return "00" + show2(i2);
        }
        ;
        if (i2 < 1e3) {
          return "0" + show2(i2);
        }
        ;
        if (otherwise) {
          return show2(i2);
        }
        ;
        throw new Error("Failed pattern match at Data.Formatter.DateTime (line 207, column 1 - line 207, column 35): " + [i2.constructor.name]);
      };
      padDoubleDigit = function(i2) {
        if (i2 < 0) {
          return "-" + padDoubleDigit(-i2 | 0);
        }
        ;
        if (i2 < 10) {
          return "00" + show2(i2);
        }
        ;
        if (i2 < 100) {
          return "0" + show2(i2);
        }
        ;
        if (otherwise) {
          return show2(i2);
        }
        ;
        throw new Error("Failed pattern match at Data.Formatter.DateTime (line 200, column 1 - line 200, column 32): " + [i2.constructor.name]);
      };
      formatYearTwoDigits = function(i2) {
        var dateString = show2(abs3(i2));
        var dateLength = length4(dateString);
        if (dateLength === 1) {
          return "0" + dateString;
        }
        ;
        if (dateLength === 2) {
          return dateString;
        }
        ;
        return drop4(dateLength - 2 | 0)(dateString);
      };
      fix12 = function(h) {
        var $618 = h === 0;
        if ($618) {
          return 12;
        }
        ;
        return h;
      };
      formatCommand = function(v) {
        return function(v1) {
          if (v1 instanceof YearFull) {
            return padQuadrupleDigit(fromEnum9(year(v.value0)));
          }
          ;
          if (v1 instanceof YearTwoDigits) {
            return formatYearTwoDigits(fromEnum9(year(v.value0)));
          }
          ;
          if (v1 instanceof YearAbsolute) {
            return show2(fromEnum9(year(v.value0)));
          }
          ;
          if (v1 instanceof MonthFull) {
            return show1(month(v.value0));
          }
          ;
          if (v1 instanceof MonthShort) {
            return printShortMonth(month(v.value0));
          }
          ;
          if (v1 instanceof MonthTwoDigits) {
            return padSingleDigit(fromEnum12(month(v.value0)));
          }
          ;
          if (v1 instanceof DayOfMonthTwoDigits) {
            return padSingleDigit(fromEnum23(day(v.value0)));
          }
          ;
          if (v1 instanceof DayOfMonth) {
            return show2(fromEnum23(day(v.value0)));
          }
          ;
          if (v1 instanceof UnixTimestamp) {
            return show2(floor2(function(v2) {
              return v2 / 1e3;
            }(unwrap2(unInstant(fromDateTime(v))))));
          }
          ;
          if (v1 instanceof DayOfWeek) {
            return show2(fromEnum33(weekday(v.value0)));
          }
          ;
          if (v1 instanceof DayOfWeekName) {
            return show22(weekday(v.value0));
          }
          ;
          if (v1 instanceof DayOfWeekNameShort) {
            return take4(3)(show22(weekday(v.value0)));
          }
          ;
          if (v1 instanceof Hours24) {
            return padSingleDigit(fromEnum42(hour(v.value1)));
          }
          ;
          if (v1 instanceof Hours12) {
            return padSingleDigit(fix12(mod3(fromEnum42(hour(v.value1)))(12)));
          }
          ;
          if (v1 instanceof Meridiem) {
            var $621 = fromEnum42(hour(v.value1)) >= 12;
            if ($621) {
              return "PM";
            }
            ;
            return "AM";
          }
          ;
          if (v1 instanceof Minutes) {
            return show2(fromEnum52(minute(v.value1)));
          }
          ;
          if (v1 instanceof MinutesTwoDigits) {
            return padSingleDigit(fromEnum52(minute(v.value1)));
          }
          ;
          if (v1 instanceof Seconds) {
            return show2(fromEnum62(second(v.value1)));
          }
          ;
          if (v1 instanceof SecondsTwoDigits) {
            return padSingleDigit(fromEnum62(second(v.value1)));
          }
          ;
          if (v1 instanceof Milliseconds) {
            return padDoubleDigit(fromEnum72(millisecond(v.value1)));
          }
          ;
          if (v1 instanceof MillisecondsShort) {
            return show2(function(v2) {
              return div1(v2)(100);
            }(fromEnum72(millisecond(v.value1))));
          }
          ;
          if (v1 instanceof MillisecondsTwoDigits) {
            return padSingleDigit(function(v2) {
              return div1(v2)(10);
            }(fromEnum72(millisecond(v.value1))));
          }
          ;
          if (v1 instanceof Placeholder) {
            return v1.value0;
          }
          ;
          throw new Error("Failed pattern match at Data.Formatter.DateTime (line 169, column 38 - line 192, column 21): " + [v1.constructor.name]);
        };
      };
      format = function(f) {
        return function(d) {
          return foldMap12(formatCommand(d))(f);
        };
      };
    }
  });

  // output/Effect.Aff/foreign.js
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value12) {
          return Aff.Pure(f(value12));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var Aff, _pure, _throwError, _liftEffect, makeAff, _delay, _sequential;
  var init_foreign47 = __esm({
    "output/Effect.Aff/foreign.js"() {
      Aff = function() {
        var EMPTY = {};
        var PURE = "Pure";
        var THROW = "Throw";
        var CATCH = "Catch";
        var SYNC = "Sync";
        var ASYNC = "Async";
        var BIND = "Bind";
        var BRACKET = "Bracket";
        var FORK = "Fork";
        var SEQ = "Sequential";
        var MAP = "Map";
        var APPLY = "Apply";
        var ALT = "Alt";
        var CONS = "Cons";
        var RESUME = "Resume";
        var RELEASE = "Release";
        var FINALIZER = "Finalizer";
        var FINALIZED = "Finalized";
        var FORKED = "Forked";
        var FIBER = "Fiber";
        var THUNK = "Thunk";
        function Aff2(tag, _1, _2, _3) {
          this.tag = tag;
          this._1 = _1;
          this._2 = _2;
          this._3 = _3;
        }
        function AffCtr(tag) {
          var fn = function(_1, _2, _3) {
            return new Aff2(tag, _1, _2, _3);
          };
          fn.tag = tag;
          return fn;
        }
        function nonCanceler2(error3) {
          return new Aff2(PURE, void 0);
        }
        function runEff(eff) {
          try {
            eff();
          } catch (error3) {
            setTimeout(function() {
              throw error3;
            }, 0);
          }
        }
        function runSync(left, right, eff) {
          try {
            return right(eff());
          } catch (error3) {
            return left(error3);
          }
        }
        function runAsync(left, eff, k) {
          try {
            return eff(k)();
          } catch (error3) {
            k(left(error3))();
            return nonCanceler2;
          }
        }
        var Scheduler = function() {
          var limit = 1024;
          var size4 = 0;
          var ix = 0;
          var queue = new Array(limit);
          var draining = false;
          function drain() {
            var thunk;
            draining = true;
            while (size4 !== 0) {
              size4--;
              thunk = queue[ix];
              queue[ix] = void 0;
              ix = (ix + 1) % limit;
              thunk();
            }
            draining = false;
          }
          return {
            isDraining: function() {
              return draining;
            },
            enqueue: function(cb) {
              var i2, tmp;
              if (size4 === limit) {
                tmp = draining;
                drain();
                draining = tmp;
              }
              queue[(ix + size4) % limit] = cb;
              size4++;
              if (!draining) {
                drain();
              }
            }
          };
        }();
        function Supervisor(util) {
          var fibers = {};
          var fiberId = 0;
          var count = 0;
          return {
            register: function(fiber) {
              var fid = fiberId++;
              fiber.onComplete({
                rethrow: true,
                handler: function(result) {
                  return function() {
                    count--;
                    delete fibers[fid];
                  };
                }
              })();
              fibers[fid] = fiber;
              count++;
            },
            isEmpty: function() {
              return count === 0;
            },
            killAll: function(killError, cb) {
              return function() {
                if (count === 0) {
                  return cb();
                }
                var killCount = 0;
                var kills = {};
                function kill2(fid) {
                  kills[fid] = fibers[fid].kill(killError, function(result) {
                    return function() {
                      delete kills[fid];
                      killCount--;
                      if (util.isLeft(result) && util.fromLeft(result)) {
                        setTimeout(function() {
                          throw util.fromLeft(result);
                        }, 0);
                      }
                      if (killCount === 0) {
                        cb();
                      }
                    };
                  })();
                }
                for (var k in fibers) {
                  if (fibers.hasOwnProperty(k)) {
                    killCount++;
                    kill2(k);
                  }
                }
                fibers = {};
                fiberId = 0;
                count = 0;
                return function(error3) {
                  return new Aff2(SYNC, function() {
                    for (var k2 in kills) {
                      if (kills.hasOwnProperty(k2)) {
                        kills[k2]();
                      }
                    }
                  });
                };
              };
            }
          };
        }
        var SUSPENDED = 0;
        var CONTINUE = 1;
        var STEP_BIND = 2;
        var STEP_RESULT = 3;
        var PENDING = 4;
        var RETURN = 5;
        var COMPLETED = 6;
        function Fiber(util, supervisor, aff) {
          var runTick = 0;
          var status = SUSPENDED;
          var step4 = aff;
          var fail2 = null;
          var interrupt = null;
          var bhead = null;
          var btail = null;
          var attempts = null;
          var bracketCount = 0;
          var joinId = 0;
          var joins = null;
          var rethrow = true;
          function run3(localRunTick) {
            var tmp, result, attempt;
            while (true) {
              tmp = null;
              result = null;
              attempt = null;
              switch (status) {
                case STEP_BIND:
                  status = CONTINUE;
                  try {
                    step4 = bhead(step4);
                    if (btail === null) {
                      bhead = null;
                    } else {
                      bhead = btail._1;
                      btail = btail._2;
                    }
                  } catch (e) {
                    status = RETURN;
                    fail2 = util.left(e);
                    step4 = null;
                  }
                  break;
                case STEP_RESULT:
                  if (util.isLeft(step4)) {
                    status = RETURN;
                    fail2 = step4;
                    step4 = null;
                  } else if (bhead === null) {
                    status = RETURN;
                  } else {
                    status = STEP_BIND;
                    step4 = util.fromRight(step4);
                  }
                  break;
                case CONTINUE:
                  switch (step4.tag) {
                    case BIND:
                      if (bhead) {
                        btail = new Aff2(CONS, bhead, btail);
                      }
                      bhead = step4._2;
                      status = CONTINUE;
                      step4 = step4._1;
                      break;
                    case PURE:
                      if (bhead === null) {
                        status = RETURN;
                        step4 = util.right(step4._1);
                      } else {
                        status = STEP_BIND;
                        step4 = step4._1;
                      }
                      break;
                    case SYNC:
                      status = STEP_RESULT;
                      step4 = runSync(util.left, util.right, step4._1);
                      break;
                    case ASYNC:
                      status = PENDING;
                      step4 = runAsync(util.left, step4._1, function(result2) {
                        return function() {
                          if (runTick !== localRunTick) {
                            return;
                          }
                          runTick++;
                          Scheduler.enqueue(function() {
                            if (runTick !== localRunTick + 1) {
                              return;
                            }
                            status = STEP_RESULT;
                            step4 = result2;
                            run3(runTick);
                          });
                        };
                      });
                      return;
                    case THROW:
                      status = RETURN;
                      fail2 = util.left(step4._1);
                      step4 = null;
                      break;
                    case CATCH:
                      if (bhead === null) {
                        attempts = new Aff2(CONS, step4, attempts, interrupt);
                      } else {
                        attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                      }
                      bhead = null;
                      btail = null;
                      status = CONTINUE;
                      step4 = step4._1;
                      break;
                    case BRACKET:
                      bracketCount++;
                      if (bhead === null) {
                        attempts = new Aff2(CONS, step4, attempts, interrupt);
                      } else {
                        attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                      }
                      bhead = null;
                      btail = null;
                      status = CONTINUE;
                      step4 = step4._1;
                      break;
                    case FORK:
                      status = STEP_RESULT;
                      tmp = Fiber(util, supervisor, step4._2);
                      if (supervisor) {
                        supervisor.register(tmp);
                      }
                      if (step4._1) {
                        tmp.run();
                      }
                      step4 = util.right(tmp);
                      break;
                    case SEQ:
                      status = CONTINUE;
                      step4 = sequential3(util, supervisor, step4._1);
                      break;
                  }
                  break;
                case RETURN:
                  bhead = null;
                  btail = null;
                  if (attempts === null) {
                    status = COMPLETED;
                    step4 = interrupt || fail2 || step4;
                  } else {
                    tmp = attempts._3;
                    attempt = attempts._1;
                    attempts = attempts._2;
                    switch (attempt.tag) {
                      case CATCH:
                        if (interrupt && interrupt !== tmp && bracketCount === 0) {
                          status = RETURN;
                        } else if (fail2) {
                          status = CONTINUE;
                          step4 = attempt._2(util.fromLeft(fail2));
                          fail2 = null;
                        }
                        break;
                      case RESUME:
                        if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                          status = RETURN;
                        } else {
                          bhead = attempt._1;
                          btail = attempt._2;
                          status = STEP_BIND;
                          step4 = util.fromRight(step4);
                        }
                        break;
                      case BRACKET:
                        bracketCount--;
                        if (fail2 === null) {
                          result = util.fromRight(step4);
                          attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                          if (interrupt === tmp || bracketCount > 0) {
                            status = CONTINUE;
                            step4 = attempt._3(result);
                          }
                        }
                        break;
                      case RELEASE:
                        attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail2), attempts, interrupt);
                        status = CONTINUE;
                        if (interrupt && interrupt !== tmp && bracketCount === 0) {
                          step4 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                        } else if (fail2) {
                          step4 = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                        } else {
                          step4 = attempt._1.completed(util.fromRight(step4))(attempt._2);
                        }
                        fail2 = null;
                        bracketCount++;
                        break;
                      case FINALIZER:
                        bracketCount++;
                        attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail2), attempts, interrupt);
                        status = CONTINUE;
                        step4 = attempt._1;
                        break;
                      case FINALIZED:
                        bracketCount--;
                        status = RETURN;
                        step4 = attempt._1;
                        fail2 = attempt._2;
                        break;
                    }
                  }
                  break;
                case COMPLETED:
                  for (var k in joins) {
                    if (joins.hasOwnProperty(k)) {
                      rethrow = rethrow && joins[k].rethrow;
                      runEff(joins[k].handler(step4));
                    }
                  }
                  joins = null;
                  if (interrupt && fail2) {
                    setTimeout(function() {
                      throw util.fromLeft(fail2);
                    }, 0);
                  } else if (util.isLeft(step4) && rethrow) {
                    setTimeout(function() {
                      if (rethrow) {
                        throw util.fromLeft(step4);
                      }
                    }, 0);
                  }
                  return;
                case SUSPENDED:
                  status = CONTINUE;
                  break;
                case PENDING:
                  return;
              }
            }
          }
          function onComplete(join5) {
            return function() {
              if (status === COMPLETED) {
                rethrow = rethrow && join5.rethrow;
                join5.handler(step4)();
                return function() {
                };
              }
              var jid = joinId++;
              joins = joins || {};
              joins[jid] = join5;
              return function() {
                if (joins !== null) {
                  delete joins[jid];
                }
              };
            };
          }
          function kill2(error3, cb) {
            return function() {
              if (status === COMPLETED) {
                cb(util.right(void 0))();
                return function() {
                };
              }
              var canceler = onComplete({
                rethrow: false,
                handler: function() {
                  return cb(util.right(void 0));
                }
              })();
              switch (status) {
                case SUSPENDED:
                  interrupt = util.left(error3);
                  status = COMPLETED;
                  step4 = interrupt;
                  run3(runTick);
                  break;
                case PENDING:
                  if (interrupt === null) {
                    interrupt = util.left(error3);
                  }
                  if (bracketCount === 0) {
                    if (status === PENDING) {
                      attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error3)), attempts, interrupt);
                    }
                    status = RETURN;
                    step4 = null;
                    fail2 = null;
                    run3(++runTick);
                  }
                  break;
                default:
                  if (interrupt === null) {
                    interrupt = util.left(error3);
                  }
                  if (bracketCount === 0) {
                    status = RETURN;
                    step4 = null;
                    fail2 = null;
                  }
              }
              return canceler;
            };
          }
          function join4(cb) {
            return function() {
              var canceler = onComplete({
                rethrow: false,
                handler: cb
              })();
              if (status === SUSPENDED) {
                run3(runTick);
              }
              return canceler;
            };
          }
          return {
            kill: kill2,
            join: join4,
            onComplete,
            isSuspended: function() {
              return status === SUSPENDED;
            },
            run: function() {
              if (status === SUSPENDED) {
                if (!Scheduler.isDraining()) {
                  Scheduler.enqueue(function() {
                    run3(runTick);
                  });
                } else {
                  run3(runTick);
                }
              }
            }
          };
        }
        function runPar(util, supervisor, par, cb) {
          var fiberId = 0;
          var fibers = {};
          var killId = 0;
          var kills = {};
          var early = new Error("[ParAff] Early exit");
          var interrupt = null;
          var root = EMPTY;
          function kill2(error3, par2, cb2) {
            var step4 = par2;
            var head5 = null;
            var tail2 = null;
            var count = 0;
            var kills2 = {};
            var tmp, kid;
            loop:
              while (true) {
                tmp = null;
                switch (step4.tag) {
                  case FORKED:
                    if (step4._3 === EMPTY) {
                      tmp = fibers[step4._1];
                      kills2[count++] = tmp.kill(error3, function(result) {
                        return function() {
                          count--;
                          if (count === 0) {
                            cb2(result)();
                          }
                        };
                      });
                    }
                    if (head5 === null) {
                      break loop;
                    }
                    step4 = head5._2;
                    if (tail2 === null) {
                      head5 = null;
                    } else {
                      head5 = tail2._1;
                      tail2 = tail2._2;
                    }
                    break;
                  case MAP:
                    step4 = step4._2;
                    break;
                  case APPLY:
                  case ALT:
                    if (head5) {
                      tail2 = new Aff2(CONS, head5, tail2);
                    }
                    head5 = step4;
                    step4 = step4._1;
                    break;
                }
              }
            if (count === 0) {
              cb2(util.right(void 0))();
            } else {
              kid = 0;
              tmp = count;
              for (; kid < tmp; kid++) {
                kills2[kid] = kills2[kid]();
              }
            }
            return kills2;
          }
          function join4(result, head5, tail2) {
            var fail2, step4, lhs, rhs, tmp, kid;
            if (util.isLeft(result)) {
              fail2 = result;
              step4 = null;
            } else {
              step4 = result;
              fail2 = null;
            }
            loop:
              while (true) {
                lhs = null;
                rhs = null;
                tmp = null;
                kid = null;
                if (interrupt !== null) {
                  return;
                }
                if (head5 === null) {
                  cb(fail2 || step4)();
                  return;
                }
                if (head5._3 !== EMPTY) {
                  return;
                }
                switch (head5.tag) {
                  case MAP:
                    if (fail2 === null) {
                      head5._3 = util.right(head5._1(util.fromRight(step4)));
                      step4 = head5._3;
                    } else {
                      head5._3 = fail2;
                    }
                    break;
                  case APPLY:
                    lhs = head5._1._3;
                    rhs = head5._2._3;
                    if (fail2) {
                      head5._3 = fail2;
                      tmp = true;
                      kid = killId++;
                      kills[kid] = kill2(early, fail2 === lhs ? head5._2 : head5._1, function() {
                        return function() {
                          delete kills[kid];
                          if (tmp) {
                            tmp = false;
                          } else if (tail2 === null) {
                            join4(fail2, null, null);
                          } else {
                            join4(fail2, tail2._1, tail2._2);
                          }
                        };
                      });
                      if (tmp) {
                        tmp = false;
                        return;
                      }
                    } else if (lhs === EMPTY || rhs === EMPTY) {
                      return;
                    } else {
                      step4 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                      head5._3 = step4;
                    }
                    break;
                  case ALT:
                    lhs = head5._1._3;
                    rhs = head5._2._3;
                    if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                      return;
                    }
                    if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                      fail2 = step4 === lhs ? rhs : lhs;
                      step4 = null;
                      head5._3 = fail2;
                    } else {
                      head5._3 = step4;
                      tmp = true;
                      kid = killId++;
                      kills[kid] = kill2(early, step4 === lhs ? head5._2 : head5._1, function() {
                        return function() {
                          delete kills[kid];
                          if (tmp) {
                            tmp = false;
                          } else if (tail2 === null) {
                            join4(step4, null, null);
                          } else {
                            join4(step4, tail2._1, tail2._2);
                          }
                        };
                      });
                      if (tmp) {
                        tmp = false;
                        return;
                      }
                    }
                    break;
                }
                if (tail2 === null) {
                  head5 = null;
                } else {
                  head5 = tail2._1;
                  tail2 = tail2._2;
                }
              }
          }
          function resolve(fiber) {
            return function(result) {
              return function() {
                delete fibers[fiber._1];
                fiber._3 = result;
                join4(result, fiber._2._1, fiber._2._2);
              };
            };
          }
          function run3() {
            var status = CONTINUE;
            var step4 = par;
            var head5 = null;
            var tail2 = null;
            var tmp, fid;
            loop:
              while (true) {
                tmp = null;
                fid = null;
                switch (status) {
                  case CONTINUE:
                    switch (step4.tag) {
                      case MAP:
                        if (head5) {
                          tail2 = new Aff2(CONS, head5, tail2);
                        }
                        head5 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                        step4 = step4._2;
                        break;
                      case APPLY:
                        if (head5) {
                          tail2 = new Aff2(CONS, head5, tail2);
                        }
                        head5 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                        step4 = step4._1;
                        break;
                      case ALT:
                        if (head5) {
                          tail2 = new Aff2(CONS, head5, tail2);
                        }
                        head5 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                        step4 = step4._1;
                        break;
                      default:
                        fid = fiberId++;
                        status = RETURN;
                        tmp = step4;
                        step4 = new Aff2(FORKED, fid, new Aff2(CONS, head5, tail2), EMPTY);
                        tmp = Fiber(util, supervisor, tmp);
                        tmp.onComplete({
                          rethrow: false,
                          handler: resolve(step4)
                        })();
                        fibers[fid] = tmp;
                        if (supervisor) {
                          supervisor.register(tmp);
                        }
                    }
                    break;
                  case RETURN:
                    if (head5 === null) {
                      break loop;
                    }
                    if (head5._1 === EMPTY) {
                      head5._1 = step4;
                      status = CONTINUE;
                      step4 = head5._2;
                      head5._2 = EMPTY;
                    } else {
                      head5._2 = step4;
                      step4 = head5;
                      if (tail2 === null) {
                        head5 = null;
                      } else {
                        head5 = tail2._1;
                        tail2 = tail2._2;
                      }
                    }
                }
              }
            root = step4;
            for (fid = 0; fid < fiberId; fid++) {
              fibers[fid].run();
            }
          }
          function cancel(error3, cb2) {
            interrupt = util.left(error3);
            var innerKills;
            for (var kid in kills) {
              if (kills.hasOwnProperty(kid)) {
                innerKills = kills[kid];
                for (kid in innerKills) {
                  if (innerKills.hasOwnProperty(kid)) {
                    innerKills[kid]();
                  }
                }
              }
            }
            kills = null;
            var newKills = kill2(error3, root, cb2);
            return function(killError) {
              return new Aff2(ASYNC, function(killCb) {
                return function() {
                  for (var kid2 in newKills) {
                    if (newKills.hasOwnProperty(kid2)) {
                      newKills[kid2]();
                    }
                  }
                  return nonCanceler2;
                };
              });
            };
          }
          run3();
          return function(killError) {
            return new Aff2(ASYNC, function(killCb) {
              return function() {
                return cancel(killError, killCb);
              };
            });
          };
        }
        function sequential3(util, supervisor, par) {
          return new Aff2(ASYNC, function(cb) {
            return function() {
              return runPar(util, supervisor, par, cb);
            };
          });
        }
        Aff2.EMPTY = EMPTY;
        Aff2.Pure = AffCtr(PURE);
        Aff2.Throw = AffCtr(THROW);
        Aff2.Catch = AffCtr(CATCH);
        Aff2.Sync = AffCtr(SYNC);
        Aff2.Async = AffCtr(ASYNC);
        Aff2.Bind = AffCtr(BIND);
        Aff2.Bracket = AffCtr(BRACKET);
        Aff2.Fork = AffCtr(FORK);
        Aff2.Seq = AffCtr(SEQ);
        Aff2.ParMap = AffCtr(MAP);
        Aff2.ParApply = AffCtr(APPLY);
        Aff2.ParAlt = AffCtr(ALT);
        Aff2.Fiber = Fiber;
        Aff2.Supervisor = Supervisor;
        Aff2.Scheduler = Scheduler;
        Aff2.nonCanceler = nonCanceler2;
        return Aff2;
      }();
      _pure = Aff.Pure;
      _throwError = Aff.Throw;
      _liftEffect = Aff.Sync;
      makeAff = Aff.Async;
      _delay = function() {
        function setDelay(n, k) {
          if (n === 0 && typeof setImmediate !== "undefined") {
            return setImmediate(k);
          } else {
            return setTimeout(k, n);
          }
        }
        function clearDelay(n, t) {
          if (n === 0 && typeof clearImmediate !== "undefined") {
            return clearImmediate(t);
          } else {
            return clearTimeout(t);
          }
        }
        return function(right, ms) {
          return Aff.Async(function(cb) {
            return function() {
              var timer2 = setDelay(ms, cb(right()));
              return function() {
                return Aff.Sync(function() {
                  return right(clearDelay(ms, timer2));
                });
              };
            };
          });
        };
      }();
      _sequential = Aff.Seq;
    }
  });

  // output/Control.Monad.ST.Global/index.js
  var init_Control_Monad_ST3 = __esm({
    "output/Control.Monad.ST.Global/index.js"() {
      init_Unsafe();
    }
  });

  // output/Control.Monad.ST.Class/index.js
  var init_Control_Monad_ST4 = __esm({
    "output/Control.Monad.ST.Class/index.js"() {
      init_Control2();
      init_Control_Monad_ST3();
      init_Control_Monad_ST();
      init_Effect();
    }
  });

  // output/Control.Monad.Cont.Trans/index.js
  var init_Control_Monad_Cont2 = __esm({
    "output/Control.Monad.Cont.Trans/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control_Monad_Cont();
      init_Control_Monad_Reader();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Data2();
      init_Data20();
      init_Data7();
      init_Effect4();
      init_Control_Monad_Cont();
      init_Control_Monad_Trans();
    }
  });

  // output/Control.Monad.Maybe.Trans/index.js
  var init_Control_Monad_Maybe = __esm({
    "output/Control.Monad.Maybe.Trans/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control6();
      init_Control_Monad_Cont();
      init_Control_Monad_Error();
      init_Control_Monad_Reader();
      init_Control_Monad_Rec();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Control_Monad_Writer();
      init_Data4();
      init_Data15();
      init_Data20();
      init_Data7();
      init_Data22();
      init_Effect4();
      init_Control_Monad_Trans();
    }
  });

  // output/Control.Monad.Writer.Trans/index.js
  var init_Control_Monad_Writer2 = __esm({
    "output/Control.Monad.Writer.Trans/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control_Monad_Cont();
      init_Control_Monad_Error();
      init_Control_Monad_Reader();
      init_Control_Monad_Rec();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Control_Monad_Writer();
      init_Control9();
      init_Data4();
      init_Data20();
      init_Data7();
      init_Data22();
      init_Data3();
      init_Effect4();
      init_Control_Monad_Trans();
      init_Control_Monad_Writer();
    }
  });

  // output/Data.Functor.Contravariant/index.js
  var init_Data_Functor6 = __esm({
    "output/Data.Functor.Contravariant/index.js"() {
      init_Data4();
      init_Data6();
    }
  });

  // output/Data.Profunctor/index.js
  var init_Data45 = __esm({
    "output/Data.Profunctor/index.js"() {
      init_Control2();
      init_Data25();
    }
  });

  // output/Data.Functor.Costar/index.js
  var init_Data_Functor7 = __esm({
    "output/Data.Functor.Costar/index.js"() {
      init_Control12();
      init_Control11();
      init_Data36();
      init_Data4();
      init_Data_Functor6();
      init_Data_Functor();
      init_Data45();
      init_Data22();
    }
  });

  // output/Data.Profunctor.Star/index.js
  var init_Data_Profunctor = __esm({
    "output/Data.Profunctor.Star/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control9();
      init_Data36();
      init_Data16();
      init_Data4();
      init_Data_Functor();
      init_Data22();
    }
  });

  // output/Control.Parallel.Class/index.js
  var sequential, parallel;
  var init_Control_Parallel = __esm({
    "output/Control.Parallel.Class/index.js"() {
      init_Control4();
      init_Control5();
      init_Control_Monad_Cont2();
      init_Control_Monad_Except();
      init_Control_Monad_Maybe();
      init_Control_Monad_Reader2();
      init_Control_Monad_Writer2();
      init_Data16();
      init_Data4();
      init_Data_Functor4();
      init_Data_Functor7();
      init_Data15();
      init_Data_Profunctor();
      init_Data3();
      init_Effect4();
      init_Effect2();
      sequential = function(dict) {
        return dict.sequential;
      };
      parallel = function(dict) {
        return dict.parallel;
      };
    }
  });

  // output/Control.Parallel/index.js
  var identity6, parTraverse_, parSequence_;
  var init_Control13 = __esm({
    "output/Control.Parallel/index.js"() {
      init_Control3();
      init_Control2();
      init_Control_Parallel();
      init_Data26();
      init_Data27();
      init_Control_Parallel();
      identity6 = /* @__PURE__ */ identity(categoryFn);
      parTraverse_ = function(dictParallel) {
        var sequential3 = sequential(dictParallel);
        var traverse_7 = traverse_(dictParallel.Applicative1());
        var parallel3 = parallel(dictParallel);
        return function(dictFoldable) {
          var traverse_14 = traverse_7(dictFoldable);
          return function(f) {
            var $48 = traverse_14(function($50) {
              return parallel3(f($50));
            });
            return function($49) {
              return sequential3($48($49));
            };
          };
        };
      };
      parSequence_ = function(dictParallel) {
        var parTraverse_1 = parTraverse_(dictParallel);
        return function(dictFoldable) {
          return parTraverse_1(dictFoldable)(identity6);
        };
      };
    }
  });

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect;
  var init_foreign48 = __esm({
    "output/Effect.Unsafe/foreign.js"() {
      unsafePerformEffect = function(f) {
        return f();
      };
    }
  });

  // output/Effect.Unsafe/index.js
  var init_Effect5 = __esm({
    "output/Effect.Unsafe/index.js"() {
      init_foreign48();
      init_foreign48();
    }
  });

  // output/Effect.Aff/index.js
  var $runtime_lazy4, pure2, $$void3, map6, Canceler, suspendAff, functorParAff, functorAff, map1, forkAff, ffiUtil, makeFiber, launchAff, delay, bracket, applyParAff, monadAff, bindAff, applicativeAff, $lazy_applyAff, pure22, bind1, bindFlipped3, $$finally, monadEffectAff, liftEffect2, effectCanceler, joinFiber, functorFiber, killFiber, monadThrowAff, monadErrorAff, $$try3, runAff, runAff_, parallelAff, $lazy_applicativeParAff, applicativeParAff, monadRecAff, nonCanceler;
  var init_Effect6 = __esm({
    "output/Effect.Aff/index.js"() {
      init_foreign47();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control6();
      init_Control_Monad_Error();
      init_Control_Monad_Rec();
      init_Control_Monad_ST4();
      init_Control13();
      init_Control_Parallel();
      init_Control9();
      init_Data16();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data20();
      init_Data7();
      init_Data_Time();
      init_Data3();
      init_Effect();
      init_Effect4();
      init_Effect3();
      init_Effect5();
      init_Partial2();
      init_Unsafe();
      init_foreign47();
      init_Control_Monad_Error();
      init_Control_Parallel();
      init_Data_Time();
      init_Effect3();
      $runtime_lazy4 = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      pure2 = /* @__PURE__ */ pure(applicativeEffect);
      $$void3 = /* @__PURE__ */ $$void(functorEffect);
      map6 = /* @__PURE__ */ map(functorEffect);
      Canceler = function(x) {
        return x;
      };
      suspendAff = /* @__PURE__ */ _fork(false);
      functorParAff = {
        map: _parAffMap
      };
      functorAff = {
        map: _map
      };
      map1 = /* @__PURE__ */ map(functorAff);
      forkAff = /* @__PURE__ */ _fork(true);
      ffiUtil = /* @__PURE__ */ function() {
        var unsafeFromRight = function(v) {
          if (v instanceof Right) {
            return v.value0;
          }
          ;
          if (v instanceof Left) {
            return unsafeCrashWith("unsafeFromRight: Left");
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
        };
        var unsafeFromLeft = function(v) {
          if (v instanceof Left) {
            return v.value0;
          }
          ;
          if (v instanceof Right) {
            return unsafeCrashWith("unsafeFromLeft: Right");
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
        };
        var isLeft = function(v) {
          if (v instanceof Left) {
            return true;
          }
          ;
          if (v instanceof Right) {
            return false;
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
        };
        return {
          isLeft,
          fromLeft: unsafeFromLeft,
          fromRight: unsafeFromRight,
          left: Left.create,
          right: Right.create
        };
      }();
      makeFiber = function(aff) {
        return _makeFiber(ffiUtil, aff);
      };
      launchAff = function(aff) {
        return function __do2() {
          var fiber = makeFiber(aff)();
          fiber.run();
          return fiber;
        };
      };
      delay = function(v) {
        return _delay(Right.create, v);
      };
      bracket = function(acquire) {
        return function(completed) {
          return generalBracket(acquire)({
            killed: $$const(completed),
            failed: $$const(completed),
            completed: $$const(completed)
          });
        };
      };
      applyParAff = {
        apply: _parAffApply,
        Functor0: function() {
          return functorParAff;
        }
      };
      monadAff = {
        Applicative0: function() {
          return applicativeAff;
        },
        Bind1: function() {
          return bindAff;
        }
      };
      bindAff = {
        bind: _bind,
        Apply0: function() {
          return $lazy_applyAff(0);
        }
      };
      applicativeAff = {
        pure: _pure,
        Apply0: function() {
          return $lazy_applyAff(0);
        }
      };
      $lazy_applyAff = /* @__PURE__ */ $runtime_lazy4("applyAff", "Effect.Aff", function() {
        return {
          apply: ap(monadAff),
          Functor0: function() {
            return functorAff;
          }
        };
      });
      pure22 = /* @__PURE__ */ pure(applicativeAff);
      bind1 = /* @__PURE__ */ bind(bindAff);
      bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
      $$finally = function(fin) {
        return function(a2) {
          return bracket(pure22(unit))($$const(fin))($$const(a2));
        };
      };
      monadEffectAff = {
        liftEffect: _liftEffect,
        Monad0: function() {
          return monadAff;
        }
      };
      liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
      effectCanceler = function($75) {
        return Canceler($$const(liftEffect2($75)));
      };
      joinFiber = function(v) {
        return makeAff(function(k) {
          return map6(effectCanceler)(v.join(k));
        });
      };
      functorFiber = {
        map: function(f) {
          return function(t) {
            return unsafePerformEffect(makeFiber(map1(f)(joinFiber(t))));
          };
        }
      };
      killFiber = function(e) {
        return function(v) {
          return bind1(liftEffect2(v.isSuspended))(function(suspended) {
            if (suspended) {
              return liftEffect2($$void3(v.kill(e, $$const(pure2(unit)))));
            }
            ;
            return makeAff(function(k) {
              return map6(effectCanceler)(v.kill(e, k));
            });
          });
        };
      };
      monadThrowAff = {
        throwError: _throwError,
        Monad0: function() {
          return monadAff;
        }
      };
      monadErrorAff = {
        catchError: _catchError,
        MonadThrow0: function() {
          return monadThrowAff;
        }
      };
      $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
      runAff = function(k) {
        return function(aff) {
          return launchAff(bindFlipped3(function($80) {
            return liftEffect2(k($80));
          })($$try3(aff)));
        };
      };
      runAff_ = function(k) {
        return function(aff) {
          return $$void3(runAff(k)(aff));
        };
      };
      parallelAff = {
        parallel: unsafeCoerce2,
        sequential: _sequential,
        Monad0: function() {
          return monadAff;
        },
        Applicative1: function() {
          return $lazy_applicativeParAff(0);
        }
      };
      $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy4("applicativeParAff", "Effect.Aff", function() {
        return {
          pure: function() {
            var $82 = parallel(parallelAff);
            return function($83) {
              return $82(pure22($83));
            };
          }(),
          Apply0: function() {
            return applyParAff;
          }
        };
      });
      applicativeParAff = /* @__PURE__ */ $lazy_applicativeParAff(136);
      monadRecAff = {
        tailRecM: function(k) {
          var go2 = function(a2) {
            return bind1(k(a2))(function(res) {
              if (res instanceof Done) {
                return pure22(res.value0);
              }
              ;
              if (res instanceof Loop) {
                return go2(res.value0);
              }
              ;
              throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
            });
          };
          return go2;
        },
        Monad0: function() {
          return monadAff;
        }
      };
      nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));
    }
  });

  // output/Control.Monad.List.Trans/index.js
  var init_Control_Monad_List = __esm({
    "output/Control.Monad.List.Trans/index.js"() {
      init_Control4();
      init_Control5();
      init_Control2();
      init_Control6();
      init_Control_Monad_Rec();
      init_Control_Monad_Trans();
      init_Data2();
      init_Data4();
      init_Data39();
      init_Data15();
      init_Data7();
      init_Data22();
      init_Data3();
      init_Effect4();
      init_Control_Monad_Trans();
    }
  });

  // output/Control.Monad.RWS.Trans/index.js
  var init_Control_Monad_RWS = __esm({
    "output/Control.Monad.RWS.Trans/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control_Monad_Error();
      init_Control_Monad_Rec();
      init_Control_Monad_Trans();
      init_Control9();
      init_Data4();
      init_Data20();
      init_Data7();
      init_Data22();
      init_Data3();
      init_Effect4();
      init_Control_Monad_Trans();
    }
  });

  // output/Effect.Aff.Class/index.js
  var monadAffAff, liftAff;
  var init_Effect_Aff = __esm({
    "output/Effect.Aff.Class/index.js"() {
      init_Control2();
      init_Control_Monad_Cont2();
      init_Control_Monad_Except();
      init_Control_Monad_List();
      init_Control_Monad_Maybe();
      init_Control_Monad_RWS();
      init_Control_Monad_Reader2();
      init_Control_Monad_State2();
      init_Control_Monad_Trans();
      init_Control_Monad_Writer2();
      init_Effect6();
      monadAffAff = {
        liftAff: /* @__PURE__ */ identity(categoryFn),
        MonadEffect0: function() {
          return monadEffectAff;
        }
      };
      liftAff = function(dict) {
        return dict.liftAff;
      };
    }
  });

  // output/Effect.Now/foreign.js
  function now() {
    return Date.now();
  }
  var init_foreign49 = __esm({
    "output/Effect.Now/foreign.js"() {
    }
  });

  // output/Effect.Now/index.js
  var map7, nowDateTime;
  var init_Effect7 = __esm({
    "output/Effect.Now/index.js"() {
      init_foreign49();
      init_Data35();
      init_Data_DateTime();
      init_Data4();
      init_Effect();
      init_foreign49();
      map7 = /* @__PURE__ */ map(functorEffect);
      nowDateTime = /* @__PURE__ */ map7(toDateTime)(now);
    }
  });

  // output/Web.DOM.ParentNode/foreign.js
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }
  var getEffProp, children, _firstElementChild, _lastElementChild, childElementCount;
  var init_foreign50 = __esm({
    "output/Web.DOM.ParentNode/foreign.js"() {
      getEffProp = function(name15) {
        return function(node) {
          return function() {
            return node[name15];
          };
        };
      };
      children = getEffProp("children");
      _firstElementChild = getEffProp("firstElementChild");
      _lastElementChild = getEffProp("lastElementChild");
      childElementCount = getEffProp("childElementCount");
    }
  });

  // output/Data.Nullable/foreign.js
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }
  function notNull(x) {
    return x;
  }
  var nullImpl;
  var init_foreign51 = __esm({
    "output/Data.Nullable/foreign.js"() {
      nullImpl = null;
    }
  });

  // output/Data.Nullable/index.js
  var toNullable, toMaybe;
  var init_Data46 = __esm({
    "output/Data.Nullable/index.js"() {
      init_foreign51();
      init_Data8();
      init_Data2();
      init_Data15();
      init_Data12();
      init_Data14();
      init_foreign51();
      toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
      toMaybe = function(n) {
        return nullable(n, Nothing.value, Just.create);
      };
    }
  });

  // output/Web.DOM.ParentNode/index.js
  var map8, querySelector;
  var init_Web_DOM = __esm({
    "output/Web.DOM.ParentNode/index.js"() {
      init_foreign50();
      init_Data8();
      init_Data4();
      init_Data46();
      init_Data12();
      init_Effect();
      init_foreign50();
      map8 = /* @__PURE__ */ map(functorEffect);
      querySelector = function(qs) {
        var $2 = map8(toMaybe);
        var $3 = _querySelector(qs);
        return function($4) {
          return $2($3($4));
        };
      };
    }
  });

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target5) {
          return function() {
            return target5.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target5) {
          return function() {
            return target5.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  var init_foreign52 = __esm({
    "output/Web.Event.EventTarget/foreign.js"() {
    }
  });

  // output/Web.Event.EventTarget/index.js
  var init_Web_Event = __esm({
    "output/Web.Event.EventTarget/index.js"() {
      init_foreign52();
      init_foreign52();
    }
  });

  // output/Web.HTML/foreign.js
  var windowImpl;
  var init_foreign53 = __esm({
    "output/Web.HTML/foreign.js"() {
      windowImpl = function() {
        return window;
      };
    }
  });

  // output/Web.HTML.Common/index.js
  var ClassName;
  var init_Web_HTML = __esm({
    "output/Web.HTML.Common/index.js"() {
      init_Data8();
      init_Data12();
      ClassName = function(x) {
        return x;
      };
    }
  });

  // output/Web.HTML.HTMLAnchorElement/foreign.js
  var init_foreign54 = __esm({
    "output/Web.HTML.HTMLAnchorElement/foreign.js"() {
    }
  });

  // output/Web.Internal.FFI/foreign.js
  var init_foreign55 = __esm({
    "output/Web.Internal.FFI/foreign.js"() {
    }
  });

  // output/Web.Internal.FFI/index.js
  var init_Web_Internal = __esm({
    "output/Web.Internal.FFI/index.js"() {
      init_foreign55();
      init_Data15();
    }
  });

  // output/Web.HTML.HTMLAnchorElement/index.js
  var init_Web_HTML2 = __esm({
    "output/Web.HTML.HTMLAnchorElement/index.js"() {
      init_foreign54();
      init_Unsafe();
      init_Web_Internal();
      init_foreign54();
    }
  });

  // output/Web.HTML.HTMLAreaElement/foreign.js
  var init_foreign56 = __esm({
    "output/Web.HTML.HTMLAreaElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLAreaElement/index.js
  var init_Web_HTML3 = __esm({
    "output/Web.HTML.HTMLAreaElement/index.js"() {
      init_foreign56();
      init_Unsafe();
      init_Web_Internal();
      init_foreign56();
    }
  });

  // output/Web.HTML.HTMLAudioElement/foreign.js
  var init_foreign57 = __esm({
    "output/Web.HTML.HTMLAudioElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLAudioElement/index.js
  var init_Web_HTML4 = __esm({
    "output/Web.HTML.HTMLAudioElement/index.js"() {
      init_foreign57();
      init_Unsafe();
      init_Web_Internal();
      init_foreign57();
    }
  });

  // output/Web.HTML.HTMLBRElement/index.js
  var init_Web_HTML5 = __esm({
    "output/Web.HTML.HTMLBRElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLBaseElement/foreign.js
  var init_foreign58 = __esm({
    "output/Web.HTML.HTMLBaseElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLBaseElement/index.js
  var init_Web_HTML6 = __esm({
    "output/Web.HTML.HTMLBaseElement/index.js"() {
      init_foreign58();
      init_Unsafe();
      init_Web_Internal();
      init_foreign58();
    }
  });

  // output/Web.HTML.HTMLBodyElement/index.js
  var init_Web_HTML7 = __esm({
    "output/Web.HTML.HTMLBodyElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLButtonElement/foreign.js
  var init_foreign59 = __esm({
    "output/Web.HTML.HTMLButtonElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLButtonElement/index.js
  var init_Web_HTML8 = __esm({
    "output/Web.HTML.HTMLButtonElement/index.js"() {
      init_foreign59();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign59();
    }
  });

  // output/Web.HTML.HTMLCanvasElement/foreign.js
  var init_foreign60 = __esm({
    "output/Web.HTML.HTMLCanvasElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLCanvasElement/index.js
  var init_Web_HTML9 = __esm({
    "output/Web.HTML.HTMLCanvasElement/index.js"() {
      init_foreign60();
      init_Unsafe();
      init_Web_Internal();
      init_foreign60();
    }
  });

  // output/Web.HTML.HTMLDListElement/index.js
  var init_Web_HTML10 = __esm({
    "output/Web.HTML.HTMLDListElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLDataElement/foreign.js
  var init_foreign61 = __esm({
    "output/Web.HTML.HTMLDataElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLDataElement/index.js
  var init_Web_HTML11 = __esm({
    "output/Web.HTML.HTMLDataElement/index.js"() {
      init_foreign61();
      init_Unsafe();
      init_Web_Internal();
      init_foreign61();
    }
  });

  // output/Web.HTML.HTMLDataListElement/foreign.js
  var init_foreign62 = __esm({
    "output/Web.HTML.HTMLDataListElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLDataListElement/index.js
  var init_Web_HTML12 = __esm({
    "output/Web.HTML.HTMLDataListElement/index.js"() {
      init_foreign62();
      init_Unsafe();
      init_Web_Internal();
      init_foreign62();
    }
  });

  // output/Web.HTML.HTMLDivElement/index.js
  var init_Web_HTML13 = __esm({
    "output/Web.HTML.HTMLDivElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return doc.readyState;
  }
  var init_foreign63 = __esm({
    "output/Web.HTML.HTMLDocument/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading, Interactive, Complete, parse;
  var init_Web_HTML_HTMLDocument = __esm({
    "output/Web.HTML.HTMLDocument.ReadyState/index.js"() {
      init_Data15();
      init_Data9();
      Loading = /* @__PURE__ */ function() {
        function Loading2() {
        }
        ;
        Loading2.value = new Loading2();
        return Loading2;
      }();
      Interactive = /* @__PURE__ */ function() {
        function Interactive2() {
        }
        ;
        Interactive2.value = new Interactive2();
        return Interactive2;
      }();
      Complete = /* @__PURE__ */ function() {
        function Complete2() {
        }
        ;
        Complete2.value = new Complete2();
        return Complete2;
      }();
      parse = function(v) {
        if (v === "loading") {
          return new Just(Loading.value);
        }
        ;
        if (v === "interactive") {
          return new Just(Interactive.value);
        }
        ;
        if (v === "complete") {
          return new Just(Complete.value);
        }
        ;
        return Nothing.value;
      };
    }
  });

  // output/Web.HTML.HTMLDocument.VisibilityState/index.js
  var init_Web_HTML_HTMLDocument2 = __esm({
    "output/Web.HTML.HTMLDocument.VisibilityState/index.js"() {
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLDocument/index.js
  var map9, toParentNode, toDocument, readyState;
  var init_Web_HTML14 = __esm({
    "output/Web.HTML.HTMLDocument/index.js"() {
      init_foreign63();
      init_Data4();
      init_Data15();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_HTML_HTMLDocument();
      init_Web_HTML_HTMLDocument2();
      init_Web_Internal();
      map9 = /* @__PURE__ */ map(functorEffect);
      toParentNode = unsafeCoerce2;
      toDocument = unsafeCoerce2;
      readyState = function(doc) {
        return map9(function() {
          var $4 = fromMaybe(Loading.value);
          return function($5) {
            return $4(parse($5));
          };
        }())(function() {
          return _readyState(doc);
        });
      };
    }
  });

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value12) {
    var tag = Object.prototype.toString.call(value12);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value12);
    } else {
      return nothing;
    }
  }
  var init_foreign64 = __esm({
    "output/Web.HTML.HTMLElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLElement/index.js
  var toNode, fromElement;
  var init_Web_HTML15 = __esm({
    "output/Web.HTML.HTMLElement/index.js"() {
      init_foreign64();
      init_Data4();
      init_Data15();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_foreign64();
      toNode = unsafeCoerce2;
      fromElement = function(x) {
        return _read(Nothing.value, Just.create, x);
      };
    }
  });

  // output/Web.HTML.HTMLEmbedElement/foreign.js
  var init_foreign65 = __esm({
    "output/Web.HTML.HTMLEmbedElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLEmbedElement/index.js
  var init_Web_HTML16 = __esm({
    "output/Web.HTML.HTMLEmbedElement/index.js"() {
      init_foreign65();
      init_Unsafe();
      init_Web_Internal();
      init_foreign65();
    }
  });

  // output/Web.HTML.HTMLFieldSetElement/foreign.js
  var init_foreign66 = __esm({
    "output/Web.HTML.HTMLFieldSetElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLFieldSetElement/index.js
  var init_Web_HTML17 = __esm({
    "output/Web.HTML.HTMLFieldSetElement/index.js"() {
      init_foreign66();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign66();
    }
  });

  // output/Web.HTML.HTMLFormElement/foreign.js
  var init_foreign67 = __esm({
    "output/Web.HTML.HTMLFormElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLFormElement/index.js
  var init_Web_HTML18 = __esm({
    "output/Web.HTML.HTMLFormElement/index.js"() {
      init_foreign67();
      init_Unsafe();
      init_Web_Internal();
      init_foreign67();
    }
  });

  // output/Web.HTML.HTMLHRElement/index.js
  var init_Web_HTML19 = __esm({
    "output/Web.HTML.HTMLHRElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLHeadElement/index.js
  var init_Web_HTML20 = __esm({
    "output/Web.HTML.HTMLHeadElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLHeadingElement/index.js
  var init_Web_HTML21 = __esm({
    "output/Web.HTML.HTMLHeadingElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLIFrameElement/foreign.js
  var init_foreign68 = __esm({
    "output/Web.HTML.HTMLIFrameElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLIFrameElement/index.js
  var init_Web_HTML22 = __esm({
    "output/Web.HTML.HTMLIFrameElement/index.js"() {
      init_foreign68();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign68();
    }
  });

  // output/Web.HTML.HTMLImageElement/foreign.js
  var init_foreign69 = __esm({
    "output/Web.HTML.HTMLImageElement/foreign.js"() {
    }
  });

  // output/Effect.Uncurried/foreign.js
  var init_foreign70 = __esm({
    "output/Effect.Uncurried/foreign.js"() {
    }
  });

  // output/Effect.Uncurried/index.js
  var init_Effect8 = __esm({
    "output/Effect.Uncurried/index.js"() {
      init_foreign70();
      init_Data20();
      init_Data7();
      init_Effect();
      init_foreign70();
    }
  });

  // output/Web.HTML.HTMLImageElement.CORSMode/index.js
  var init_Web_HTML_HTMLImageElement = __esm({
    "output/Web.HTML.HTMLImageElement.CORSMode/index.js"() {
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLImageElement.DecodingHint/index.js
  var init_Web_HTML_HTMLImageElement2 = __esm({
    "output/Web.HTML.HTMLImageElement.DecodingHint/index.js"() {
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLImageElement.Laziness/index.js
  var init_Web_HTML_HTMLImageElement3 = __esm({
    "output/Web.HTML.HTMLImageElement.Laziness/index.js"() {
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLImageElement/index.js
  var init_Web_HTML23 = __esm({
    "output/Web.HTML.HTMLImageElement/index.js"() {
      init_foreign69();
      init_Control5();
      init_Data4();
      init_Data15();
      init_Data46();
      init_Effect();
      init_Effect8();
      init_Unsafe();
      init_Web_HTML_HTMLImageElement();
      init_Web_HTML_HTMLImageElement2();
      init_Web_HTML_HTMLImageElement3();
      init_Web_Internal();
      init_foreign69();
    }
  });

  // output/Web.HTML.HTMLInputElement/foreign.js
  var init_foreign71 = __esm({
    "output/Web.HTML.HTMLInputElement/foreign.js"() {
    }
  });

  // output/Web.HTML.SelectionMode/index.js
  var init_Web_HTML24 = __esm({
    "output/Web.HTML.SelectionMode/index.js"() {
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLInputElement/index.js
  var init_Web_HTML25 = __esm({
    "output/Web.HTML.HTMLInputElement/index.js"() {
      init_foreign71();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_HTML24();
      init_Web_Internal();
      init_foreign71();
    }
  });

  // output/Web.HTML.HTMLKeygenElement/foreign.js
  var init_foreign72 = __esm({
    "output/Web.HTML.HTMLKeygenElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLKeygenElement/index.js
  var init_Web_HTML26 = __esm({
    "output/Web.HTML.HTMLKeygenElement/index.js"() {
      init_foreign72();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign72();
    }
  });

  // output/Web.HTML.HTMLLIElement/foreign.js
  var init_foreign73 = __esm({
    "output/Web.HTML.HTMLLIElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLLIElement/index.js
  var init_Web_HTML27 = __esm({
    "output/Web.HTML.HTMLLIElement/index.js"() {
      init_foreign73();
      init_Unsafe();
      init_Web_Internal();
      init_foreign73();
    }
  });

  // output/Web.HTML.HTMLLabelElement/foreign.js
  var init_foreign74 = __esm({
    "output/Web.HTML.HTMLLabelElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLLabelElement/index.js
  var init_Web_HTML28 = __esm({
    "output/Web.HTML.HTMLLabelElement/index.js"() {
      init_foreign74();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign74();
    }
  });

  // output/Web.HTML.HTMLLegendElement/foreign.js
  var init_foreign75 = __esm({
    "output/Web.HTML.HTMLLegendElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLLegendElement/index.js
  var init_Web_HTML29 = __esm({
    "output/Web.HTML.HTMLLegendElement/index.js"() {
      init_foreign75();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLLinkElement/foreign.js
  var init_foreign76 = __esm({
    "output/Web.HTML.HTMLLinkElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLLinkElement/index.js
  var init_Web_HTML30 = __esm({
    "output/Web.HTML.HTMLLinkElement/index.js"() {
      init_foreign76();
      init_Unsafe();
      init_Web_Internal();
      init_foreign76();
    }
  });

  // output/Web.HTML.HTMLMapElement/foreign.js
  var init_foreign77 = __esm({
    "output/Web.HTML.HTMLMapElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLMapElement/index.js
  var init_Web_HTML31 = __esm({
    "output/Web.HTML.HTMLMapElement/index.js"() {
      init_foreign77();
      init_Unsafe();
      init_Web_Internal();
      init_foreign77();
    }
  });

  // output/Web.HTML.HTMLMediaElement/foreign.js
  var init_foreign78 = __esm({
    "output/Web.HTML.HTMLMediaElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLMediaElement.CanPlayType/index.js
  var init_Web_HTML_HTMLMediaElement = __esm({
    "output/Web.HTML.HTMLMediaElement.CanPlayType/index.js"() {
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLMediaElement.NetworkState/index.js
  var init_Web_HTML_HTMLMediaElement2 = __esm({
    "output/Web.HTML.HTMLMediaElement.NetworkState/index.js"() {
      init_Data30();
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLMediaElement.ReadyState/index.js
  var init_Web_HTML_HTMLMediaElement3 = __esm({
    "output/Web.HTML.HTMLMediaElement.ReadyState/index.js"() {
      init_Data30();
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLMediaElement/index.js
  var init_Web_HTML32 = __esm({
    "output/Web.HTML.HTMLMediaElement/index.js"() {
      init_foreign78();
      init_Data30();
      init_Data4();
      init_Data15();
      init_Effect();
      init_Unsafe();
      init_Web_HTML_HTMLMediaElement();
      init_Web_HTML_HTMLMediaElement2();
      init_Web_HTML_HTMLMediaElement3();
      init_Web_Internal();
      init_foreign78();
    }
  });

  // output/Web.HTML.HTMLMetaElement/foreign.js
  var init_foreign79 = __esm({
    "output/Web.HTML.HTMLMetaElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLMetaElement/index.js
  var init_Web_HTML33 = __esm({
    "output/Web.HTML.HTMLMetaElement/index.js"() {
      init_foreign79();
      init_Unsafe();
      init_Web_Internal();
      init_foreign79();
    }
  });

  // output/Web.HTML.HTMLMeterElement/foreign.js
  var init_foreign80 = __esm({
    "output/Web.HTML.HTMLMeterElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLMeterElement/index.js
  var init_Web_HTML34 = __esm({
    "output/Web.HTML.HTMLMeterElement/index.js"() {
      init_foreign80();
      init_Unsafe();
      init_Web_Internal();
      init_foreign80();
    }
  });

  // output/Web.HTML.HTMLModElement/foreign.js
  var init_foreign81 = __esm({
    "output/Web.HTML.HTMLModElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLModElement/index.js
  var init_Web_HTML35 = __esm({
    "output/Web.HTML.HTMLModElement/index.js"() {
      init_foreign81();
      init_Unsafe();
      init_Web_Internal();
      init_foreign81();
    }
  });

  // output/Web.HTML.HTMLOListElement/foreign.js
  var init_foreign82 = __esm({
    "output/Web.HTML.HTMLOListElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLOListElement/index.js
  var init_Web_HTML36 = __esm({
    "output/Web.HTML.HTMLOListElement/index.js"() {
      init_foreign82();
      init_Unsafe();
      init_Web_Internal();
      init_foreign82();
    }
  });

  // output/Web.HTML.HTMLObjectElement/foreign.js
  var init_foreign83 = __esm({
    "output/Web.HTML.HTMLObjectElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLObjectElement/index.js
  var init_Web_HTML37 = __esm({
    "output/Web.HTML.HTMLObjectElement/index.js"() {
      init_foreign83();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign83();
    }
  });

  // output/Web.HTML.HTMLOptGroupElement/foreign.js
  var init_foreign84 = __esm({
    "output/Web.HTML.HTMLOptGroupElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLOptGroupElement/index.js
  var init_Web_HTML38 = __esm({
    "output/Web.HTML.HTMLOptGroupElement/index.js"() {
      init_foreign84();
      init_Unsafe();
      init_Web_Internal();
      init_foreign84();
    }
  });

  // output/Web.HTML.HTMLOptionElement/foreign.js
  var init_foreign85 = __esm({
    "output/Web.HTML.HTMLOptionElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLOptionElement/index.js
  var init_Web_HTML39 = __esm({
    "output/Web.HTML.HTMLOptionElement/index.js"() {
      init_foreign85();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign85();
    }
  });

  // output/Web.HTML.HTMLOutputElement/foreign.js
  var init_foreign86 = __esm({
    "output/Web.HTML.HTMLOutputElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLOutputElement/index.js
  var init_Web_HTML40 = __esm({
    "output/Web.HTML.HTMLOutputElement/index.js"() {
      init_foreign86();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign86();
    }
  });

  // output/Web.HTML.HTMLParagraphElement/index.js
  var init_Web_HTML41 = __esm({
    "output/Web.HTML.HTMLParagraphElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLParamElement/foreign.js
  var init_foreign87 = __esm({
    "output/Web.HTML.HTMLParamElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLParamElement/index.js
  var init_Web_HTML42 = __esm({
    "output/Web.HTML.HTMLParamElement/index.js"() {
      init_foreign87();
      init_Unsafe();
      init_Web_Internal();
      init_foreign87();
    }
  });

  // output/Web.HTML.HTMLPreElement/index.js
  var init_Web_HTML43 = __esm({
    "output/Web.HTML.HTMLPreElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLProgressElement/foreign.js
  var init_foreign88 = __esm({
    "output/Web.HTML.HTMLProgressElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLProgressElement/index.js
  var init_Web_HTML44 = __esm({
    "output/Web.HTML.HTMLProgressElement/index.js"() {
      init_foreign88();
      init_Unsafe();
      init_Web_Internal();
      init_foreign88();
    }
  });

  // output/Web.HTML.HTMLQuoteElement/foreign.js
  var init_foreign89 = __esm({
    "output/Web.HTML.HTMLQuoteElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLQuoteElement/index.js
  var init_Web_HTML45 = __esm({
    "output/Web.HTML.HTMLQuoteElement/index.js"() {
      init_foreign89();
      init_Unsafe();
      init_Web_Internal();
      init_foreign89();
    }
  });

  // output/Web.HTML.HTMLScriptElement/foreign.js
  var init_foreign90 = __esm({
    "output/Web.HTML.HTMLScriptElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLScriptElement/index.js
  var init_Web_HTML46 = __esm({
    "output/Web.HTML.HTMLScriptElement/index.js"() {
      init_foreign90();
      init_Unsafe();
      init_Web_Internal();
      init_foreign90();
    }
  });

  // output/Web.HTML.HTMLSelectElement/foreign.js
  var init_foreign91 = __esm({
    "output/Web.HTML.HTMLSelectElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLSelectElement/index.js
  var init_Web_HTML47 = __esm({
    "output/Web.HTML.HTMLSelectElement/index.js"() {
      init_foreign91();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign91();
    }
  });

  // output/Web.HTML.HTMLSourceElement/foreign.js
  var init_foreign92 = __esm({
    "output/Web.HTML.HTMLSourceElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLSourceElement/index.js
  var init_Web_HTML48 = __esm({
    "output/Web.HTML.HTMLSourceElement/index.js"() {
      init_foreign92();
      init_Unsafe();
      init_Web_Internal();
      init_foreign92();
    }
  });

  // output/Web.HTML.HTMLSpanElement/index.js
  var init_Web_HTML49 = __esm({
    "output/Web.HTML.HTMLSpanElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLStyleElement/foreign.js
  var init_foreign93 = __esm({
    "output/Web.HTML.HTMLStyleElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLStyleElement/index.js
  var init_Web_HTML50 = __esm({
    "output/Web.HTML.HTMLStyleElement/index.js"() {
      init_foreign93();
      init_Unsafe();
      init_Web_Internal();
      init_foreign93();
    }
  });

  // output/Web.HTML.HTMLTableCaptionElement/index.js
  var init_Web_HTML51 = __esm({
    "output/Web.HTML.HTMLTableCaptionElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLTableCellElement/foreign.js
  var init_foreign94 = __esm({
    "output/Web.HTML.HTMLTableCellElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTableCellElement/index.js
  var init_Web_HTML52 = __esm({
    "output/Web.HTML.HTMLTableCellElement/index.js"() {
      init_foreign94();
      init_Unsafe();
      init_Web_Internal();
      init_foreign94();
    }
  });

  // output/Web.HTML.HTMLTableColElement/foreign.js
  var init_foreign95 = __esm({
    "output/Web.HTML.HTMLTableColElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTableColElement/index.js
  var init_Web_HTML53 = __esm({
    "output/Web.HTML.HTMLTableColElement/index.js"() {
      init_foreign95();
      init_Unsafe();
      init_Web_Internal();
      init_foreign95();
    }
  });

  // output/Web.HTML.HTMLTableDataCellElement/index.js
  var init_Web_HTML54 = __esm({
    "output/Web.HTML.HTMLTableDataCellElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLTableElement/foreign.js
  var init_foreign96 = __esm({
    "output/Web.HTML.HTMLTableElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTableElement/index.js
  var init_Web_HTML55 = __esm({
    "output/Web.HTML.HTMLTableElement/index.js"() {
      init_foreign96();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign96();
    }
  });

  // output/Web.HTML.HTMLTableHeaderCellElement/foreign.js
  var init_foreign97 = __esm({
    "output/Web.HTML.HTMLTableHeaderCellElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTableHeaderCellElement/index.js
  var init_Web_HTML56 = __esm({
    "output/Web.HTML.HTMLTableHeaderCellElement/index.js"() {
      init_foreign97();
      init_Unsafe();
      init_Web_Internal();
      init_foreign97();
    }
  });

  // output/Web.HTML.HTMLTableRowElement/foreign.js
  var init_foreign98 = __esm({
    "output/Web.HTML.HTMLTableRowElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTableRowElement/index.js
  var init_Web_HTML57 = __esm({
    "output/Web.HTML.HTMLTableRowElement/index.js"() {
      init_foreign98();
      init_Unsafe();
      init_Web_Internal();
      init_foreign98();
    }
  });

  // output/Web.HTML.HTMLTableSectionElement/foreign.js
  var init_foreign99 = __esm({
    "output/Web.HTML.HTMLTableSectionElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTableSectionElement/index.js
  var init_Web_HTML58 = __esm({
    "output/Web.HTML.HTMLTableSectionElement/index.js"() {
      init_foreign99();
      init_Unsafe();
      init_Web_Internal();
      init_foreign99();
    }
  });

  // output/Web.HTML.HTMLTemplateElement/foreign.js
  var init_foreign100 = __esm({
    "output/Web.HTML.HTMLTemplateElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTemplateElement/index.js
  var init_Web_HTML59 = __esm({
    "output/Web.HTML.HTMLTemplateElement/index.js"() {
      init_foreign100();
      init_Unsafe();
      init_Web_Internal();
      init_foreign100();
    }
  });

  // output/Web.HTML.HTMLTextAreaElement/foreign.js
  var init_foreign101 = __esm({
    "output/Web.HTML.HTMLTextAreaElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTextAreaElement/index.js
  var init_Web_HTML60 = __esm({
    "output/Web.HTML.HTMLTextAreaElement/index.js"() {
      init_foreign101();
      init_Data4();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_HTML24();
      init_Web_Internal();
      init_foreign101();
    }
  });

  // output/Web.HTML.HTMLTimeElement/foreign.js
  var init_foreign102 = __esm({
    "output/Web.HTML.HTMLTimeElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTimeElement/index.js
  var init_Web_HTML61 = __esm({
    "output/Web.HTML.HTMLTimeElement/index.js"() {
      init_foreign102();
      init_Unsafe();
      init_Web_Internal();
      init_foreign102();
    }
  });

  // output/Web.HTML.HTMLTitleElement/foreign.js
  var init_foreign103 = __esm({
    "output/Web.HTML.HTMLTitleElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTitleElement/index.js
  var init_Web_HTML62 = __esm({
    "output/Web.HTML.HTMLTitleElement/index.js"() {
      init_foreign103();
      init_Unsafe();
      init_Web_Internal();
      init_foreign103();
    }
  });

  // output/Web.HTML.HTMLTrackElement/foreign.js
  var init_foreign104 = __esm({
    "output/Web.HTML.HTMLTrackElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLTrackElement.ReadyState/index.js
  var init_Web_HTML_HTMLTrackElement = __esm({
    "output/Web.HTML.HTMLTrackElement.ReadyState/index.js"() {
      init_Data30();
      init_Data15();
      init_Data9();
    }
  });

  // output/Web.HTML.HTMLTrackElement/index.js
  var init_Web_HTML63 = __esm({
    "output/Web.HTML.HTMLTrackElement/index.js"() {
      init_foreign104();
      init_Data30();
      init_Data4();
      init_Data15();
      init_Effect();
      init_Unsafe();
      init_Web_HTML_HTMLTrackElement();
      init_Web_Internal();
      init_foreign104();
    }
  });

  // output/Web.HTML.HTMLUListElement/index.js
  var init_Web_HTML64 = __esm({
    "output/Web.HTML.HTMLUListElement/index.js"() {
      init_Unsafe();
      init_Web_Internal();
    }
  });

  // output/Web.HTML.HTMLVideoElement/foreign.js
  var init_foreign105 = __esm({
    "output/Web.HTML.HTMLVideoElement/foreign.js"() {
    }
  });

  // output/Web.HTML.HTMLVideoElement/index.js
  var init_Web_HTML65 = __esm({
    "output/Web.HTML.HTMLVideoElement/index.js"() {
      init_foreign105();
      init_Unsafe();
      init_Web_Internal();
      init_foreign105();
    }
  });

  // output/Web.HTML.History/foreign.js
  var init_foreign106 = __esm({
    "output/Web.HTML.History/foreign.js"() {
    }
  });

  // output/Web.HTML.History/index.js
  var init_Web_HTML66 = __esm({
    "output/Web.HTML.History/index.js"() {
      init_foreign106();
      init_Data12();
      init_foreign106();
    }
  });

  // output/Web.HTML.Location/foreign.js
  var init_foreign107 = __esm({
    "output/Web.HTML.Location/foreign.js"() {
    }
  });

  // output/Web.HTML.Location/index.js
  var init_Web_HTML67 = __esm({
    "output/Web.HTML.Location/index.js"() {
      init_foreign107();
      init_foreign107();
    }
  });

  // output/Web.HTML.Navigator/foreign.js
  var init_foreign108 = __esm({
    "output/Web.HTML.Navigator/foreign.js"() {
    }
  });

  // output/Web.HTML.Navigator/index.js
  var init_Web_HTML68 = __esm({
    "output/Web.HTML.Navigator/index.js"() {
      init_foreign108();
      init_foreign108();
    }
  });

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }
  var init_foreign109 = __esm({
    "output/Web.HTML.Window/foreign.js"() {
    }
  });

  // output/Web.HTML.Window/index.js
  var toEventTarget;
  var init_Web_HTML69 = __esm({
    "output/Web.HTML.Window/index.js"() {
      init_foreign109();
      init_Data4();
      init_Data46();
      init_Data12();
      init_Effect();
      init_Unsafe();
      init_Web_Internal();
      init_foreign109();
      toEventTarget = unsafeCoerce2;
    }
  });

  // output/Web.HTML/index.js
  var init_Web = __esm({
    "output/Web.HTML/index.js"() {
      init_foreign53();
      init_Web_HTML();
      init_Web_HTML2();
      init_Web_HTML3();
      init_Web_HTML4();
      init_Web_HTML5();
      init_Web_HTML6();
      init_Web_HTML7();
      init_Web_HTML8();
      init_Web_HTML9();
      init_Web_HTML10();
      init_Web_HTML11();
      init_Web_HTML12();
      init_Web_HTML13();
      init_Web_HTML14();
      init_Web_HTML15();
      init_Web_HTML16();
      init_Web_HTML17();
      init_Web_HTML18();
      init_Web_HTML19();
      init_Web_HTML20();
      init_Web_HTML21();
      init_Web_HTML22();
      init_Web_HTML23();
      init_Web_HTML25();
      init_Web_HTML26();
      init_Web_HTML27();
      init_Web_HTML28();
      init_Web_HTML29();
      init_Web_HTML30();
      init_Web_HTML31();
      init_Web_HTML32();
      init_Web_HTML33();
      init_Web_HTML34();
      init_Web_HTML35();
      init_Web_HTML36();
      init_Web_HTML37();
      init_Web_HTML38();
      init_Web_HTML39();
      init_Web_HTML40();
      init_Web_HTML41();
      init_Web_HTML42();
      init_Web_HTML43();
      init_Web_HTML44();
      init_Web_HTML45();
      init_Web_HTML46();
      init_Web_HTML47();
      init_Web_HTML48();
      init_Web_HTML49();
      init_Web_HTML50();
      init_Web_HTML51();
      init_Web_HTML52();
      init_Web_HTML53();
      init_Web_HTML54();
      init_Web_HTML55();
      init_Web_HTML56();
      init_Web_HTML57();
      init_Web_HTML58();
      init_Web_HTML59();
      init_Web_HTML60();
      init_Web_HTML61();
      init_Web_HTML62();
      init_Web_HTML63();
      init_Web_HTML64();
      init_Web_HTML65();
      init_Web_HTML66();
      init_Web_HTML67();
      init_Web_HTML68();
      init_Web_HTML69();
      init_foreign53();
    }
  });

  // output/Web.HTML.Event.EventTypes/index.js
  var domcontentloaded;
  var init_Web_HTML_Event = __esm({
    "output/Web.HTML.Event.EventTypes/index.js"() {
      domcontentloaded = "DOMContentLoaded";
    }
  });

  // output/Halogen.Aff.Util/index.js
  var bind3, liftEffect3, bindFlipped4, composeKleisliFlipped2, pure3, bindFlipped1, pure1, map10, discard2, throwError2, selectElement, runHalogenAff, awaitLoad, awaitBody;
  var init_Halogen_Aff = __esm({
    "output/Halogen.Aff.Util/index.js"() {
      init_Control4();
      init_Control5();
      init_Control_Monad_Error();
      init_Data16();
      init_Data2();
      init_Data4();
      init_Data15();
      init_Data3();
      init_Effect();
      init_Effect6();
      init_Effect4();
      init_Effect3();
      init_Web_DOM();
      init_Web_Event();
      init_Web();
      init_Web_HTML_Event();
      init_Web_HTML14();
      init_Web_HTML_HTMLDocument();
      init_Web_HTML15();
      init_Web_HTML69();
      bind3 = /* @__PURE__ */ bind(bindAff);
      liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
      bindFlipped4 = /* @__PURE__ */ bindFlipped(bindEffect);
      composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
      pure3 = /* @__PURE__ */ pure(applicativeAff);
      bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
      pure1 = /* @__PURE__ */ pure(applicativeEffect);
      map10 = /* @__PURE__ */ map(functorEffect);
      discard2 = /* @__PURE__ */ discard(discardUnit);
      throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
      selectElement = function(query2) {
        return bind3(liftEffect3(bindFlipped4(composeKleisliFlipped2(function() {
          var $16 = querySelector(query2);
          return function($17) {
            return $16(toParentNode($17));
          };
        }())(document))(windowImpl)))(function(mel) {
          return pure3(bindFlipped1(fromElement)(mel));
        });
      };
      runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure1(unit))));
      awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
        return function __do2() {
          var rs = bindFlipped4(readyState)(bindFlipped4(document)(windowImpl))();
          if (rs instanceof Loading) {
            var et = map10(toEventTarget)(windowImpl)();
            var listener = eventListener(function(v) {
              return callback(new Right(unit));
            })();
            addEventListener(domcontentloaded)(listener)(false)(et)();
            return effectCanceler(removeEventListener(domcontentloaded)(listener)(false)(et));
          }
          ;
          callback(new Right(unit))();
          return nonCanceler;
        };
      });
      awaitBody = /* @__PURE__ */ discard2(bindAff)(awaitLoad)(function() {
        return bind3(selectElement("body"))(function(body2) {
          return maybe(throwError2(error("Could not find body")))(pure3)(body2);
        });
      });
    }
  });

  // output/Data.Exists/index.js
  var runExists, mkExists;
  var init_Data47 = __esm({
    "output/Data.Exists/index.js"() {
      init_Unsafe();
      runExists = unsafeCoerce2;
      mkExists = unsafeCoerce2;
    }
  });

  // output/Data.Coyoneda/index.js
  var CoyonedaF, unCoyoneda, coyoneda, functorCoyoneda, liftCoyoneda;
  var init_Data48 = __esm({
    "output/Data.Coyoneda/index.js"() {
      init_Control7();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control12();
      init_Control11();
      init_Control9();
      init_Data36();
      init_Data8();
      init_Data47();
      init_Data26();
      init_Data4();
      init_Data_Functor();
      init_Data12();
      init_Data_Semigroup();
      init_Data_Semigroup2();
      init_Data27();
      CoyonedaF = /* @__PURE__ */ function() {
        function CoyonedaF2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        CoyonedaF2.create = function(value0) {
          return function(value1) {
            return new CoyonedaF2(value0, value1);
          };
        };
        return CoyonedaF2;
      }();
      unCoyoneda = function(f) {
        return function(v) {
          return runExists(function(v1) {
            return f(v1.value0)(v1.value1);
          })(v);
        };
      };
      coyoneda = function(k) {
        return function(fi) {
          return mkExists(new CoyonedaF(k, fi));
        };
      };
      functorCoyoneda = {
        map: function(f) {
          return function(v) {
            return runExists(function(v1) {
              return coyoneda(function($180) {
                return f(v1.value0($180));
              })(v1.value1);
            })(v);
          };
        }
      };
      liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));
    }
  });

  // output/Data.Map.Internal/index.js
  var Leaf, Two, Three, TwoLeft, TwoRight, ThreeLeft, ThreeMiddle, ThreeRight, KickUp, lookup, fromZipper, insert2, pop, foldableMap, empty2, $$delete2, alter;
  var init_Data_Map = __esm({
    "output/Data.Map.Internal/index.js"() {
      init_Control4();
      init_Control3();
      init_Control2();
      init_Data8();
      init_Data26();
      init_Data40();
      init_Data2();
      init_Data4();
      init_Data37();
      init_Data21();
      init_Data43();
      init_Data_List3();
      init_Data_List_Lazy();
      init_Data_List();
      init_Data15();
      init_Data20();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data14();
      init_Data27();
      init_Data41();
      init_Data22();
      init_Data29();
      init_Partial2();
      Leaf = /* @__PURE__ */ function() {
        function Leaf2() {
        }
        ;
        Leaf2.value = new Leaf2();
        return Leaf2;
      }();
      Two = /* @__PURE__ */ function() {
        function Two2(value0, value1, value22, value32) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
        }
        ;
        Two2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return new Two2(value0, value1, value22, value32);
              };
            };
          };
        };
        return Two2;
      }();
      Three = /* @__PURE__ */ function() {
        function Three2(value0, value1, value22, value32, value42, value52, value62) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
          this.value4 = value42;
          this.value5 = value52;
          this.value6 = value62;
        }
        ;
        Three2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return function(value42) {
                  return function(value52) {
                    return function(value62) {
                      return new Three2(value0, value1, value22, value32, value42, value52, value62);
                    };
                  };
                };
              };
            };
          };
        };
        return Three2;
      }();
      TwoLeft = /* @__PURE__ */ function() {
        function TwoLeft2(value0, value1, value22) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
        }
        ;
        TwoLeft2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return new TwoLeft2(value0, value1, value22);
            };
          };
        };
        return TwoLeft2;
      }();
      TwoRight = /* @__PURE__ */ function() {
        function TwoRight2(value0, value1, value22) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
        }
        ;
        TwoRight2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return new TwoRight2(value0, value1, value22);
            };
          };
        };
        return TwoRight2;
      }();
      ThreeLeft = /* @__PURE__ */ function() {
        function ThreeLeft2(value0, value1, value22, value32, value42, value52) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
          this.value4 = value42;
          this.value5 = value52;
        }
        ;
        ThreeLeft2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return function(value42) {
                  return function(value52) {
                    return new ThreeLeft2(value0, value1, value22, value32, value42, value52);
                  };
                };
              };
            };
          };
        };
        return ThreeLeft2;
      }();
      ThreeMiddle = /* @__PURE__ */ function() {
        function ThreeMiddle2(value0, value1, value22, value32, value42, value52) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
          this.value4 = value42;
          this.value5 = value52;
        }
        ;
        ThreeMiddle2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return function(value42) {
                  return function(value52) {
                    return new ThreeMiddle2(value0, value1, value22, value32, value42, value52);
                  };
                };
              };
            };
          };
        };
        return ThreeMiddle2;
      }();
      ThreeRight = /* @__PURE__ */ function() {
        function ThreeRight2(value0, value1, value22, value32, value42, value52) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
          this.value4 = value42;
          this.value5 = value52;
        }
        ;
        ThreeRight2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return function(value42) {
                  return function(value52) {
                    return new ThreeRight2(value0, value1, value22, value32, value42, value52);
                  };
                };
              };
            };
          };
        };
        return ThreeRight2;
      }();
      KickUp = /* @__PURE__ */ function() {
        function KickUp2(value0, value1, value22, value32) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
        }
        ;
        KickUp2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return new KickUp2(value0, value1, value22, value32);
              };
            };
          };
        };
        return KickUp2;
      }();
      lookup = function(dictOrd) {
        var compare2 = compare(dictOrd);
        return function(k) {
          var go2 = function($copy_v) {
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v) {
              if (v instanceof Leaf) {
                $tco_done = true;
                return Nothing.value;
              }
              ;
              if (v instanceof Two) {
                var v2 = compare2(k)(v.value1);
                if (v2 instanceof EQ) {
                  $tco_done = true;
                  return new Just(v.value2);
                }
                ;
                if (v2 instanceof LT) {
                  $copy_v = v.value0;
                  return;
                }
                ;
                $copy_v = v.value3;
                return;
              }
              ;
              if (v instanceof Three) {
                var v3 = compare2(k)(v.value1);
                if (v3 instanceof EQ) {
                  $tco_done = true;
                  return new Just(v.value2);
                }
                ;
                var v4 = compare2(k)(v.value4);
                if (v4 instanceof EQ) {
                  $tco_done = true;
                  return new Just(v.value5);
                }
                ;
                if (v3 instanceof LT) {
                  $copy_v = v.value0;
                  return;
                }
                ;
                if (v4 instanceof GT) {
                  $copy_v = v.value6;
                  return;
                }
                ;
                $copy_v = v.value3;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($copy_v);
            }
            ;
            return $tco_result;
          };
          return go2;
        };
      };
      fromZipper = function($copy_dictOrd) {
        return function($copy_v) {
          return function($copy_v1) {
            var $tco_var_dictOrd = $copy_dictOrd;
            var $tco_var_v = $copy_v;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(dictOrd, v, v1) {
              if (v instanceof Nil) {
                $tco_done = true;
                return v1;
              }
              ;
              if (v instanceof Cons) {
                if (v.value0 instanceof TwoLeft) {
                  $tco_var_dictOrd = dictOrd;
                  $tco_var_v = v.value1;
                  $copy_v1 = new Two(v1, v.value0.value0, v.value0.value1, v.value0.value2);
                  return;
                }
                ;
                if (v.value0 instanceof TwoRight) {
                  $tco_var_dictOrd = dictOrd;
                  $tco_var_v = v.value1;
                  $copy_v1 = new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1);
                  return;
                }
                ;
                if (v.value0 instanceof ThreeLeft) {
                  $tco_var_dictOrd = dictOrd;
                  $tco_var_v = v.value1;
                  $copy_v1 = new Three(v1, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
                  return;
                }
                ;
                if (v.value0 instanceof ThreeMiddle) {
                  $tco_var_dictOrd = dictOrd;
                  $tco_var_v = v.value1;
                  $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1, v.value0.value3, v.value0.value4, v.value0.value5);
                  return;
                }
                ;
                if (v.value0 instanceof ThreeRight) {
                  $tco_var_dictOrd = dictOrd;
                  $tco_var_v = v.value1;
                  $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, v1);
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, v1.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_v1);
            }
            ;
            return $tco_result;
          };
        };
      };
      insert2 = function(dictOrd) {
        var fromZipper1 = fromZipper(dictOrd);
        var compare2 = compare(dictOrd);
        return function(k) {
          return function(v) {
            var up = function($copy_v1) {
              return function($copy_v2) {
                var $tco_var_v1 = $copy_v1;
                var $tco_done = false;
                var $tco_result;
                function $tco_loop(v1, v2) {
                  if (v1 instanceof Nil) {
                    $tco_done = true;
                    return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
                  }
                  ;
                  if (v1 instanceof Cons) {
                    if (v1.value0 instanceof TwoLeft) {
                      $tco_done = true;
                      return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                    }
                    ;
                    if (v1.value0 instanceof TwoRight) {
                      $tco_done = true;
                      return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                    }
                    ;
                    if (v1.value0 instanceof ThreeLeft) {
                      $tco_var_v1 = v1.value1;
                      $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                      return;
                    }
                    ;
                    if (v1.value0 instanceof ThreeMiddle) {
                      $tco_var_v1 = v1.value1;
                      $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                      return;
                    }
                    ;
                    if (v1.value0 instanceof ThreeRight) {
                      $tco_var_v1 = v1.value1;
                      $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                      return;
                    }
                    ;
                    throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
                }
                ;
                while (!$tco_done) {
                  $tco_result = $tco_loop($tco_var_v1, $copy_v2);
                }
                ;
                return $tco_result;
              };
            };
            var down = function($copy_v1) {
              return function($copy_v2) {
                var $tco_var_v1 = $copy_v1;
                var $tco_done1 = false;
                var $tco_result;
                function $tco_loop(v1, v2) {
                  if (v2 instanceof Leaf) {
                    $tco_done1 = true;
                    return up(v1)(new KickUp(Leaf.value, k, v, Leaf.value));
                  }
                  ;
                  if (v2 instanceof Two) {
                    var v3 = compare2(k)(v2.value1);
                    if (v3 instanceof EQ) {
                      $tco_done1 = true;
                      return fromZipper1(v1)(new Two(v2.value0, k, v, v2.value3));
                    }
                    ;
                    if (v3 instanceof LT) {
                      $tco_var_v1 = new Cons(new TwoLeft(v2.value1, v2.value2, v2.value3), v1);
                      $copy_v2 = v2.value0;
                      return;
                    }
                    ;
                    $tco_var_v1 = new Cons(new TwoRight(v2.value0, v2.value1, v2.value2), v1);
                    $copy_v2 = v2.value3;
                    return;
                  }
                  ;
                  if (v2 instanceof Three) {
                    var v3 = compare2(k)(v2.value1);
                    if (v3 instanceof EQ) {
                      $tco_done1 = true;
                      return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                    }
                    ;
                    var v4 = compare2(k)(v2.value4);
                    if (v4 instanceof EQ) {
                      $tco_done1 = true;
                      return fromZipper1(v1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, k, v, v2.value6));
                    }
                    ;
                    if (v3 instanceof LT) {
                      $tco_var_v1 = new Cons(new ThreeLeft(v2.value1, v2.value2, v2.value3, v2.value4, v2.value5, v2.value6), v1);
                      $copy_v2 = v2.value0;
                      return;
                    }
                    ;
                    if (v3 instanceof GT && v4 instanceof LT) {
                      $tco_var_v1 = new Cons(new ThreeMiddle(v2.value0, v2.value1, v2.value2, v2.value4, v2.value5, v2.value6), v1);
                      $copy_v2 = v2.value3;
                      return;
                    }
                    ;
                    $tco_var_v1 = new Cons(new ThreeRight(v2.value0, v2.value1, v2.value2, v2.value3, v2.value4, v2.value5), v1);
                    $copy_v2 = v2.value6;
                    return;
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [v1.constructor.name, v2.constructor.name]);
                }
                ;
                while (!$tco_done1) {
                  $tco_result = $tco_loop($tco_var_v1, $copy_v2);
                }
                ;
                return $tco_result;
              };
            };
            return down(Nil.value);
          };
        };
      };
      pop = function(dictOrd) {
        var fromZipper1 = fromZipper(dictOrd);
        var compare2 = compare(dictOrd);
        return function(k) {
          var up = function($copy_ctxs) {
            return function($copy_tree) {
              var $tco_var_ctxs = $copy_ctxs;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(ctxs, tree) {
                if (ctxs instanceof Nil) {
                  $tco_done = true;
                  return tree;
                }
                ;
                if (ctxs instanceof Cons) {
                  if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
                  }
                  ;
                  if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
                  }
                  ;
                  if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                    $tco_var_ctxs = ctxs.value1;
                    $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                    return;
                  }
                  ;
                  if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                    $tco_var_ctxs = ctxs.value1;
                    $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                    return;
                  }
                  ;
                  if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
                  }
                  ;
                  if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
                  }
                  ;
                  if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                    $tco_done = true;
                    return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
                  }
                  ;
                  $tco_done = true;
                  return unsafeCrashWith("The impossible happened in partial function `up`.");
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
              }
              ;
              return $tco_result;
            };
          };
          var removeMaxNode = function($copy_ctx) {
            return function($copy_m) {
              var $tco_var_ctx = $copy_ctx;
              var $tco_done1 = false;
              var $tco_result;
              function $tco_loop(ctx, m) {
                if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
                  $tco_done1 = true;
                  return up(ctx)(Leaf.value);
                }
                ;
                if (m instanceof Two) {
                  $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
                  $copy_m = m.value3;
                  return;
                }
                ;
                if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
                  $tco_done1 = true;
                  return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
                }
                ;
                if (m instanceof Three) {
                  $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
                  $copy_m = m.value6;
                  return;
                }
                ;
                $tco_done1 = true;
                return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
              }
              ;
              while (!$tco_done1) {
                $tco_result = $tco_loop($tco_var_ctx, $copy_m);
              }
              ;
              return $tco_result;
            };
          };
          var maxNode = function($copy_m) {
            var $tco_done2 = false;
            var $tco_result;
            function $tco_loop(m) {
              if (m instanceof Two && m.value3 instanceof Leaf) {
                $tco_done2 = true;
                return {
                  key: m.value1,
                  value: m.value2
                };
              }
              ;
              if (m instanceof Two) {
                $copy_m = m.value3;
                return;
              }
              ;
              if (m instanceof Three && m.value6 instanceof Leaf) {
                $tco_done2 = true;
                return {
                  key: m.value4,
                  value: m.value5
                };
              }
              ;
              if (m instanceof Three) {
                $copy_m = m.value6;
                return;
              }
              ;
              $tco_done2 = true;
              return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
            }
            ;
            while (!$tco_done2) {
              $tco_result = $tco_loop($copy_m);
            }
            ;
            return $tco_result;
          };
          var down = function($copy_ctx) {
            return function($copy_m) {
              var $tco_var_ctx = $copy_ctx;
              var $tco_done3 = false;
              var $tco_result;
              function $tco_loop(ctx, m) {
                if (m instanceof Leaf) {
                  $tco_done3 = true;
                  return Nothing.value;
                }
                ;
                if (m instanceof Two) {
                  var v = compare2(k)(m.value1);
                  if (m.value3 instanceof Leaf && v instanceof EQ) {
                    $tco_done3 = true;
                    return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
                  }
                  ;
                  if (v instanceof EQ) {
                    var max6 = maxNode(m.value0);
                    $tco_done3 = true;
                    return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max6.key, max6.value, m.value3), ctx))(m.value0)));
                  }
                  ;
                  if (v instanceof LT) {
                    $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                    $copy_m = m.value0;
                    return;
                  }
                  ;
                  $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
                  $copy_m = m.value3;
                  return;
                }
                ;
                if (m instanceof Three) {
                  var leaves = function() {
                    if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                      return true;
                    }
                    ;
                    return false;
                  }();
                  var v = compare2(k)(m.value4);
                  var v3 = compare2(k)(m.value1);
                  if (leaves && v3 instanceof EQ) {
                    $tco_done3 = true;
                    return new Just(new Tuple(m.value2, fromZipper1(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
                  }
                  ;
                  if (leaves && v instanceof EQ) {
                    $tco_done3 = true;
                    return new Just(new Tuple(m.value5, fromZipper1(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
                  }
                  ;
                  if (v3 instanceof EQ) {
                    var max6 = maxNode(m.value0);
                    $tco_done3 = true;
                    return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max6.key, max6.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
                  }
                  ;
                  if (v instanceof EQ) {
                    var max6 = maxNode(m.value3);
                    $tco_done3 = true;
                    return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max6.key, max6.value, m.value6), ctx))(m.value3)));
                  }
                  ;
                  if (v3 instanceof LT) {
                    $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                    $copy_m = m.value0;
                    return;
                  }
                  ;
                  if (v3 instanceof GT && v instanceof LT) {
                    $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                    $copy_m = m.value3;
                    return;
                  }
                  ;
                  $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
                  $copy_m = m.value6;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
              }
              ;
              while (!$tco_done3) {
                $tco_result = $tco_loop($tco_var_ctx, $copy_m);
              }
              ;
              return $tco_result;
            };
          };
          return down(Nil.value);
        };
      };
      foldableMap = {
        foldr: function(f) {
          return function(z) {
            return function(m) {
              if (m instanceof Leaf) {
                return z;
              }
              ;
              if (m instanceof Two) {
                return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(z)(m.value3)))(m.value0);
              }
              ;
              if (m instanceof Three) {
                return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(f(m.value5)(foldr(foldableMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m.constructor.name]);
            };
          };
        },
        foldl: function(f) {
          return function(z) {
            return function(m) {
              if (m instanceof Leaf) {
                return z;
              }
              ;
              if (m instanceof Two) {
                return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3);
              }
              ;
              if (m instanceof Three) {
                return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m.constructor.name]);
            };
          };
        },
        foldMap: function(dictMonoid) {
          var mempty2 = mempty(dictMonoid);
          var append22 = append(dictMonoid.Semigroup0());
          return function(f) {
            return function(m) {
              if (m instanceof Leaf) {
                return mempty2;
              }
              ;
              if (m instanceof Two) {
                return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(foldMap(foldableMap)(dictMonoid)(f)(m.value3)));
              }
              ;
              if (m instanceof Three) {
                return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(append22(foldMap(foldableMap)(dictMonoid)(f)(m.value3))(append22(f(m.value5))(foldMap(foldableMap)(dictMonoid)(f)(m.value6)))));
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m.constructor.name]);
            };
          };
        }
      };
      empty2 = /* @__PURE__ */ function() {
        return Leaf.value;
      }();
      $$delete2 = function(dictOrd) {
        var pop1 = pop(dictOrd);
        return function(k) {
          return function(m) {
            return maybe(m)(snd)(pop1(k)(m));
          };
        };
      };
      alter = function(dictOrd) {
        var lookup12 = lookup(dictOrd);
        var delete1 = $$delete2(dictOrd);
        var insert12 = insert2(dictOrd);
        return function(f) {
          return function(k) {
            return function(m) {
              var v = f(lookup12(k)(m));
              if (v instanceof Nothing) {
                return delete1(k)(m);
              }
              ;
              if (v instanceof Just) {
                return insert12(k)(v.value0)(m);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
            };
          };
        };
      };
    }
  });

  // output/Data.Monoid.Alternate/index.js
  var init_Data_Monoid7 = __esm({
    "output/Data.Monoid.Alternate/index.js"() {
      init_Control7();
      init_Control9();
      init_Data14();
    }
  });

  // output/Halogen.Data.OrdBox/index.js
  var init_Halogen_Data = __esm({
    "output/Halogen.Data.OrdBox/index.js"() {
      init_Data8();
      init_Data12();
    }
  });

  // output/Halogen.Data.Slot/index.js
  var foreachSlot, empty3;
  var init_Halogen_Data2 = __esm({
    "output/Halogen.Data.Slot/index.js"() {
      init_Data();
      init_Data26();
      init_Data_Map();
      init_Data15();
      init_Data_Monoid7();
      init_Data25();
      init_Data12();
      init_Data5();
      init_Data22();
      init_Halogen_Data();
      foreachSlot = function(dictApplicative) {
        var traverse_7 = traverse_(dictApplicative)(foldableMap);
        return function(v) {
          return function(k) {
            return traverse_7(function($54) {
              return k($54);
            })(v);
          };
        };
      };
      empty3 = empty2;
    }
  });

  // output/DOM.HTML.Indexed.AutocompleteType/index.js
  var init_DOM_HTML_Indexed = __esm({
    "output/DOM.HTML.Indexed.AutocompleteType/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.ButtonType/index.js
  var init_DOM_HTML_Indexed2 = __esm({
    "output/DOM.HTML.Indexed.ButtonType/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.CrossOriginValue/index.js
  var init_DOM_HTML_Indexed3 = __esm({
    "output/DOM.HTML.Indexed.CrossOriginValue/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.DirValue/index.js
  var init_DOM_HTML_Indexed4 = __esm({
    "output/DOM.HTML.Indexed.DirValue/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.FormMethod/index.js
  var init_DOM_HTML_Indexed5 = __esm({
    "output/DOM.HTML.Indexed.FormMethod/index.js"() {
      init_Data9();
    }
  });

  // output/Data.MediaType/index.js
  var init_Data49 = __esm({
    "output/Data.MediaType/index.js"() {
      init_Data12();
      init_Data14();
    }
  });

  // output/DOM.HTML.Indexed.InputAcceptType/index.js
  var init_DOM_HTML_Indexed6 = __esm({
    "output/DOM.HTML.Indexed.InputAcceptType/index.js"() {
      init_Data8();
      init_Data4();
      init_Data49();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data_String3();
    }
  });

  // output/DOM.HTML.Indexed.InputType/index.js
  var init_DOM_HTML_Indexed7 = __esm({
    "output/DOM.HTML.Indexed.InputType/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.KindValue/index.js
  var init_DOM_HTML_Indexed8 = __esm({
    "output/DOM.HTML.Indexed.KindValue/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.MenuType/index.js
  var init_DOM_HTML_Indexed9 = __esm({
    "output/DOM.HTML.Indexed.MenuType/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.MenuitemType/index.js
  var init_DOM_HTML_Indexed10 = __esm({
    "output/DOM.HTML.Indexed.MenuitemType/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.OrderedListType/index.js
  var init_DOM_HTML_Indexed11 = __esm({
    "output/DOM.HTML.Indexed.OrderedListType/index.js"() {
      init_Data8();
      init_Data12();
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.PreloadValue/index.js
  var init_DOM_HTML_Indexed12 = __esm({
    "output/DOM.HTML.Indexed.PreloadValue/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.ScopeValue/index.js
  var init_DOM_HTML_Indexed13 = __esm({
    "output/DOM.HTML.Indexed.ScopeValue/index.js"() {
      init_Data9();
    }
  });

  // output/DOM.HTML.Indexed.StepValue/index.js
  var init_DOM_HTML_Indexed14 = __esm({
    "output/DOM.HTML.Indexed.StepValue/index.js"() {
      init_Data12();
      init_Data9();
      init_Data14();
    }
  });

  // output/DOM.HTML.Indexed.WrapValue/index.js
  var init_DOM_HTML_Indexed15 = __esm({
    "output/DOM.HTML.Indexed.WrapValue/index.js"() {
      init_Data9();
    }
  });

  // output/Halogen.Query.Input/index.js
  var RefUpdate, Action;
  var init_Halogen_Query = __esm({
    "output/Halogen.Query.Input/index.js"() {
      init_Data8();
      init_Data12();
      RefUpdate = /* @__PURE__ */ function() {
        function RefUpdate2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        RefUpdate2.create = function(value0) {
          return function(value1) {
            return new RefUpdate2(value0, value1);
          };
        };
        return RefUpdate2;
      }();
      Action = /* @__PURE__ */ function() {
        function Action3(value0) {
          this.value0 = value0;
        }
        ;
        Action3.create = function(value0) {
          return new Action3(value0);
        };
        return Action3;
      }();
    }
  });

  // output/Halogen.VDom.Machine/index.js
  var Step, unStep, step3, mkStep, halt, extract2;
  var init_Halogen_VDom = __esm({
    "output/Halogen.VDom.Machine/index.js"() {
      init_Unsafe();
      Step = /* @__PURE__ */ function() {
        function Step3(value0, value1, value22, value32) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
        }
        ;
        Step3.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return new Step3(value0, value1, value22, value32);
              };
            };
          };
        };
        return Step3;
      }();
      unStep = unsafeCoerce2;
      step3 = function(v, a2) {
        return v.value2(v.value1, a2);
      };
      mkStep = unsafeCoerce2;
      halt = function(v) {
        return v.value3(v.value1);
      };
      extract2 = /* @__PURE__ */ unStep(function(v) {
        return v.value0;
      });
    }
  });

  // output/Halogen.VDom.Types/index.js
  var map11, map12, Text, Elem, Keyed, Widget, Grafted, Graft, unGraft, graft, bifunctorGraft, bimap2, runGraft;
  var init_Halogen_VDom2 = __esm({
    "output/Halogen.VDom.Types/index.js"() {
      init_Control2();
      init_Data24();
      init_Data8();
      init_Data4();
      init_Data12();
      init_Data22();
      init_Unsafe();
      map11 = /* @__PURE__ */ map(functorArray);
      map12 = /* @__PURE__ */ map(functorTuple);
      Text = /* @__PURE__ */ function() {
        function Text2(value0) {
          this.value0 = value0;
        }
        ;
        Text2.create = function(value0) {
          return new Text2(value0);
        };
        return Text2;
      }();
      Elem = /* @__PURE__ */ function() {
        function Elem2(value0, value1, value22, value32) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
        }
        ;
        Elem2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return new Elem2(value0, value1, value22, value32);
              };
            };
          };
        };
        return Elem2;
      }();
      Keyed = /* @__PURE__ */ function() {
        function Keyed2(value0, value1, value22, value32) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
          this.value3 = value32;
        }
        ;
        Keyed2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return function(value32) {
                return new Keyed2(value0, value1, value22, value32);
              };
            };
          };
        };
        return Keyed2;
      }();
      Widget = /* @__PURE__ */ function() {
        function Widget2(value0) {
          this.value0 = value0;
        }
        ;
        Widget2.create = function(value0) {
          return new Widget2(value0);
        };
        return Widget2;
      }();
      Grafted = /* @__PURE__ */ function() {
        function Grafted2(value0) {
          this.value0 = value0;
        }
        ;
        Grafted2.create = function(value0) {
          return new Grafted2(value0);
        };
        return Grafted2;
      }();
      Graft = /* @__PURE__ */ function() {
        function Graft2(value0, value1, value22) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
        }
        ;
        Graft2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return new Graft2(value0, value1, value22);
            };
          };
        };
        return Graft2;
      }();
      unGraft = function(f) {
        return function($61) {
          return f($61);
        };
      };
      graft = unsafeCoerce2;
      bifunctorGraft = {
        bimap: function(f) {
          return function(g) {
            return unGraft(function(v) {
              return graft(new Graft(function($63) {
                return f(v.value0($63));
              }, function($64) {
                return g(v.value1($64));
              }, v.value2));
            });
          };
        }
      };
      bimap2 = /* @__PURE__ */ bimap(bifunctorGraft);
      runGraft = /* @__PURE__ */ unGraft(function(v) {
        var go2 = function(v2) {
          if (v2 instanceof Text) {
            return new Text(v2.value0);
          }
          ;
          if (v2 instanceof Elem) {
            return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map11(go2)(v2.value3));
          }
          ;
          if (v2 instanceof Keyed) {
            return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map11(map12(go2))(v2.value3));
          }
          ;
          if (v2 instanceof Widget) {
            return new Widget(v.value1(v2.value0));
          }
          ;
          if (v2 instanceof Grafted) {
            return new Grafted(bimap2(v.value0)(v.value1)(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
        };
        return go2(v.value2);
      });
    }
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key, obj) {
    return obj[key];
  }
  function unsafeHasAny(key, obj) {
    return obj.hasOwnProperty(key);
  }
  function unsafeSetAny(key, val, obj) {
    obj[key] = val;
  }
  function forE2(a2, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a2.length; i2++) {
      b2.push(f(i2, a2[i2]));
    }
    return b2;
  }
  function forEachE(a2, f) {
    for (var i2 = 0; i2 < a2.length; i2++) {
      f(a2[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a2[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a2[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      o[k] = f(k, i2, a2);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a2);
      } else {
        o2[k] = f3(k, i2, a2);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a2, b2) {
    return a2 === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name15, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name15);
    } else {
      return doc.createElement(name15);
    }
  }
  function insertChildIx(i2, a2, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a2) {
      b2.insertBefore(a2, n);
    }
  }
  function removeChild(a2, b2) {
    if (b2 && a2.parentNode === b2) {
      b2.removeChild(a2);
    }
  }
  function parentNode(a2) {
    return a2.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener2(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener2(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined;
  var init_foreign110 = __esm({
    "output/Halogen.VDom.Util/foreign.js"() {
      "use strict";
      jsUndefined = void 0;
    }
  });

  // output/Foreign.Object.ST/foreign.js
  var newImpl;
  var init_foreign111 = __esm({
    "output/Foreign.Object.ST/foreign.js"() {
      newImpl = function() {
        return {};
      };
    }
  });

  // output/Foreign.Object.ST/index.js
  var init_Foreign_Object = __esm({
    "output/Foreign.Object.ST/index.js"() {
      init_foreign111();
      init_Data15();
      init_foreign111();
    }
  });

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup, unsafeFreeze2, pokeMutMap, newMutMap;
  var init_Halogen_VDom3 = __esm({
    "output/Halogen.VDom.Util/index.js"() {
      init_foreign110();
      init_Foreign_Object();
      init_Unsafe();
      init_foreign110();
      unsafeLookup = unsafeGetAny;
      unsafeFreeze2 = unsafeCoerce2;
      pokeMutMap = unsafeSetAny;
      newMutMap = newImpl;
    }
  });

  // output/Web.DOM.Element/foreign.js
  var getProp, _namespaceURI, _prefix, localName, tagName;
  var init_foreign112 = __esm({
    "output/Web.DOM.Element/foreign.js"() {
      getProp = function(name15) {
        return function(doctype) {
          return doctype[name15];
        };
      };
      _namespaceURI = getProp("namespaceURI");
      _prefix = getProp("prefix");
      localName = getProp("localName");
      tagName = getProp("tagName");
    }
  });

  // output/Web.DOM.ShadowRoot/foreign.js
  var init_foreign113 = __esm({
    "output/Web.DOM.ShadowRoot/foreign.js"() {
    }
  });

  // output/Web.DOM.ShadowRoot/index.js
  var init_Web_DOM2 = __esm({
    "output/Web.DOM.ShadowRoot/index.js"() {
      init_foreign113();
      init_Data15();
      init_Unsafe();
      init_foreign113();
    }
  });

  // output/Web.DOM.Element/index.js
  var toNode2;
  var init_Web_DOM3 = __esm({
    "output/Web.DOM.Element/index.js"() {
      init_foreign112();
      init_Data4();
      init_Data46();
      init_Data14();
      init_Effect();
      init_Unsafe();
      init_Web_DOM();
      init_Web_DOM2();
      init_Web_Internal();
      init_foreign112();
      toNode2 = unsafeCoerce2;
    }
  });

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy5, haltWidget, $lazy_patchWidget, patchWidget, haltText, $lazy_patchText, patchText, haltKeyed, haltElem, eqElemSpec, $lazy_patchElem, patchElem, $lazy_patchKeyed, patchKeyed, buildWidget, buildText, buildKeyed, buildElem, buildVDom;
  var init_Halogen_VDom4 = __esm({
    "output/Halogen.VDom.DOM/index.js"() {
      init_Data38();
      init_Data();
      init_Data15();
      init_Data46();
      init_Data22();
      init_Halogen_VDom();
      init_Halogen_VDom2();
      init_Halogen_VDom3();
      init_Web_DOM3();
      $runtime_lazy5 = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      haltWidget = function(v) {
        return halt(v.widget);
      };
      $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy5("patchWidget", "Halogen.VDom.DOM", function() {
        return function(state3, vdom) {
          if (vdom instanceof Grafted) {
            return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
          }
          ;
          if (vdom instanceof Widget) {
            var res = step3(state3.widget, vdom.value0);
            var res$prime = unStep(function(v) {
              return mkStep(new Step(v.value0, {
                build: state3.build,
                widget: res
              }, $lazy_patchWidget(296), haltWidget));
            })(res);
            return res$prime;
          }
          ;
          haltWidget(state3);
          return state3.build(vdom);
        };
      });
      patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
      haltText = function(v) {
        var parent2 = parentNode(v.node);
        return removeChild(v.node, parent2);
      };
      $lazy_patchText = /* @__PURE__ */ $runtime_lazy5("patchText", "Halogen.VDom.DOM", function() {
        return function(state3, vdom) {
          if (vdom instanceof Grafted) {
            return $lazy_patchText(82)(state3, runGraft(vdom.value0));
          }
          ;
          if (vdom instanceof Text) {
            if (state3.value === vdom.value0) {
              return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
            }
            ;
            if (otherwise) {
              var nextState = {
                build: state3.build,
                node: state3.node,
                value: vdom.value0
              };
              setTextContent(vdom.value0, state3.node);
              return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
            }
            ;
          }
          ;
          haltText(state3);
          return state3.build(vdom);
        };
      });
      patchText = /* @__PURE__ */ $lazy_patchText(77);
      haltKeyed = function(v) {
        var parent2 = parentNode(v.node);
        removeChild(v.node, parent2);
        forInE(v.children, function(v1, s) {
          return halt(s);
        });
        return halt(v.attrs);
      };
      haltElem = function(v) {
        var parent2 = parentNode(v.node);
        removeChild(v.node, parent2);
        forEachE(v.children, halt);
        return halt(v.attrs);
      };
      eqElemSpec = function(ns1, v, ns2, v1) {
        var $63 = v === v1;
        if ($63) {
          if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
            return true;
          }
          ;
          if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
            return true;
          }
          ;
          return false;
        }
        ;
        return false;
      };
      $lazy_patchElem = /* @__PURE__ */ $runtime_lazy5("patchElem", "Halogen.VDom.DOM", function() {
        return function(state3, vdom) {
          if (vdom instanceof Grafted) {
            return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
          }
          ;
          if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
            var v = length(vdom.value3);
            var v1 = length(state3.children);
            if (v1 === 0 && v === 0) {
              var attrs2 = step3(state3.attrs, vdom.value2);
              var nextState = {
                build: state3.build,
                node: state3.node,
                attrs: attrs2,
                ns: vdom.value0,
                name: vdom.value1,
                children: state3.children
              };
              return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
            }
            ;
            var onThis = function(v2, s) {
              return halt(s);
            };
            var onThese = function(ix, s, v2) {
              var res = step3(s, v2);
              insertChildIx(ix, extract2(res), state3.node);
              return res;
            };
            var onThat = function(ix, v2) {
              var res = state3.build(v2);
              insertChildIx(ix, extract2(res), state3.node);
              return res;
            };
            var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
            var attrs2 = step3(state3.attrs, vdom.value2);
            var nextState = {
              build: state3.build,
              node: state3.node,
              attrs: attrs2,
              ns: vdom.value0,
              name: vdom.value1,
              children: children2
            };
            return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
          }
          ;
          haltElem(state3);
          return state3.build(vdom);
        };
      });
      patchElem = /* @__PURE__ */ $lazy_patchElem(130);
      $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy5("patchKeyed", "Halogen.VDom.DOM", function() {
        return function(state3, vdom) {
          if (vdom instanceof Grafted) {
            return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
          }
          ;
          if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
            var v = length(vdom.value3);
            if (state3.length === 0 && v === 0) {
              var attrs2 = step3(state3.attrs, vdom.value2);
              var nextState = {
                build: state3.build,
                node: state3.node,
                attrs: attrs2,
                ns: vdom.value0,
                name: vdom.value1,
                children: state3.children,
                length: 0
              };
              return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
            }
            ;
            var onThis = function(v2, s) {
              return halt(s);
            };
            var onThese = function(v2, ix$prime, s, v3) {
              var res = step3(s, v3.value1);
              insertChildIx(ix$prime, extract2(res), state3.node);
              return res;
            };
            var onThat = function(v2, ix, v3) {
              var res = state3.build(v3.value1);
              insertChildIx(ix, extract2(res), state3.node);
              return res;
            };
            var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
            var attrs2 = step3(state3.attrs, vdom.value2);
            var nextState = {
              build: state3.build,
              node: state3.node,
              attrs: attrs2,
              ns: vdom.value0,
              name: vdom.value1,
              children: children2,
              length: v
            };
            return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
          }
          ;
          haltKeyed(state3);
          return state3.build(vdom);
        };
      });
      patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
      buildWidget = function(v, build, w) {
        var res = v.buildWidget(v)(w);
        var res$prime = unStep(function(v1) {
          return mkStep(new Step(v1.value0, {
            build,
            widget: res
          }, patchWidget, haltWidget));
        })(res);
        return res$prime;
      };
      buildText = function(v, build, s) {
        var node = createTextNode(s, v.document);
        var state3 = {
          build,
          node,
          value: s
        };
        return mkStep(new Step(node, state3, patchText, haltText));
      };
      buildKeyed = function(v, build, ns1, name1, as1, ch1) {
        var el = createElement(toNullable(ns1), name1, v.document);
        var node = toNode2(el);
        var onChild = function(v1, ix, v2) {
          var res = build(v2.value1);
          insertChildIx(ix, extract2(res), node);
          return res;
        };
        var children2 = strMapWithIxE(ch1, fst, onChild);
        var attrs = v.buildAttributes(el)(as1);
        var state3 = {
          build,
          node,
          attrs,
          ns: ns1,
          name: name1,
          children: children2,
          length: length(ch1)
        };
        return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
      };
      buildElem = function(v, build, ns1, name1, as1, ch1) {
        var el = createElement(toNullable(ns1), name1, v.document);
        var node = toNode2(el);
        var onChild = function(ix, child) {
          var res = build(child);
          insertChildIx(ix, extract2(res), node);
          return res;
        };
        var children2 = forE2(ch1, onChild);
        var attrs = v.buildAttributes(el)(as1);
        var state3 = {
          build,
          node,
          attrs,
          ns: ns1,
          name: name1,
          children: children2
        };
        return mkStep(new Step(node, state3, patchElem, haltElem));
      };
      buildVDom = function(spec) {
        var $lazy_build = $runtime_lazy5("build", "Halogen.VDom.DOM", function() {
          return function(v) {
            if (v instanceof Text) {
              return buildText(spec, $lazy_build(59), v.value0);
            }
            ;
            if (v instanceof Elem) {
              return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
            }
            ;
            if (v instanceof Keyed) {
              return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
            }
            ;
            if (v instanceof Widget) {
              return buildWidget(spec, $lazy_build(62), v.value0);
            }
            ;
            if (v instanceof Grafted) {
              return $lazy_build(63)(runGraft(v.value0));
            }
            ;
            throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
          };
        });
        var build = $lazy_build(58);
        return build;
      };
    }
  });

  // output/Halogen.VDom/index.js
  var init_Halogen = __esm({
    "output/Halogen.VDom/index.js"() {
      init_Halogen_VDom4();
      init_Halogen_VDom();
      init_Halogen_VDom2();
      init_Halogen_VDom4();
      init_Halogen_VDom();
      init_Halogen_VDom2();
    }
  });

  // output/Foreign/foreign.js
  function typeOf(value12) {
    return typeof value12;
  }
  var isArray;
  var init_foreign114 = __esm({
    "output/Foreign/foreign.js"() {
      isArray = Array.isArray || function(value12) {
        return Object.prototype.toString.call(value12) === "[object Array]";
      };
    }
  });

  // output/Foreign/index.js
  var init_Foreign = __esm({
    "output/Foreign/index.js"() {
      init_foreign114();
      init_Control4();
      init_Control_Monad_Error();
      init_Control_Monad_Except();
      init_Data();
      init_Data16();
      init_Data8();
      init_Data2();
      init_Data4();
      init_Data32();
      init_Data_List4();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data14();
      init_Data_String2();
      init_Unsafe();
      init_foreign114();
    }
  });

  // output/Foreign.Object/foreign.js
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys;
  var init_foreign115 = __esm({
    "output/Foreign.Object/foreign.js"() {
      keys = Object.keys || toArrayWithKey(function(k) {
        return function() {
          return k;
        };
      });
    }
  });

  // output/Foreign.Object/index.js
  var lookup2;
  var init_Foreign2 = __esm({
    "output/Foreign.Object/index.js"() {
      init_foreign115();
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control_Monad_ST();
      init_Data38();
      init_Data8();
      init_Data26();
      init_Data40();
      init_Data2();
      init_Data_Function();
      init_Data4();
      init_Data15();
      init_Data20();
      init_Data12();
      init_Data7();
      init_Data14();
      init_Data27();
      init_Data41();
      init_Data22();
      init_Data29();
      init_Foreign_Object();
      init_Unsafe();
      init_foreign115();
      lookup2 = /* @__PURE__ */ function() {
        return runFn4(_lookup)(Nothing.value)(Just.create);
      }();
    }
  });

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy6, Created, Removed, Attribute, Property, Handler, Ref, unsafeGetProperty, setProperty, removeProperty, propToStrKey, propFromString, buildProp;
  var init_Halogen_VDom_DOM = __esm({
    "output/Halogen.VDom.DOM.Prop/index.js"() {
      init_Data4();
      init_Data15();
      init_Data46();
      init_Data22();
      init_Data3();
      init_Effect2();
      init_Foreign();
      init_Foreign2();
      init_Halogen_VDom();
      init_Halogen_VDom3();
      init_Unsafe();
      init_Web_Event();
      $runtime_lazy6 = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      Created = /* @__PURE__ */ function() {
        function Created2(value0) {
          this.value0 = value0;
        }
        ;
        Created2.create = function(value0) {
          return new Created2(value0);
        };
        return Created2;
      }();
      Removed = /* @__PURE__ */ function() {
        function Removed2(value0) {
          this.value0 = value0;
        }
        ;
        Removed2.create = function(value0) {
          return new Removed2(value0);
        };
        return Removed2;
      }();
      Attribute = /* @__PURE__ */ function() {
        function Attribute2(value0, value1, value22) {
          this.value0 = value0;
          this.value1 = value1;
          this.value2 = value22;
        }
        ;
        Attribute2.create = function(value0) {
          return function(value1) {
            return function(value22) {
              return new Attribute2(value0, value1, value22);
            };
          };
        };
        return Attribute2;
      }();
      Property = /* @__PURE__ */ function() {
        function Property2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Property2.create = function(value0) {
          return function(value1) {
            return new Property2(value0, value1);
          };
        };
        return Property2;
      }();
      Handler = /* @__PURE__ */ function() {
        function Handler2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Handler2.create = function(value0) {
          return function(value1) {
            return new Handler2(value0, value1);
          };
        };
        return Handler2;
      }();
      Ref = /* @__PURE__ */ function() {
        function Ref2(value0) {
          this.value0 = value0;
        }
        ;
        Ref2.create = function(value0) {
          return new Ref2(value0);
        };
        return Ref2;
      }();
      unsafeGetProperty = unsafeGetAny;
      setProperty = unsafeSetAny;
      removeProperty = function(key, el) {
        var v = hasAttribute(nullImpl, key, el);
        if (v) {
          return removeAttribute(nullImpl, key, el);
        }
        ;
        var v1 = typeOf(unsafeGetAny(key, el));
        if (v1 === "string") {
          return unsafeSetAny(key, "", el);
        }
        ;
        if (key === "rowSpan") {
          return unsafeSetAny(key, 1, el);
        }
        ;
        if (key === "colSpan") {
          return unsafeSetAny(key, 1, el);
        }
        ;
        return unsafeSetAny(key, jsUndefined, el);
      };
      propToStrKey = function(v) {
        if (v instanceof Attribute && v.value0 instanceof Just) {
          return "attr/" + (v.value0.value0 + (":" + v.value1));
        }
        ;
        if (v instanceof Attribute) {
          return "attr/:" + v.value1;
        }
        ;
        if (v instanceof Property) {
          return "prop/" + v.value0;
        }
        ;
        if (v instanceof Handler) {
          return "handler/" + v.value0;
        }
        ;
        if (v instanceof Ref) {
          return "ref";
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
      };
      propFromString = unsafeCoerce2;
      buildProp = function(emit) {
        return function(el) {
          var removeProp = function(prevEvents) {
            return function(v, v1) {
              if (v1 instanceof Attribute) {
                return removeAttribute(toNullable(v1.value0), v1.value1, el);
              }
              ;
              if (v1 instanceof Property) {
                return removeProperty(v1.value0, el);
              }
              ;
              if (v1 instanceof Handler) {
                var handler2 = unsafeLookup(v1.value0, prevEvents);
                return removeEventListener2(v1.value0, fst(handler2), el);
              }
              ;
              if (v1 instanceof Ref) {
                return unit;
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
            };
          };
          var mbEmit = function(v) {
            if (v instanceof Just) {
              return emit(v.value0)();
            }
            ;
            return unit;
          };
          var haltProp = function(state3) {
            var v = lookup2("ref")(state3.props);
            if (v instanceof Just && v.value0 instanceof Ref) {
              return mbEmit(v.value0.value0(new Removed(el)));
            }
            ;
            return unit;
          };
          var diffProp = function(prevEvents, events) {
            return function(v, v1, v11, v2) {
              if (v11 instanceof Attribute && v2 instanceof Attribute) {
                var $66 = v11.value2 === v2.value2;
                if ($66) {
                  return v2;
                }
                ;
                setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
                return v2;
              }
              ;
              if (v11 instanceof Property && v2 instanceof Property) {
                var v4 = refEq2(v11.value1, v2.value1);
                if (v4) {
                  return v2;
                }
                ;
                if (v2.value0 === "value") {
                  var elVal = unsafeGetProperty("value", el);
                  var $75 = refEq2(elVal, v2.value1);
                  if ($75) {
                    return v2;
                  }
                  ;
                  setProperty(v2.value0, v2.value1, el);
                  return v2;
                }
                ;
                setProperty(v2.value0, v2.value1, el);
                return v2;
              }
              ;
              if (v11 instanceof Handler && v2 instanceof Handler) {
                var handler2 = unsafeLookup(v2.value0, prevEvents);
                write(v2.value1)(snd(handler2))();
                pokeMutMap(v2.value0, handler2, events);
                return v2;
              }
              ;
              return v2;
            };
          };
          var applyProp = function(events) {
            return function(v, v1, v2) {
              if (v2 instanceof Attribute) {
                setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
                return v2;
              }
              ;
              if (v2 instanceof Property) {
                setProperty(v2.value0, v2.value1, el);
                return v2;
              }
              ;
              if (v2 instanceof Handler) {
                var v3 = unsafeGetAny(v2.value0, events);
                if (unsafeHasAny(v2.value0, events)) {
                  write(v2.value1)(snd(v3))();
                  return v2;
                }
                ;
                var ref2 = $$new(v2.value1)();
                var listener = eventListener(function(ev) {
                  return function __do2() {
                    var f$prime = read(ref2)();
                    return mbEmit(f$prime(ev));
                  };
                })();
                pokeMutMap(v2.value0, new Tuple(listener, ref2), events);
                addEventListener2(v2.value0, listener, el);
                return v2;
              }
              ;
              if (v2 instanceof Ref) {
                mbEmit(v2.value0(new Created(el)));
                return v2;
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
            };
          };
          var $lazy_patchProp = $runtime_lazy6("patchProp", "Halogen.VDom.DOM.Prop", function() {
            return function(state3, ps2) {
              var events = newMutMap();
              var onThis = removeProp(state3.events);
              var onThese = diffProp(state3.events, events);
              var onThat = applyProp(events);
              var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
              var nextState = {
                events: unsafeFreeze2(events),
                props
              };
              return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
            };
          });
          var patchProp = $lazy_patchProp(87);
          var renderProp = function(ps1) {
            var events = newMutMap();
            var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
            var state3 = {
              events: unsafeFreeze2(events),
              props: ps1$prime
            };
            return mkStep(new Step(unit, state3, patchProp, haltProp));
          };
          return renderProp;
        };
      };
    }
  });

  // output/Halogen.HTML.Core/index.js
  var HTML, toPropValue, text5, prop, isPropString, element, attr;
  var init_Halogen_HTML = __esm({
    "output/Halogen.HTML.Core/index.js"() {
      init_DOM_HTML_Indexed();
      init_DOM_HTML_Indexed2();
      init_DOM_HTML_Indexed3();
      init_DOM_HTML_Indexed4();
      init_DOM_HTML_Indexed5();
      init_DOM_HTML_Indexed6();
      init_DOM_HTML_Indexed7();
      init_DOM_HTML_Indexed8();
      init_DOM_HTML_Indexed9();
      init_DOM_HTML_Indexed10();
      init_DOM_HTML_Indexed11();
      init_DOM_HTML_Indexed12();
      init_DOM_HTML_Indexed13();
      init_DOM_HTML_Indexed14();
      init_DOM_HTML_Indexed15();
      init_Data24();
      init_Data4();
      init_Data15();
      init_Data25();
      init_Halogen_Query();
      init_Halogen();
      init_Halogen_VDom_DOM();
      init_Halogen_VDom2();
      init_Web_HTML();
      init_Halogen();
      init_Halogen_VDom_DOM();
      init_Web_HTML();
      HTML = function(x) {
        return x;
      };
      toPropValue = function(dict) {
        return dict.toPropValue;
      };
      text5 = function($29) {
        return HTML(Text.create($29));
      };
      prop = function(dictIsProp) {
        var toPropValue1 = toPropValue(dictIsProp);
        return function(v) {
          var $31 = Property.create(v);
          return function($32) {
            return $31(toPropValue1($32));
          };
        };
      };
      isPropString = {
        toPropValue: propFromString
      };
      element = function(ns) {
        return function(name15) {
          return function(props) {
            return function(children2) {
              return new Elem(ns, name15, props, children2);
            };
          };
        };
      };
      attr = function(ns) {
        return function(v) {
          return Attribute.create(ns)(v);
        };
      };
    }
  });

  // output/Control.Applicative.Free/index.js
  var identity7, Pure, Lift, Ap, mkAp, liftFreeAp, goLeft, goApply, functorFreeAp, foldFreeAp, retractFreeAp, applyFreeAp, applicativeFreeAp, foldFreeAp1, hoistFreeAp;
  var init_Control_Applicative = __esm({
    "output/Control.Applicative.Free/index.js"() {
      init_Control4();
      init_Control3();
      init_Control2();
      init_Data23();
      init_Data16();
      init_Data_List4();
      init_Data_List();
      init_Data25();
      init_Data42();
      init_Data22();
      identity7 = /* @__PURE__ */ identity(categoryFn);
      Pure = /* @__PURE__ */ function() {
        function Pure2(value0) {
          this.value0 = value0;
        }
        ;
        Pure2.create = function(value0) {
          return new Pure2(value0);
        };
        return Pure2;
      }();
      Lift = /* @__PURE__ */ function() {
        function Lift3(value0) {
          this.value0 = value0;
        }
        ;
        Lift3.create = function(value0) {
          return new Lift3(value0);
        };
        return Lift3;
      }();
      Ap = /* @__PURE__ */ function() {
        function Ap2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Ap2.create = function(value0) {
          return function(value1) {
            return new Ap2(value0, value1);
          };
        };
        return Ap2;
      }();
      mkAp = function(fba) {
        return function(fb) {
          return new Ap(fba, fb);
        };
      };
      liftFreeAp = /* @__PURE__ */ function() {
        return Lift.create;
      }();
      goLeft = function(dictApplicative) {
        var pure10 = pure(dictApplicative);
        return function(fStack) {
          return function(valStack) {
            return function(nat) {
              return function(func) {
                return function(count) {
                  if (func instanceof Pure) {
                    return new Tuple(new Cons({
                      func: pure10(func.value0),
                      count
                    }, fStack), valStack);
                  }
                  ;
                  if (func instanceof Lift) {
                    return new Tuple(new Cons({
                      func: nat(func.value0),
                      count
                    }, fStack), valStack);
                  }
                  ;
                  if (func instanceof Ap) {
                    return goLeft(dictApplicative)(fStack)(cons2(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
                };
              };
            };
          };
        };
      };
      goApply = function(dictApplicative) {
        var apply3 = apply(dictApplicative.Apply0());
        return function(fStack) {
          return function(vals) {
            return function(gVal) {
              if (fStack instanceof Nil) {
                return new Left(gVal);
              }
              ;
              if (fStack instanceof Cons) {
                var gRes = apply3(fStack.value0.func)(gVal);
                var $31 = fStack.value0.count === 1;
                if ($31) {
                  if (fStack.value1 instanceof Nil) {
                    return new Left(gRes);
                  }
                  ;
                  return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
                }
                ;
                if (vals instanceof Nil) {
                  return new Left(gRes);
                }
                ;
                if (vals instanceof Cons) {
                  return new Right(new Tuple(new Cons({
                    func: gRes,
                    count: fStack.value0.count - 1 | 0
                  }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
                }
                ;
                throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
            };
          };
        };
      };
      functorFreeAp = {
        map: function(f) {
          return function(x) {
            return mkAp(new Pure(f))(x);
          };
        }
      };
      foldFreeAp = function(dictApplicative) {
        var goApply1 = goApply(dictApplicative);
        var pure10 = pure(dictApplicative);
        var goLeft1 = goLeft(dictApplicative);
        return function(nat) {
          return function(z) {
            var go2 = function($copy_v) {
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v) {
                if (v.value1.value0 instanceof Pure) {
                  var v1 = goApply1(v.value0)(v.value1.value1)(pure10(v.value1.value0.value0));
                  if (v1 instanceof Left) {
                    $tco_done = true;
                    return v1.value0;
                  }
                  ;
                  if (v1 instanceof Right) {
                    $copy_v = v1.value0;
                    return;
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
                }
                ;
                if (v.value1.value0 instanceof Lift) {
                  var v1 = goApply1(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
                  if (v1 instanceof Left) {
                    $tco_done = true;
                    return v1.value0;
                  }
                  ;
                  if (v1 instanceof Right) {
                    $copy_v = v1.value0;
                    return;
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
                }
                ;
                if (v.value1.value0 instanceof Ap) {
                  var nextVals = new NonEmpty(v.value1.value0.value1, v.value1.value1);
                  $copy_v = goLeft1(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
                  return;
                }
                ;
                throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($copy_v);
              }
              ;
              return $tco_result;
            };
            return go2(new Tuple(Nil.value, singleton3(z)));
          };
        };
      };
      retractFreeAp = function(dictApplicative) {
        return foldFreeAp(dictApplicative)(identity7);
      };
      applyFreeAp = {
        apply: function(fba) {
          return function(fb) {
            return mkAp(fba)(fb);
          };
        },
        Functor0: function() {
          return functorFreeAp;
        }
      };
      applicativeFreeAp = /* @__PURE__ */ function() {
        return {
          pure: Pure.create,
          Apply0: function() {
            return applyFreeAp;
          }
        };
      }();
      foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
      hoistFreeAp = function(f) {
        return foldFreeAp1(function($54) {
          return liftFreeAp(f($54));
        });
      };
    }
  });

  // output/Data.CatQueue/index.js
  var CatQueue, uncons4, snoc3, $$null4, empty5;
  var init_Data50 = __esm({
    "output/Data.CatQueue/index.js"() {
      init_Control4();
      init_Control3();
      init_Control6();
      init_Data8();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data43();
      init_Data_List();
      init_Data15();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data14();
      init_Data27();
      init_Data22();
      CatQueue = /* @__PURE__ */ function() {
        function CatQueue2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        CatQueue2.create = function(value0) {
          return function(value1) {
            return new CatQueue2(value0, value1);
          };
        };
        return CatQueue2;
      }();
      uncons4 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v.value0 instanceof Nil) {
            $copy_v = new CatQueue(reverse2(v.value1), Nil.value);
            return;
          }
          ;
          if (v.value0 instanceof Cons) {
            $tco_done = true;
            return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
          }
          ;
          throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      snoc3 = function(v) {
        return function(a2) {
          return new CatQueue(v.value0, new Cons(a2, v.value1));
        };
      };
      $$null4 = function(v) {
        if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
          return true;
        }
        ;
        return false;
      };
      empty5 = /* @__PURE__ */ function() {
        return new CatQueue(Nil.value, Nil.value);
      }();
    }
  });

  // output/Data.CatList/index.js
  var CatNil, CatCons, link, foldr3, uncons5, empty6, append2, semigroupCatList, snoc4;
  var init_Data51 = __esm({
    "output/Data.CatList/index.js"() {
      init_Control4();
      init_Control3();
      init_Control6();
      init_Data50();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data_List();
      init_Data15();
      init_Data20();
      init_Data7();
      init_Data10();
      init_Data14();
      init_Data27();
      init_Data22();
      CatNil = /* @__PURE__ */ function() {
        function CatNil2() {
        }
        ;
        CatNil2.value = new CatNil2();
        return CatNil2;
      }();
      CatCons = /* @__PURE__ */ function() {
        function CatCons2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        CatCons2.create = function(value0) {
          return function(value1) {
            return new CatCons2(value0, value1);
          };
        };
        return CatCons2;
      }();
      link = function(v) {
        return function(v1) {
          if (v instanceof CatNil) {
            return v1;
          }
          ;
          if (v1 instanceof CatNil) {
            return v;
          }
          ;
          if (v instanceof CatCons) {
            return new CatCons(v.value0, snoc3(v.value1)(v1));
          }
          ;
          throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
        };
      };
      foldr3 = function(k) {
        return function(b2) {
          return function(q2) {
            var foldl2 = function($copy_v) {
              return function($copy_v1) {
                return function($copy_v2) {
                  var $tco_var_v = $copy_v;
                  var $tco_var_v1 = $copy_v1;
                  var $tco_done = false;
                  var $tco_result;
                  function $tco_loop(v, v1, v2) {
                    if (v2 instanceof Nil) {
                      $tco_done = true;
                      return v1;
                    }
                    ;
                    if (v2 instanceof Cons) {
                      $tco_var_v = v;
                      $tco_var_v1 = v(v1)(v2.value0);
                      $copy_v2 = v2.value1;
                      return;
                    }
                    ;
                    throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
                  }
                  ;
                  while (!$tco_done) {
                    $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
                  }
                  ;
                  return $tco_result;
                };
              };
            };
            var go2 = function($copy_xs) {
              return function($copy_ys) {
                var $tco_var_xs = $copy_xs;
                var $tco_done1 = false;
                var $tco_result;
                function $tco_loop(xs, ys) {
                  var v = uncons4(xs);
                  if (v instanceof Nothing) {
                    $tco_done1 = true;
                    return foldl2(function(x) {
                      return function(i2) {
                        return i2(x);
                      };
                    })(b2)(ys);
                  }
                  ;
                  if (v instanceof Just) {
                    $tco_var_xs = v.value0.value1;
                    $copy_ys = new Cons(k(v.value0.value0), ys);
                    return;
                  }
                  ;
                  throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
                }
                ;
                while (!$tco_done1) {
                  $tco_result = $tco_loop($tco_var_xs, $copy_ys);
                }
                ;
                return $tco_result;
              };
            };
            return go2(q2)(Nil.value);
          };
        };
      };
      uncons5 = function(v) {
        if (v instanceof CatNil) {
          return Nothing.value;
        }
        ;
        if (v instanceof CatCons) {
          return new Just(new Tuple(v.value0, function() {
            var $66 = $$null4(v.value1);
            if ($66) {
              return CatNil.value;
            }
            ;
            return foldr3(link)(CatNil.value)(v.value1);
          }()));
        }
        ;
        throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
      };
      empty6 = /* @__PURE__ */ function() {
        return CatNil.value;
      }();
      append2 = link;
      semigroupCatList = {
        append: append2
      };
      snoc4 = function(cat) {
        return function(a2) {
          return append2(cat)(new CatCons(a2, empty5));
        };
      };
    }
  });

  // output/Control.Monad.Free/index.js
  var $runtime_lazy7, append3, Free, Return, Bind, toView, fromView, freeMonad, freeFunctor, freeBind, freeApplicative, $lazy_freeApply, pure4, liftF, foldFree;
  var init_Control_Monad2 = __esm({
    "output/Control.Monad.Free/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Control2();
      init_Control6();
      init_Control_Monad_Rec();
      init_Data51();
      init_Data16();
      init_Data8();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data15();
      init_Data20();
      init_Data12();
      init_Data9();
      init_Data7();
      init_Data27();
      init_Unsafe();
      $runtime_lazy7 = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      append3 = /* @__PURE__ */ append(semigroupCatList);
      Free = /* @__PURE__ */ function() {
        function Free2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Free2.create = function(value0) {
          return function(value1) {
            return new Free2(value0, value1);
          };
        };
        return Free2;
      }();
      Return = /* @__PURE__ */ function() {
        function Return2(value0) {
          this.value0 = value0;
        }
        ;
        Return2.create = function(value0) {
          return new Return2(value0);
        };
        return Return2;
      }();
      Bind = /* @__PURE__ */ function() {
        function Bind2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Bind2.create = function(value0) {
          return function(value1) {
            return new Bind2(value0, value1);
          };
        };
        return Bind2;
      }();
      toView = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          var runExpF = function(v22) {
            return v22;
          };
          var concatF = function(v22) {
            return function(r) {
              return new Free(v22.value0, append3(v22.value1)(r));
            };
          };
          if (v.value0 instanceof Return) {
            var v2 = uncons5(v.value1);
            if (v2 instanceof Nothing) {
              $tco_done = true;
              return new Return(v.value0.value0);
            }
            ;
            if (v2 instanceof Just) {
              $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
          }
          ;
          if (v.value0 instanceof Bind) {
            $tco_done = true;
            return new Bind(v.value0.value0, function(a2) {
              return concatF(v.value0.value1(a2))(v.value1);
            });
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      fromView = function(f) {
        return new Free(f, empty6);
      };
      freeMonad = {
        Applicative0: function() {
          return freeApplicative;
        },
        Bind1: function() {
          return freeBind;
        }
      };
      freeFunctor = {
        map: function(k) {
          return function(f) {
            return bindFlipped(freeBind)(function() {
              var $189 = pure(freeApplicative);
              return function($190) {
                return $189(k($190));
              };
            }())(f);
          };
        }
      };
      freeBind = {
        bind: function(v) {
          return function(k) {
            return new Free(v.value0, snoc4(v.value1)(k));
          };
        },
        Apply0: function() {
          return $lazy_freeApply(0);
        }
      };
      freeApplicative = {
        pure: function($191) {
          return fromView(Return.create($191));
        },
        Apply0: function() {
          return $lazy_freeApply(0);
        }
      };
      $lazy_freeApply = /* @__PURE__ */ $runtime_lazy7("freeApply", "Control.Monad.Free", function() {
        return {
          apply: ap(freeMonad),
          Functor0: function() {
            return freeFunctor;
          }
        };
      });
      pure4 = /* @__PURE__ */ pure(freeApplicative);
      liftF = function(f) {
        return fromView(new Bind(f, function($192) {
          return pure4($192);
        }));
      };
      foldFree = function(dictMonadRec) {
        var Monad0 = dictMonadRec.Monad0();
        var map110 = map(Monad0.Bind1().Apply0().Functor0());
        var pure13 = pure(Monad0.Applicative0());
        var tailRecM4 = tailRecM(dictMonadRec);
        return function(k) {
          var go2 = function(f) {
            var v = toView(f);
            if (v instanceof Return) {
              return map110(Done.create)(pure13(v.value0));
            }
            ;
            if (v instanceof Bind) {
              return map110(function($199) {
                return Loop.create(v.value1($199));
              })(k(v.value0));
            }
            ;
            throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
          };
          return tailRecM4(go2);
        };
      };
    }
  });

  // output/Halogen.Query.ChildQuery/index.js
  var unChildQueryBox;
  var init_Halogen_Query2 = __esm({
    "output/Halogen.Query.ChildQuery/index.js"() {
      init_Unsafe();
      unChildQueryBox = unsafeCoerce2;
    }
  });

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }
  var init_foreign116 = __esm({
    "output/Unsafe.Reference/foreign.js"() {
    }
  });

  // output/Unsafe.Reference/index.js
  var unsafeRefEq;
  var init_Unsafe2 = __esm({
    "output/Unsafe.Reference/index.js"() {
      init_foreign116();
      init_Data8();
      init_foreign116();
      unsafeRefEq = reallyUnsafeRefEq;
    }
  });

  // output/Halogen.Subscription/index.js
  var $$void4, bind4, append4, traverse_2, traverse_1, unsubscribe, subscribe, notify, create3;
  var init_Halogen2 = __esm({
    "output/Halogen.Subscription/index.js"() {
      init_Control4();
      init_Control3();
      init_Control5();
      init_Data38();
      init_Data26();
      init_Data4();
      init_Data15();
      init_Data20();
      init_Data7();
      init_Data3();
      init_Effect();
      init_Effect2();
      init_Effect5();
      init_Safe();
      init_Unsafe2();
      $$void4 = /* @__PURE__ */ $$void(functorEffect);
      bind4 = /* @__PURE__ */ bind(bindEffect);
      append4 = /* @__PURE__ */ append(semigroupArray);
      traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
      traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
      unsubscribe = function(v) {
        return v;
      };
      subscribe = function(v) {
        return function(k) {
          return v(function($76) {
            return $$void4(k($76));
          });
        };
      };
      notify = function(v) {
        return function(a2) {
          return v(a2);
        };
      };
      create3 = function __do() {
        var subscribers = $$new([])();
        return {
          emitter: function(k) {
            return function __do2() {
              modify_(function(v) {
                return append4(v)([k]);
              })(subscribers)();
              return modify_(deleteBy(unsafeRefEq)(k))(subscribers);
            };
          },
          listener: function(a2) {
            return bind4(read(subscribers))(traverse_1(function(k) {
              return k(a2);
            }));
          }
        };
      };
    }
  });

  // output/Halogen.Query.HalogenM/index.js
  var identity8, SubscriptionId, ForkId, State, Subscribe, Unsubscribe, Lift2, ChildQuery2, Raise, Par, Fork, Join, Kill, GetRef, HalogenM, subscribe2, ordSubscriptionId, ordForkId, monadHalogenM, monadStateHalogenM, monadEffectHalogenM, monadAffHalogenM, functorHalogenM, bindHalogenM, applicativeHalogenM;
  var init_Halogen_Query3 = __esm({
    "output/Halogen.Query.HalogenM/index.js"() {
      init_Control4();
      init_Control_Applicative();
      init_Control5();
      init_Control2();
      init_Control_Monad_Error();
      init_Control_Monad2();
      init_Control_Monad_Reader();
      init_Control_Monad_Rec();
      init_Control_Monad_Writer();
      init_Data24();
      init_Data8();
      init_Data40();
      init_Data2();
      init_Data4();
      init_Data_Map();
      init_Data15();
      init_Data25();
      init_Data12();
      init_Data27();
      init_Data22();
      init_Data3();
      init_Effect_Aff();
      init_Effect4();
      init_Halogen_Data2();
      init_Halogen_Query2();
      init_Halogen2();
      identity8 = /* @__PURE__ */ identity(categoryFn);
      SubscriptionId = function(x) {
        return x;
      };
      ForkId = function(x) {
        return x;
      };
      State = /* @__PURE__ */ function() {
        function State2(value0) {
          this.value0 = value0;
        }
        ;
        State2.create = function(value0) {
          return new State2(value0);
        };
        return State2;
      }();
      Subscribe = /* @__PURE__ */ function() {
        function Subscribe2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Subscribe2.create = function(value0) {
          return function(value1) {
            return new Subscribe2(value0, value1);
          };
        };
        return Subscribe2;
      }();
      Unsubscribe = /* @__PURE__ */ function() {
        function Unsubscribe2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Unsubscribe2.create = function(value0) {
          return function(value1) {
            return new Unsubscribe2(value0, value1);
          };
        };
        return Unsubscribe2;
      }();
      Lift2 = /* @__PURE__ */ function() {
        function Lift3(value0) {
          this.value0 = value0;
        }
        ;
        Lift3.create = function(value0) {
          return new Lift3(value0);
        };
        return Lift3;
      }();
      ChildQuery2 = /* @__PURE__ */ function() {
        function ChildQuery3(value0) {
          this.value0 = value0;
        }
        ;
        ChildQuery3.create = function(value0) {
          return new ChildQuery3(value0);
        };
        return ChildQuery3;
      }();
      Raise = /* @__PURE__ */ function() {
        function Raise2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Raise2.create = function(value0) {
          return function(value1) {
            return new Raise2(value0, value1);
          };
        };
        return Raise2;
      }();
      Par = /* @__PURE__ */ function() {
        function Par2(value0) {
          this.value0 = value0;
        }
        ;
        Par2.create = function(value0) {
          return new Par2(value0);
        };
        return Par2;
      }();
      Fork = /* @__PURE__ */ function() {
        function Fork2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Fork2.create = function(value0) {
          return function(value1) {
            return new Fork2(value0, value1);
          };
        };
        return Fork2;
      }();
      Join = /* @__PURE__ */ function() {
        function Join2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Join2.create = function(value0) {
          return function(value1) {
            return new Join2(value0, value1);
          };
        };
        return Join2;
      }();
      Kill = /* @__PURE__ */ function() {
        function Kill2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Kill2.create = function(value0) {
          return function(value1) {
            return new Kill2(value0, value1);
          };
        };
        return Kill2;
      }();
      GetRef = /* @__PURE__ */ function() {
        function GetRef2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        GetRef2.create = function(value0) {
          return function(value1) {
            return new GetRef2(value0, value1);
          };
        };
        return GetRef2;
      }();
      HalogenM = function(x) {
        return x;
      };
      subscribe2 = function(es) {
        return liftF(new Subscribe(function(v) {
          return es;
        }, identity8));
      };
      ordSubscriptionId = ordInt;
      ordForkId = ordInt;
      monadHalogenM = freeMonad;
      monadStateHalogenM = {
        state: function($181) {
          return HalogenM(liftF(State.create($181)));
        },
        Monad0: function() {
          return monadHalogenM;
        }
      };
      monadEffectHalogenM = function(dictMonadEffect) {
        return {
          liftEffect: function() {
            var $186 = liftEffect(dictMonadEffect);
            return function($187) {
              return HalogenM(liftF(Lift2.create($186($187))));
            };
          }(),
          Monad0: function() {
            return monadHalogenM;
          }
        };
      };
      monadAffHalogenM = function(dictMonadAff) {
        var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
        return {
          liftAff: function() {
            var $188 = liftAff(dictMonadAff);
            return function($189) {
              return HalogenM(liftF(Lift2.create($188($189))));
            };
          }(),
          MonadEffect0: function() {
            return monadEffectHalogenM1;
          }
        };
      };
      functorHalogenM = freeFunctor;
      bindHalogenM = freeBind;
      applicativeHalogenM = freeApplicative;
    }
  });

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize, Finalize, Receive, Action2, Query;
  var init_Halogen_Query4 = __esm({
    "output/Halogen.Query.HalogenQ/index.js"() {
      init_Data48();
      init_Data4();
      Initialize = /* @__PURE__ */ function() {
        function Initialize2(value0) {
          this.value0 = value0;
        }
        ;
        Initialize2.create = function(value0) {
          return new Initialize2(value0);
        };
        return Initialize2;
      }();
      Finalize = /* @__PURE__ */ function() {
        function Finalize2(value0) {
          this.value0 = value0;
        }
        ;
        Finalize2.create = function(value0) {
          return new Finalize2(value0);
        };
        return Finalize2;
      }();
      Receive = /* @__PURE__ */ function() {
        function Receive2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Receive2.create = function(value0) {
          return function(value1) {
            return new Receive2(value0, value1);
          };
        };
        return Receive2;
      }();
      Action2 = /* @__PURE__ */ function() {
        function Action3(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Action3.create = function(value0) {
          return function(value1) {
            return new Action3(value0, value1);
          };
        };
        return Action3;
      }();
      Query = /* @__PURE__ */ function() {
        function Query2(value0, value1) {
          this.value0 = value0;
          this.value1 = value1;
        }
        ;
        Query2.create = function(value0) {
          return function(value1) {
            return new Query2(value0, value1);
          };
        };
        return Query2;
      }();
    }
  });

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy8, unsafeEqThunk, runThunk, buildThunk;
  var init_Halogen_VDom5 = __esm({
    "output/Halogen.VDom.Thunk/index.js"() {
      init_Data_Function();
      init_Data4();
      init_Halogen_VDom4();
      init_Halogen_VDom();
      init_Halogen_VDom3();
      init_Unsafe();
      $runtime_lazy8 = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      unsafeEqThunk = function(v, v1) {
        return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
      };
      runThunk = function(v) {
        return v.value2(v.value3);
      };
      buildThunk = function(toVDom) {
        var haltThunk = function(state3) {
          return halt(state3.vdom);
        };
        var $lazy_patchThunk = $runtime_lazy8("patchThunk", "Halogen.VDom.Thunk", function() {
          return function(state3, t2) {
            var $48 = unsafeEqThunk(state3.thunk, t2);
            if ($48) {
              return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
            }
            ;
            var vdom = step3(state3.vdom, toVDom(runThunk(t2)));
            return mkStep(new Step(extract2(vdom), {
              vdom,
              thunk: t2
            }, $lazy_patchThunk(115), haltThunk));
          };
        });
        var patchThunk = $lazy_patchThunk(108);
        var renderThunk = function(spec) {
          return function(t) {
            var vdom = buildVDom(spec)(toVDom(runThunk(t)));
            return mkStep(new Step(extract2(vdom), {
              thunk: t,
              vdom
            }, patchThunk, haltThunk));
          };
        };
        return renderThunk;
      };
    }
  });

  // output/Halogen.Component/index.js
  var voidLeft2, traverse_3, map13, pure5, ComponentSlot, ThunkSlot, unComponentSlot, unComponent, mkEval, mkComponent, defaultEval;
  var init_Halogen3 = __esm({
    "output/Halogen.Component/index.js"() {
      init_Control4();
      init_Data24();
      init_Data48();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data15();
      init_Data3();
      init_Halogen_Data2();
      init_Halogen_HTML();
      init_Halogen_Query3();
      init_Halogen_Query4();
      init_Halogen_VDom5();
      init_Unsafe();
      voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
      traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
      map13 = /* @__PURE__ */ map(functorHalogenM);
      pure5 = /* @__PURE__ */ pure(applicativeHalogenM);
      ComponentSlot = /* @__PURE__ */ function() {
        function ComponentSlot2(value0) {
          this.value0 = value0;
        }
        ;
        ComponentSlot2.create = function(value0) {
          return new ComponentSlot2(value0);
        };
        return ComponentSlot2;
      }();
      ThunkSlot = /* @__PURE__ */ function() {
        function ThunkSlot2(value0) {
          this.value0 = value0;
        }
        ;
        ThunkSlot2.create = function(value0) {
          return new ThunkSlot2(value0);
        };
        return ThunkSlot2;
      }();
      unComponentSlot = unsafeCoerce2;
      unComponent = unsafeCoerce2;
      mkEval = function(args) {
        return function(v) {
          if (v instanceof Initialize) {
            return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v.value0);
          }
          ;
          if (v instanceof Finalize) {
            return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v.value0);
          }
          ;
          if (v instanceof Receive) {
            return voidLeft2(traverse_3(args.handleAction)(args.receive(v.value0)))(v.value1);
          }
          ;
          if (v instanceof Action2) {
            return voidLeft2(args.handleAction(v.value0))(v.value1);
          }
          ;
          if (v instanceof Query) {
            return unCoyoneda(function(g) {
              var $45 = map13(maybe(v.value1(unit))(g));
              return function($46) {
                return $45(args.handleQuery($46));
              };
            })(v.value0);
          }
          ;
          throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v.constructor.name]);
        };
      };
      mkComponent = unsafeCoerce2;
      defaultEval = /* @__PURE__ */ function() {
        return {
          handleAction: $$const(pure5(unit)),
          handleQuery: $$const(pure5(Nothing.value)),
          receive: $$const(Nothing.value),
          initialize: Nothing.value,
          finalize: Nothing.value
        };
      }();
    }
  });

  // output/Halogen.HTML.Elements/index.js
  var element2, h1, h1_, h2, div3, div_;
  var init_Halogen_HTML2 = __esm({
    "output/Halogen.HTML.Elements/index.js"() {
      init_Control4();
      init_Data15();
      init_Halogen_HTML();
      init_Halogen_VDom2();
      element2 = /* @__PURE__ */ function() {
        return element(Nothing.value);
      }();
      h1 = /* @__PURE__ */ element2("h1");
      h1_ = /* @__PURE__ */ h1([]);
      h2 = /* @__PURE__ */ element2("h2");
      div3 = /* @__PURE__ */ element2("div");
      div_ = /* @__PURE__ */ div3([]);
    }
  });

  // output/Halogen.HTML.Properties/index.js
  var unwrap3, prop2, prop22, id2, classes, attr2;
  var init_Halogen_HTML3 = __esm({
    "output/Halogen.HTML.Properties/index.js"() {
      init_Control4();
      init_DOM_HTML_Indexed();
      init_DOM_HTML_Indexed2();
      init_DOM_HTML_Indexed5();
      init_DOM_HTML_Indexed6();
      init_DOM_HTML_Indexed7();
      init_DOM_HTML_Indexed9();
      init_DOM_HTML_Indexed10();
      init_DOM_HTML_Indexed11();
      init_DOM_HTML_Indexed12();
      init_DOM_HTML_Indexed13();
      init_DOM_HTML_Indexed14();
      init_Data4();
      init_Data21();
      init_Data15();
      init_Data25();
      init_Data_String3();
      init_Halogen_HTML();
      init_Halogen_Query();
      init_Halogen_VDom_DOM();
      init_Unsafe();
      init_DOM_HTML_Indexed();
      init_DOM_HTML_Indexed2();
      init_DOM_HTML_Indexed5();
      init_DOM_HTML_Indexed6();
      init_DOM_HTML_Indexed7();
      init_DOM_HTML_Indexed9();
      init_DOM_HTML_Indexed10();
      init_DOM_HTML_Indexed11();
      init_DOM_HTML_Indexed12();
      init_DOM_HTML_Indexed13();
      init_DOM_HTML_Indexed14();
      unwrap3 = /* @__PURE__ */ unwrap();
      prop2 = function(dictIsProp) {
        return prop(dictIsProp);
      };
      prop22 = /* @__PURE__ */ prop2(isPropString);
      id2 = /* @__PURE__ */ prop22("id");
      classes = /* @__PURE__ */ function() {
        var $32 = prop22("className");
        var $33 = joinWith(" ");
        var $34 = map(functorArray)(unwrap3);
        return function($35) {
          return $32($33($34($35)));
        };
      }();
      attr2 = /* @__PURE__ */ function() {
        return attr(Nothing.value);
      }();
    }
  });

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff, fork;
  var init_Control_Monad_Fork = __esm({
    "output/Control.Monad.Fork.Class/index.js"() {
      init_Control_Monad_Reader2();
      init_Control_Monad_Trans();
      init_Effect6();
      monadForkAff = {
        suspend: suspendAff,
        fork: forkAff,
        join: joinFiber,
        Monad0: function() {
          return monadAff;
        },
        Functor1: function() {
          return functorFiber;
        }
      };
      fork = function(dict) {
        return dict.fork;
      };
    }
  });

  // output/Effect.Console/foreign.js
  var warn;
  var init_foreign117 = __esm({
    "output/Effect.Console/foreign.js"() {
      warn = function(s) {
        return function() {
          console.warn(s);
        };
      };
    }
  });

  // output/Effect.Console/index.js
  var init_Effect9 = __esm({
    "output/Effect.Console/index.js"() {
      init_foreign117();
      init_Data14();
      init_foreign117();
    }
  });

  // output/Halogen.HTML/index.js
  var init_Halogen4 = __esm({
    "output/Halogen.HTML/index.js"() {
      init_Data2();
      init_Data4();
      init_Data15();
      init_Halogen3();
      init_Halogen_HTML();
      init_Halogen_HTML2();
      init_Halogen_HTML3();
      init_Halogen_VDom5();
      init_Unsafe();
      init_Halogen_HTML();
      init_Halogen_HTML2();
      init_Halogen_HTML3();
    }
  });

  // output/Halogen.Query/index.js
  var init_Halogen5 = __esm({
    "output/Halogen.Query/index.js"() {
      init_Control5();
      init_Control2();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Data4();
      init_Data15();
      init_Data3();
      init_Effect_Aff();
      init_Effect4();
      init_Halogen_Query3();
      init_Halogen_Query4();
      init_Halogen_Query();
      init_Web_HTML15();
      init_Control_Monad_State();
      init_Control_Monad_Trans();
      init_Effect_Aff();
      init_Effect4();
      init_Halogen_Query3();
      init_Halogen_Query4();
      init_Halogen_Query();
    }
  });

  // output/Halogen/index.js
  var init_Halogen6 = __esm({
    "output/Halogen/index.js"() {
      init_Data39();
      init_Halogen3();
      init_Halogen_Data2();
      init_Halogen4();
      init_Halogen_HTML();
      init_Halogen5();
      init_Data39();
      init_Halogen3();
      init_Halogen_HTML();
      init_Halogen5();
    }
  });

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX, unDriverStateX, renderStateX_, mkRenderStateX, renderStateX, mkDriverStateXRef, mapDriverState, initDriverState;
  var init_Halogen_Aff_Driver = __esm({
    "output/Halogen.Aff.Driver.State/index.js"() {
      init_Data26();
      init_Data_List();
      init_Data_Map();
      init_Data15();
      init_Effect2();
      init_Halogen_Data2();
      init_Unsafe();
      unRenderStateX = unsafeCoerce2;
      unDriverStateX = unsafeCoerce2;
      renderStateX_ = function(dictApplicative) {
        var traverse_7 = traverse_(dictApplicative)(foldableMaybe);
        return function(f) {
          return unDriverStateX(function(st) {
            return traverse_7(f)(st.rendering);
          });
        };
      };
      mkRenderStateX = unsafeCoerce2;
      renderStateX = function(dictFunctor) {
        return function(f) {
          return unDriverStateX(function(st) {
            return mkRenderStateX(f(st.rendering));
          });
        };
      };
      mkDriverStateXRef = unsafeCoerce2;
      mapDriverState = function(f) {
        return function(v) {
          return f(v);
        };
      };
      initDriverState = function(component2) {
        return function(input2) {
          return function(handler2) {
            return function(lchs) {
              return function __do2() {
                var selfRef = $$new({})();
                var childrenIn = $$new(empty3)();
                var childrenOut = $$new(empty3)();
                var handlerRef = $$new(handler2)();
                var pendingQueries = $$new(new Just(Nil.value))();
                var pendingOuts = $$new(new Just(Nil.value))();
                var pendingHandlers = $$new(Nothing.value)();
                var fresh2 = $$new(1)();
                var subscriptions = $$new(new Just(empty2))();
                var forks = $$new(empty2)();
                var ds = {
                  component: component2,
                  state: component2.initialState(input2),
                  refs: empty2,
                  children: empty3,
                  childrenIn,
                  childrenOut,
                  selfRef,
                  handlerRef,
                  pendingQueries,
                  pendingOuts,
                  pendingHandlers,
                  rendering: Nothing.value,
                  fresh: fresh2,
                  subscriptions,
                  forks,
                  lifecycleHandlers: lchs
                };
                write(ds)(selfRef)();
                return mkDriverStateXRef(selfRef);
              };
            };
          };
        };
      };
    }
  });

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_4, bindFlipped5, lookup4, bind12, liftEffect4, discard3, discard1, traverse_12, traverse_22, fork3, parSequence_2, pure6, map15, parallel2, map16, sequential2, map22, insert4, retractFreeAp2, $$delete3, unlessM2, insert1, traverse_32, lookup1, lookup22, foldFree2, alter2, unsubscribe3, queueOrRun, handleLifecycle, handleAff, fresh, evalQ, evalM, evalF;
  var init_Halogen_Aff_Driver2 = __esm({
    "output/Halogen.Aff.Driver.Eval/index.js"() {
      init_Control4();
      init_Control_Applicative();
      init_Control5();
      init_Control6();
      init_Control_Monad_Fork();
      init_Control_Monad2();
      init_Control13();
      init_Control_Parallel();
      init_Data();
      init_Data48();
      init_Data16();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data_List();
      init_Data_Map();
      init_Data15();
      init_Data12();
      init_Data3();
      init_Effect();
      init_Effect6();
      init_Effect4();
      init_Effect3();
      init_Effect2();
      init_Halogen_Aff_Driver();
      init_Halogen_Query2();
      init_Halogen_Query3();
      init_Halogen_Query4();
      init_Halogen_Query();
      init_Halogen2();
      init_Unsafe2();
      traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
      bindFlipped5 = /* @__PURE__ */ bindFlipped(bindMaybe);
      lookup4 = /* @__PURE__ */ lookup(ordSubscriptionId);
      bind12 = /* @__PURE__ */ bind(bindAff);
      liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
      discard3 = /* @__PURE__ */ discard(discardUnit);
      discard1 = /* @__PURE__ */ discard3(bindAff);
      traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
      traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
      fork3 = /* @__PURE__ */ fork(monadForkAff);
      parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
      pure6 = /* @__PURE__ */ pure(applicativeAff);
      map15 = /* @__PURE__ */ map(functorCoyoneda);
      parallel2 = /* @__PURE__ */ parallel(parallelAff);
      map16 = /* @__PURE__ */ map(functorAff);
      sequential2 = /* @__PURE__ */ sequential(parallelAff);
      map22 = /* @__PURE__ */ map(functorMaybe);
      insert4 = /* @__PURE__ */ insert2(ordSubscriptionId);
      retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
      $$delete3 = /* @__PURE__ */ $$delete2(ordForkId);
      unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
      insert1 = /* @__PURE__ */ insert2(ordForkId);
      traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
      lookup1 = /* @__PURE__ */ lookup(ordForkId);
      lookup22 = /* @__PURE__ */ lookup(ordString);
      foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
      alter2 = /* @__PURE__ */ alter(ordString);
      unsubscribe3 = function(sid) {
        return function(ref2) {
          return function __do2() {
            var v = read(ref2)();
            var subs = read(v.subscriptions)();
            return traverse_4(unsubscribe)(bindFlipped5(lookup4(sid))(subs))();
          };
        };
      };
      queueOrRun = function(ref2) {
        return function(au) {
          return bind12(liftEffect4(read(ref2)))(function(v) {
            if (v instanceof Nothing) {
              return au;
            }
            ;
            if (v instanceof Just) {
              return liftEffect4(write(new Just(new Cons(au, v.value0)))(ref2));
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v.constructor.name]);
          });
        };
      };
      handleLifecycle = function(lchs) {
        return function(f) {
          return discard1(liftEffect4(write({
            initializers: Nil.value,
            finalizers: Nil.value
          })(lchs)))(function() {
            return bind12(liftEffect4(f))(function(result) {
              return bind12(liftEffect4(read(lchs)))(function(v) {
                return discard1(traverse_22(fork3)(v.finalizers))(function() {
                  return discard1(parSequence_2(v.initializers))(function() {
                    return pure6(result);
                  });
                });
              });
            });
          });
        };
      };
      handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
      fresh = function(f) {
        return function(ref2) {
          return bind12(liftEffect4(read(ref2)))(function(v) {
            return liftEffect4(modify$prime(function(i2) {
              return {
                state: i2 + 1 | 0,
                value: f(i2)
              };
            })(v.fresh));
          });
        };
      };
      evalQ = function(render2) {
        return function(ref2) {
          return function(q2) {
            return bind12(liftEffect4(read(ref2)))(function(v) {
              return evalM(render2)(ref2)(v["component"]["eval"](new Query(map15(Just.create)(liftCoyoneda(q2)), $$const(Nothing.value))));
            });
          };
        };
      };
      evalM = function(render2) {
        return function(initRef) {
          return function(v) {
            var evalChildQuery = function(ref2) {
              return function(cqb) {
                return bind12(liftEffect4(read(ref2)))(function(v1) {
                  return unChildQueryBox(function(v2) {
                    var evalChild = function(v3) {
                      return parallel2(bind12(liftEffect4(read(v3)))(function(dsx) {
                        return unDriverStateX(function(ds) {
                          return evalQ(render2)(ds.selfRef)(v2.value1);
                        })(dsx);
                      }));
                    };
                    return map16(v2.value2)(sequential2(v2.value0(applicativeParAff)(evalChild)(v1.children)));
                  })(cqb);
                });
              };
            };
            var go2 = function(ref2) {
              return function(v1) {
                if (v1 instanceof State) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    var v3 = v1.value0(v2.state);
                    if (unsafeRefEq(v2.state)(v3.value1)) {
                      return pure6(v3.value0);
                    }
                    ;
                    if (otherwise) {
                      return discard1(liftEffect4(write({
                        component: v2.component,
                        refs: v2.refs,
                        children: v2.children,
                        childrenIn: v2.childrenIn,
                        childrenOut: v2.childrenOut,
                        selfRef: v2.selfRef,
                        handlerRef: v2.handlerRef,
                        pendingQueries: v2.pendingQueries,
                        pendingOuts: v2.pendingOuts,
                        pendingHandlers: v2.pendingHandlers,
                        rendering: v2.rendering,
                        fresh: v2.fresh,
                        subscriptions: v2.subscriptions,
                        forks: v2.forks,
                        lifecycleHandlers: v2.lifecycleHandlers,
                        state: v3.value1
                      })(ref2)))(function() {
                        return discard1(handleLifecycle(v2.lifecycleHandlers)(render2(v2.lifecycleHandlers)(ref2)))(function() {
                          return pure6(v3.value0);
                        });
                      });
                    }
                    ;
                    throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
                  });
                }
                ;
                if (v1 instanceof Subscribe) {
                  return bind12(fresh(SubscriptionId)(ref2))(function(sid) {
                    return bind12(liftEffect4(subscribe(v1.value0(sid))(function(act) {
                      return handleAff(evalF(render2)(ref2)(new Action(act)));
                    })))(function(finalize) {
                      return bind12(liftEffect4(read(ref2)))(function(v2) {
                        return discard1(liftEffect4(modify_(map22(insert4(sid)(finalize)))(v2.subscriptions)))(function() {
                          return pure6(v1.value1(sid));
                        });
                      });
                    });
                  });
                }
                ;
                if (v1 instanceof Unsubscribe) {
                  return discard1(liftEffect4(unsubscribe3(v1.value0)(ref2)))(function() {
                    return pure6(v1.value1);
                  });
                }
                ;
                if (v1 instanceof Lift2) {
                  return v1.value0;
                }
                ;
                if (v1 instanceof ChildQuery2) {
                  return evalChildQuery(ref2)(v1.value0);
                }
                ;
                if (v1 instanceof Raise) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    return bind12(liftEffect4(read(v2.handlerRef)))(function(handler2) {
                      return discard1(queueOrRun(v2.pendingOuts)(handler2(v1.value0)))(function() {
                        return pure6(v1.value1);
                      });
                    });
                  });
                }
                ;
                if (v1 instanceof Par) {
                  return sequential2(retractFreeAp2(hoistFreeAp(function() {
                    var $118 = evalM(render2)(ref2);
                    return function($119) {
                      return parallel2($118($119));
                    };
                  }())(v1.value0)));
                }
                ;
                if (v1 instanceof Fork) {
                  return bind12(fresh(ForkId)(ref2))(function(fid) {
                    return bind12(liftEffect4(read(ref2)))(function(v2) {
                      return bind12(liftEffect4($$new(false)))(function(doneRef) {
                        return bind12(fork3($$finally(liftEffect4(function __do2() {
                          modify_($$delete3(fid))(v2.forks)();
                          return write(true)(doneRef)();
                        }))(evalM(render2)(ref2)(v1.value0))))(function(fiber) {
                          return discard1(liftEffect4(unlessM2(read(doneRef))(modify_(insert1(fid)(fiber))(v2.forks))))(function() {
                            return pure6(v1.value1(fid));
                          });
                        });
                      });
                    });
                  });
                }
                ;
                if (v1 instanceof Join) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                      return discard1(traverse_32(joinFiber)(lookup1(v1.value0)(forkMap)))(function() {
                        return pure6(v1.value1);
                      });
                    });
                  });
                }
                ;
                if (v1 instanceof Kill) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                      return discard1(traverse_32(killFiber(error("Cancelled")))(lookup1(v1.value0)(forkMap)))(function() {
                        return pure6(v1.value1);
                      });
                    });
                  });
                }
                ;
                if (v1 instanceof GetRef) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    return pure6(v1.value1(lookup22(v1.value0)(v2.refs)));
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
              };
            };
            return foldFree2(go2(initRef))(v);
          };
        };
      };
      evalF = function(render2) {
        return function(ref2) {
          return function(v) {
            if (v instanceof RefUpdate) {
              return liftEffect4(flip(modify_)(ref2)(mapDriverState(function(st) {
                return {
                  component: st.component,
                  state: st.state,
                  children: st.children,
                  childrenIn: st.childrenIn,
                  childrenOut: st.childrenOut,
                  selfRef: st.selfRef,
                  handlerRef: st.handlerRef,
                  pendingQueries: st.pendingQueries,
                  pendingOuts: st.pendingOuts,
                  pendingHandlers: st.pendingHandlers,
                  rendering: st.rendering,
                  fresh: st.fresh,
                  subscriptions: st.subscriptions,
                  forks: st.forks,
                  lifecycleHandlers: st.lifecycleHandlers,
                  refs: alter2($$const(v.value1))(v.value0)(st.refs)
                };
              })));
            }
            ;
            if (v instanceof Action) {
              return bind12(liftEffect4(read(ref2)))(function(v1) {
                return evalM(render2)(ref2)(v1["component"]["eval"](new Action2(v.value0, unit)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
          };
        };
      };
    }
  });

  // output/Halogen.Aff.Driver/index.js
  var bind5, discard4, for_2, traverse_5, fork4, bindFlipped6, traverse_13, traverse_23, traverse_33, discard22, parSequence_3, liftEffect5, pure7, map17, pure12, when2, renderStateX2, $$void5, foreachSlot2, renderStateX_2, tailRecM3, voidLeft3, bind13, liftEffect1, newLifecycleHandlers, handlePending, cleanupSubscriptionsAndForks, runUI;
  var init_Halogen_Aff2 = __esm({
    "output/Halogen.Aff.Driver/index.js"() {
      init_Control4();
      init_Control5();
      init_Control_Monad_Fork();
      init_Control_Monad_Rec();
      init_Control13();
      init_Data26();
      init_Data2();
      init_Data4();
      init_Data43();
      init_Data_List();
      init_Data_Map();
      init_Data15();
      init_Data3();
      init_Effect();
      init_Effect6();
      init_Effect4();
      init_Effect9();
      init_Effect3();
      init_Effect2();
      init_Halogen6();
      init_Halogen_Aff_Driver2();
      init_Halogen_Aff_Driver();
      init_Halogen3();
      init_Halogen_Data2();
      init_Halogen_Query4();
      init_Halogen_Query();
      init_Halogen2();
      bind5 = /* @__PURE__ */ bind(bindEffect);
      discard4 = /* @__PURE__ */ discard(discardUnit);
      for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
      traverse_5 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
      fork4 = /* @__PURE__ */ fork(monadForkAff);
      bindFlipped6 = /* @__PURE__ */ bindFlipped(bindEffect);
      traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
      traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
      traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
      discard22 = /* @__PURE__ */ discard4(bindAff);
      parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
      liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
      pure7 = /* @__PURE__ */ pure(applicativeEffect);
      map17 = /* @__PURE__ */ map(functorEffect);
      pure12 = /* @__PURE__ */ pure(applicativeAff);
      when2 = /* @__PURE__ */ when(applicativeEffect);
      renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
      $$void5 = /* @__PURE__ */ $$void(functorAff);
      foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
      renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
      tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
      voidLeft3 = /* @__PURE__ */ voidLeft(functorEffect);
      bind13 = /* @__PURE__ */ bind(bindAff);
      liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
      newLifecycleHandlers = /* @__PURE__ */ function() {
        return $$new({
          initializers: Nil.value,
          finalizers: Nil.value
        });
      }();
      handlePending = function(ref2) {
        return function __do2() {
          var queue = read(ref2)();
          write(Nothing.value)(ref2)();
          return for_2(queue)(function() {
            var $58 = traverse_5(fork4);
            return function($59) {
              return handleAff($58(reverse2($59)));
            };
          }())();
        };
      };
      cleanupSubscriptionsAndForks = function(v) {
        return function __do2() {
          bindFlipped6(traverse_23(traverse_33(unsubscribe)))(read(v.subscriptions))();
          write(Nothing.value)(v.subscriptions)();
          bindFlipped6(traverse_33(function() {
            var $60 = killFiber(error("finalized"));
            return function($61) {
              return handleAff($60($61));
            };
          }()))(read(v.forks))();
          return write(empty2)(v.forks)();
        };
      };
      runUI = function(renderSpec2) {
        return function(component2) {
          return function(i2) {
            var squashChildInitializers = function(lchs) {
              return function(preInits) {
                return unDriverStateX(function(st) {
                  var parentInitializer = evalM(render2)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
                  return modify_(function(handlers) {
                    return {
                      initializers: new Cons(discard22(parSequence_3(reverse2(handlers.initializers)))(function() {
                        return discard22(parentInitializer)(function() {
                          return liftEffect5(function __do2() {
                            handlePending(st.pendingQueries)();
                            return handlePending(st.pendingOuts)();
                          });
                        });
                      }), preInits),
                      finalizers: handlers.finalizers
                    };
                  })(lchs);
                });
              };
            };
            var runComponent = function(lchs) {
              return function(handler2) {
                return function(j) {
                  return unComponent(function(c) {
                    return function __do2() {
                      var lchs$prime = newLifecycleHandlers();
                      var $$var2 = initDriverState(c)(j)(handler2)(lchs$prime)();
                      var pre2 = read(lchs)();
                      write({
                        initializers: Nil.value,
                        finalizers: pre2.finalizers
                      })(lchs)();
                      bindFlipped6(unDriverStateX(function() {
                        var $62 = render2(lchs);
                        return function($63) {
                          return $62(function(v) {
                            return v.selfRef;
                          }($63));
                        };
                      }()))(read($$var2))();
                      bindFlipped6(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                      return $$var2;
                    };
                  });
                };
              };
            };
            var renderChild = function(lchs) {
              return function(handler2) {
                return function(childrenInRef) {
                  return function(childrenOutRef) {
                    return unComponentSlot(function(slot) {
                      return function __do2() {
                        var childrenIn = map17(slot.pop)(read(childrenInRef))();
                        var $$var2 = function() {
                          if (childrenIn instanceof Just) {
                            write(childrenIn.value0.value1)(childrenInRef)();
                            var dsx = read(childrenIn.value0.value0)();
                            unDriverStateX(function(st) {
                              return function __do3() {
                                flip(write)(st.handlerRef)(function() {
                                  var $64 = maybe(pure12(unit))(handler2);
                                  return function($65) {
                                    return $64(slot.output($65));
                                  };
                                }())();
                                return handleAff(evalM(render2)(st.selfRef)(st["component"]["eval"](new Receive(slot.input, unit))))();
                              };
                            })(dsx)();
                            return childrenIn.value0.value0;
                          }
                          ;
                          if (childrenIn instanceof Nothing) {
                            return runComponent(lchs)(function() {
                              var $66 = maybe(pure12(unit))(handler2);
                              return function($67) {
                                return $66(slot.output($67));
                              };
                            }())(slot.input)(slot.component)();
                          }
                          ;
                          throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                        }();
                        var isDuplicate = map17(function($68) {
                          return isJust(slot.get($68));
                        })(read(childrenOutRef))();
                        when2(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                        modify_(slot.set($$var2))(childrenOutRef)();
                        return bind5(read($$var2))(renderStateX2(function(v) {
                          if (v instanceof Nothing) {
                            return $$throw("Halogen internal error: child was not initialized in renderChild");
                          }
                          ;
                          if (v instanceof Just) {
                            return pure7(renderSpec2.renderChild(v.value0));
                          }
                          ;
                          throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v.constructor.name]);
                        }))();
                      };
                    });
                  };
                };
              };
            };
            var render2 = function(lchs) {
              return function($$var2) {
                return function __do2() {
                  var v = read($$var2)();
                  var shouldProcessHandlers = map17(isNothing)(read(v.pendingHandlers))();
                  when2(shouldProcessHandlers)(write(new Just(Nil.value))(v.pendingHandlers))();
                  write(empty3)(v.childrenOut)();
                  write(v.children)(v.childrenIn)();
                  var handler2 = function() {
                    var $69 = queueOrRun(v.pendingHandlers);
                    var $70 = evalF(render2)(v.selfRef);
                    return function($71) {
                      return $69($$void5($70($71)));
                    };
                  }();
                  var childHandler = function() {
                    var $72 = queueOrRun(v.pendingQueries);
                    return function($73) {
                      return $72(handler2(Action.create($73)));
                    };
                  }();
                  var rendering = renderSpec2.render(function($74) {
                    return handleAff(handler2($74));
                  })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
                  var children2 = read(v.childrenOut)();
                  var childrenIn = read(v.childrenIn)();
                  foreachSlot2(childrenIn)(function(v1) {
                    return function __do3() {
                      var childDS = read(v1)();
                      renderStateX_2(renderSpec2.removeChild)(childDS)();
                      return finalize(lchs)(childDS)();
                    };
                  })();
                  flip(modify_)(v.selfRef)(mapDriverState(function(ds$prime) {
                    return {
                      component: ds$prime.component,
                      state: ds$prime.state,
                      refs: ds$prime.refs,
                      childrenIn: ds$prime.childrenIn,
                      childrenOut: ds$prime.childrenOut,
                      selfRef: ds$prime.selfRef,
                      handlerRef: ds$prime.handlerRef,
                      pendingQueries: ds$prime.pendingQueries,
                      pendingOuts: ds$prime.pendingOuts,
                      pendingHandlers: ds$prime.pendingHandlers,
                      fresh: ds$prime.fresh,
                      subscriptions: ds$prime.subscriptions,
                      forks: ds$prime.forks,
                      lifecycleHandlers: ds$prime.lifecycleHandlers,
                      rendering: new Just(rendering),
                      children: children2
                    };
                  }))();
                  return when2(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                    return function __do3() {
                      var handlers = read(v.pendingHandlers)();
                      write(new Just(Nil.value))(v.pendingHandlers)();
                      traverse_23(function() {
                        var $75 = traverse_5(fork4);
                        return function($76) {
                          return handleAff($75(reverse2($76)));
                        };
                      }())(handlers)();
                      var mmore = read(v.pendingHandlers)();
                      var $51 = maybe(false)($$null)(mmore);
                      if ($51) {
                        return voidLeft3(write(Nothing.value)(v.pendingHandlers))(new Done(unit))();
                      }
                      ;
                      return new Loop(unit);
                    };
                  }))();
                };
              };
            };
            var finalize = function(lchs) {
              return unDriverStateX(function(st) {
                return function __do2() {
                  cleanupSubscriptionsAndForks(st)();
                  var f = evalM(render2)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
                  modify_(function(handlers) {
                    return {
                      initializers: handlers.initializers,
                      finalizers: new Cons(f, handlers.finalizers)
                    };
                  })(lchs)();
                  return foreachSlot2(st.children)(function(v) {
                    return function __do3() {
                      var dsx = read(v)();
                      return finalize(lchs)(dsx)();
                    };
                  })();
                };
              });
            };
            var evalDriver = function(disposed) {
              return function(ref2) {
                return function(q2) {
                  return bind13(liftEffect5(read(disposed)))(function(v) {
                    if (v) {
                      return pure12(Nothing.value);
                    }
                    ;
                    return evalQ(render2)(ref2)(q2);
                  });
                };
              };
            };
            var dispose = function(disposed) {
              return function(lchs) {
                return function(dsx) {
                  return handleLifecycle(lchs)(function __do2() {
                    var v = read(disposed)();
                    if (v) {
                      return unit;
                    }
                    ;
                    write(true)(disposed)();
                    finalize(lchs)(dsx)();
                    return unDriverStateX(function(v1) {
                      return function __do3() {
                        var v2 = liftEffect1(read(v1.selfRef))();
                        return for_2(v2.rendering)(renderSpec2.dispose)();
                      };
                    })(dsx)();
                  });
                };
              };
            };
            return bind13(liftEffect5(newLifecycleHandlers))(function(lchs) {
              return bind13(liftEffect5($$new(false)))(function(disposed) {
                return handleLifecycle(lchs)(function __do2() {
                  var sio = create3();
                  var dsx = bindFlipped6(read)(runComponent(lchs)(function() {
                    var $77 = notify(sio.listener);
                    return function($78) {
                      return liftEffect5($77($78));
                    };
                  }())(i2)(component2))();
                  return unDriverStateX(function(st) {
                    return pure7({
                      query: evalDriver(disposed)(st.selfRef),
                      messages: sio.emitter,
                      dispose: dispose(disposed)(lchs)(dsx)
                    });
                  })(dsx)();
                });
              });
            });
          };
        };
      };
    }
  });

  // output/Web.DOM.Node/foreign.js
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }
  var getEffProp2, baseURI, _ownerDocument, _parentNode, _parentElement, childNodes, _firstChild, _lastChild, _previousSibling, _nextSibling, _nodeValue, textContent;
  var init_foreign118 = __esm({
    "output/Web.DOM.Node/foreign.js"() {
      getEffProp2 = function(name15) {
        return function(node) {
          return function() {
            return node[name15];
          };
        };
      };
      baseURI = getEffProp2("baseURI");
      _ownerDocument = getEffProp2("ownerDocument");
      _parentNode = getEffProp2("parentNode");
      _parentElement = getEffProp2("parentElement");
      childNodes = getEffProp2("childNodes");
      _firstChild = getEffProp2("firstChild");
      _lastChild = getEffProp2("lastChild");
      _previousSibling = getEffProp2("previousSibling");
      _nextSibling = getEffProp2("nextSibling");
      _nodeValue = getEffProp2("nodeValue");
      textContent = getEffProp2("textContent");
    }
  });

  // output/Web.DOM.NodeType/index.js
  var init_Web_DOM4 = __esm({
    "output/Web.DOM.NodeType/index.js"() {
      init_Data30();
      init_Data15();
      init_Data12();
    }
  });

  // output/Web.DOM.Node/index.js
  var map18, parentNode2, nextSibling;
  var init_Web_DOM5 = __esm({
    "output/Web.DOM.Node/index.js"() {
      init_foreign118();
      init_Data30();
      init_Data4();
      init_Data15();
      init_Data46();
      init_Effect();
      init_Unsafe();
      init_Web_DOM4();
      init_Web_Internal();
      init_foreign118();
      map18 = /* @__PURE__ */ map(functorEffect);
      parentNode2 = /* @__PURE__ */ function() {
        var $6 = map18(toMaybe);
        return function($7) {
          return $6(_parentNode($7));
        };
      }();
      nextSibling = /* @__PURE__ */ function() {
        var $15 = map18(toMaybe);
        return function($16) {
          return $15(_nextSibling($16));
        };
      }();
    }
  });

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy9, $$void6, pure8, traverse_6, unwrap4, when3, not2, identity9, bind14, liftEffect6, map19, bindFlipped7, substInParent, removeChild3, mkSpec, renderSpec, runUI2;
  var init_Halogen_VDom6 = __esm({
    "output/Halogen.VDom.Driver/index.js"() {
      init_Control4();
      init_Control5();
      init_Control2();
      init_Data26();
      init_Data4();
      init_Data21();
      init_Data15();
      init_Data25();
      init_Data3();
      init_Effect();
      init_Effect6();
      init_Effect4();
      init_Effect2();
      init_Halogen_Aff2();
      init_Halogen_Aff_Driver();
      init_Halogen3();
      init_Halogen_VDom4();
      init_Halogen_VDom_DOM();
      init_Halogen_VDom();
      init_Halogen_VDom5();
      init_Unsafe2();
      init_Web_DOM5();
      init_Web();
      init_Web_HTML14();
      init_Web_HTML15();
      init_Web_HTML69();
      $runtime_lazy9 = function(name15, moduleName, init3) {
        var state3 = 0;
        var val;
        return function(lineNumber) {
          if (state3 === 2)
            return val;
          if (state3 === 1)
            throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
          state3 = 1;
          val = init3();
          state3 = 2;
          return val;
        };
      };
      $$void6 = /* @__PURE__ */ $$void(functorEffect);
      pure8 = /* @__PURE__ */ pure(applicativeEffect);
      traverse_6 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
      unwrap4 = /* @__PURE__ */ unwrap();
      when3 = /* @__PURE__ */ when(applicativeEffect);
      not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
      identity9 = /* @__PURE__ */ identity(categoryFn);
      bind14 = /* @__PURE__ */ bind(bindAff);
      liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
      map19 = /* @__PURE__ */ map(functorEffect);
      bindFlipped7 = /* @__PURE__ */ bindFlipped(bindEffect);
      substInParent = function(v) {
        return function(v1) {
          return function(v2) {
            if (v1 instanceof Just && v2 instanceof Just) {
              return $$void6(insertBefore(v)(v1.value0)(v2.value0));
            }
            ;
            if (v1 instanceof Nothing && v2 instanceof Just) {
              return $$void6(appendChild(v)(v2.value0));
            }
            ;
            return pure8(unit);
          };
        };
      };
      removeChild3 = function(v) {
        return function __do2() {
          var npn = parentNode2(v.node)();
          return traverse_6(function(pn) {
            return removeChild2(v.node)(pn);
          })(npn)();
        };
      };
      mkSpec = function(handler2) {
        return function(renderChildRef) {
          return function(document2) {
            var getNode = unRenderStateX(function(v) {
              return v.node;
            });
            var done = function(st) {
              if (st instanceof Just) {
                return halt(st.value0);
              }
              ;
              return unit;
            };
            var buildWidget2 = function(spec) {
              var buildThunk2 = buildThunk(unwrap4)(spec);
              var $lazy_patch = $runtime_lazy9("patch", "Halogen.VDom.Driver", function() {
                return function(st, slot) {
                  if (st instanceof Just) {
                    if (slot instanceof ComponentSlot) {
                      halt(st.value0);
                      return $lazy_renderComponentSlot(100)(slot.value0);
                    }
                    ;
                    if (slot instanceof ThunkSlot) {
                      var step$prime = step3(st.value0, slot.value0);
                      return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                    }
                    ;
                    throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot.constructor.name]);
                  }
                  ;
                  return $lazy_render(104)(slot);
                };
              });
              var $lazy_render = $runtime_lazy9("render", "Halogen.VDom.Driver", function() {
                return function(slot) {
                  if (slot instanceof ComponentSlot) {
                    return $lazy_renderComponentSlot(86)(slot.value0);
                  }
                  ;
                  if (slot instanceof ThunkSlot) {
                    var step4 = buildThunk2(slot.value0);
                    return mkStep(new Step(extract2(step4), new Just(step4), $lazy_patch(89), done));
                  }
                  ;
                  throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot.constructor.name]);
                };
              });
              var $lazy_renderComponentSlot = $runtime_lazy9("renderComponentSlot", "Halogen.VDom.Driver", function() {
                return function(cs) {
                  var renderChild = read(renderChildRef)();
                  var rsx = renderChild(cs)();
                  var node = getNode(rsx);
                  return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
                };
              });
              var patch = $lazy_patch(91);
              var render2 = $lazy_render(82);
              var renderComponentSlot = $lazy_renderComponentSlot(109);
              return render2;
            };
            var buildAttributes = buildProp(handler2);
            return {
              buildWidget: buildWidget2,
              buildAttributes,
              document: document2
            };
          };
        };
      };
      renderSpec = function(document2) {
        return function(container) {
          var render2 = function(handler2) {
            return function(child) {
              return function(v) {
                return function(v1) {
                  if (v1 instanceof Nothing) {
                    return function __do2() {
                      var renderChildRef = $$new(child)();
                      var spec = mkSpec(handler2)(renderChildRef)(document2);
                      var machine = buildVDom(spec)(v);
                      var node = extract2(machine);
                      $$void6(appendChild(node)(toNode(container)))();
                      return {
                        machine,
                        node,
                        renderChildRef
                      };
                    };
                  }
                  ;
                  if (v1 instanceof Just) {
                    return function __do2() {
                      write(child)(v1.value0.renderChildRef)();
                      var parent2 = parentNode2(v1.value0.node)();
                      var nextSib = nextSibling(v1.value0.node)();
                      var machine$prime = step3(v1.value0.machine, v);
                      var newNode = extract2(machine$prime);
                      when3(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                      return {
                        machine: machine$prime,
                        node: newNode,
                        renderChildRef: v1.value0.renderChildRef
                      };
                    };
                  }
                  ;
                  throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
                };
              };
            };
          };
          return {
            render: render2,
            renderChild: identity9,
            removeChild: removeChild3,
            dispose: removeChild3
          };
        };
      };
      runUI2 = function(component2) {
        return function(i2) {
          return function(element3) {
            return bind14(liftEffect6(map19(toDocument)(bindFlipped7(document)(windowImpl))))(function(document2) {
              return runUI(renderSpec(document2)(element3))(component2)(i2);
            });
          };
        };
      };
    }
  });

  // output/Main/index.js
  var Main_exports = {};
  __export(Main_exports, {
    Init: () => Init,
    Tick: () => Tick,
    attr_: () => attr_,
    classes_: () => classes_,
    component: () => component,
    handleAction: () => handleAction,
    main: () => main2,
    noTimeHtml: () => noTimeHtml,
    okTimeHtml: () => okTimeHtml,
    render: () => render,
    renderTime: () => renderTime,
    timer: () => timer
  });
  var forever2, discard5, liftEffect7, bind6, bindFlipped8, pure9, adjust2, modify_3, map20, Init, Tick, timer, renderTime, okTimeHtml, noTimeHtml, render, handleAction, component, component1, main2, classes_, attr_;
  var init_Main = __esm({
    "output/Main/index.js"() {
      init_Control4();
      init_Control5();
      init_Control_Monad_Rec();
      init_Control_Monad_State();
      init_Data35();
      init_Data26();
      init_Data_Formatter2();
      init_Data4();
      init_Data32();
      init_Data43();
      init_Data15();
      init_Data_Time();
      init_Data3();
      init_Effect6();
      init_Effect_Aff();
      init_Effect4();
      init_Effect7();
      init_Halogen_Aff();
      init_Halogen3();
      init_Halogen_HTML();
      init_Halogen_HTML2();
      init_Halogen_HTML3();
      init_Halogen_Query3();
      init_Halogen2();
      init_Halogen_VDom6();
      init_Web_HTML();
      forever2 = /* @__PURE__ */ forever(monadRecAff);
      discard5 = /* @__PURE__ */ discard(discardUnit)(bindAff);
      liftEffect7 = /* @__PURE__ */ liftEffect(monadEffectAff);
      bind6 = /* @__PURE__ */ bind(bindHalogenM);
      bindFlipped8 = /* @__PURE__ */ bindFlipped(bindHalogenM);
      pure9 = /* @__PURE__ */ pure(applicativeHalogenM);
      adjust2 = /* @__PURE__ */ adjust(durationMilliseconds);
      modify_3 = /* @__PURE__ */ modify_2(monadStateHalogenM);
      map20 = /* @__PURE__ */ map(functorArray);
      Init = /* @__PURE__ */ function() {
        function Init2() {
        }
        ;
        Init2.value = new Init2();
        return Init2;
      }();
      Tick = /* @__PURE__ */ function() {
        function Tick2() {
        }
        ;
        Tick2.value = new Tick2();
        return Tick2;
      }();
      timer = function(dictMonadAff) {
        var MonadEffect0 = dictMonadAff.MonadEffect0();
        var Monad0 = MonadEffect0.Monad0();
        var bind15 = bind(Monad0.Bind1());
        var liftEffect12 = liftEffect(MonadEffect0);
        var liftAff2 = liftAff(dictMonadAff);
        var pure13 = pure(Monad0.Applicative0());
        return function(val) {
          return bind15(liftEffect12(create3))(function(v) {
            return bind15(liftAff2(forkAff(forever2(discard5(delay(800))(function() {
              return liftEffect7(notify(v.listener)(val));
            })))))(function() {
              return pure13(v.emitter);
            });
          });
        };
      };
      renderTime = /* @__PURE__ */ function() {
        return format(fromFoldable(foldableArray)([Hours24.value, new Placeholder(":"), MinutesTwoDigits.value, new Placeholder(":"), SecondsTwoDigits.value]));
      }();
      okTimeHtml = function(st) {
        return div_([h1_([text5("Current Moscow time (UTC+3:00):")]), h2([id2("time")])([text5(st)])]);
      };
      noTimeHtml = /* @__PURE__ */ div_([/* @__PURE__ */ h1_([/* @__PURE__ */ text5("Current Moscow time (UTC+3:00) ... ?")])]);
      render = function(v) {
        if (v instanceof Just) {
          return okTimeHtml(renderTime(v.value0));
        }
        ;
        if (v instanceof Nothing) {
          return noTimeHtml;
        }
        ;
        throw new Error("Failed pattern match at Main (line 49, column 3 - line 51, column 26): " + [v.constructor.name]);
      };
      handleAction = function(dictMonadAff) {
        var timer1 = timer(monadAffHalogenM(dictMonadAff));
        var liftEffect12 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
        return function(v) {
          if (v instanceof Init) {
            return bind6(bindFlipped8(subscribe2)(timer1(Tick.value)))(function() {
              return pure9(unit);
            });
          }
          ;
          if (v instanceof Tick) {
            return bind6(liftEffect12(nowDateTime))(function(curDateTime) {
              var offsetUTCPlus3 = ((3 * 60 | 0) * 60 | 0) * 1e3 | 0;
              var curDateTime$prime = adjust2(toNumber(offsetUTCPlus3))(curDateTime);
              return modify_3(function(v1) {
                return curDateTime$prime;
              });
            });
          }
          ;
          throw new Error("Failed pattern match at Main (line 68, column 16 - line 78, column 39): " + [v.constructor.name]);
        };
      };
      component = function(dictMonadAff) {
        var initialState = function(v) {
          return Nothing.value;
        };
        return mkComponent({
          initialState,
          render,
          "eval": mkEval({
            handleQuery: defaultEval.handleQuery,
            receive: defaultEval.receive,
            finalize: defaultEval.finalize,
            handleAction: handleAction(dictMonadAff),
            initialize: new Just(Init.value)
          })
        });
      };
      component1 = /* @__PURE__ */ component(monadAffAff);
      main2 = /* @__PURE__ */ runHalogenAff(/* @__PURE__ */ bind(bindAff)(awaitBody)(function(body2) {
        return runUI2(component1)(unit)(body2);
      }));
      classes_ = function(n) {
        return classes(map20(ClassName)(n));
      };
      attr_ = function(k) {
        return function(v) {
          return attr2(k)(v);
        };
      };
    }
  });

  // dev/main.js
  (init_Main(), __toCommonJS(Main_exports)).main();
})();
