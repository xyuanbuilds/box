import type * as React from "react";

declare global {
  export type PlainObject = Object;

  /** string wont be transformed to NaN  */
  export type NumLike = string | number;

  export type Predicator<T> = (who: unknown) => who is T;

  export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
    readonly 0: A;
  };

  export interface NonEmptyArray<A> extends Array<A> {
    0: A;
    pop(): A;
    shift(): A;
  }

  export type AnyFunction = (...args: any) => any;
}

// export const isFn: Predicator<AnyFunction> = <T extends Function>(
//   val: unknown
// ): val is T => typeof val === "function";

export function isFn<T extends AnyFunction>(val: unknown): val is T {
  return typeof val === "function";
}

// export const isArr: Predicator<Array<any>> = Array.isArray;
export function isArr<T extends Array<any>>(val: unknown): val is T {
  return typeof val === "function";
}

export const isNoEmptyArr = <T extends unknown>(
  val: Array<T>
): val is NonEmptyArray<T> => isArr(val) && val.length > 0;

export const isStr: Predicator<string> = (val: unknown): val is string =>
  typeof val === "string";

export const isNum: Predicator<number> = (val: unknown): val is number =>
  typeof val === "number";

export const isNumLike: Predicator<NumLike> = (
  val: unknown
): val is NumLike => {
  if (isNum(val)) return true;
  if (!isStr(val)) return false;
  return !Number.isNaN(Number(val));
};

export const isInt: Predicator<number> = (val: unknown): val is number =>
  Number.isInteger(val);

export const isEven: Predicator<number> = (val: unknown): val is number =>
  isInt(val) && (val & 1) === 0;
export const isOdd: Predicator<number> = (val: unknown): val is number =>
  isInt(val) && (val & 1) === 1;

export const isBool: Predicator<boolean> = (val: unknown): val is boolean =>
  typeof val === "boolean";

export const isObj: Predicator<Object> = (val: unknown): val is object =>
  typeof val === "object";

export const isPlainObj: Predicator<PlainObject> = (
  val
): val is PlainObject => {
  if (!isObj(val) || val === null) return false;

  let proto = val;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(val) === proto;
};

export const isReg: Predicator<RegExp> = (val: unknown): val is RegExp =>
  val instanceof RegExp;

export const isSymbol: Predicator<Symbol> = (val: unknown): val is Symbol =>
  typeof val === "symbol";

export type Renderable<TProps> =
  | React.ReactNode
  | React.FC<TProps>
  | React.Component<TProps>;

// checkout React type: https://dev.to/fromaline/jsxelement-vs-reactelement-vs-reactnode-2mh2
// react type cheatsheets: https://github.com/typescript-cheatsheets/react#useful-react-prop-type-examples

function isReactComponent(val: unknown): val is React.FC {
  // class\FC\memo\forwardRef
  return val && (isClassComponent(val) || isFn(val) || isExoticComponent(val));
}
export { isReactComponent };
// class
function isClassComponent(component: any) {
  return (
    typeof component === "function" &&
    (() => {
      const proto = Object.getPrototypeOf(component);
      return proto.prototype && proto.prototype.isReactComponent;
    })()
  );
}

// memo、forwardRef
function isExoticComponent(component: any) {
  return (
    typeof component === "object" &&
    typeof component.$$typeof === "symbol" &&
    // React Symbols: https://github.com/facebook/react/blob/d862f0ea56/packages/shared/ReactSymbols.js
    ["react.memo", "react.forward_ref"].includes(component.$$typeof.description)
  );
}
