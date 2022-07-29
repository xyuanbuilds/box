export type PlainObject = Object;

/** string wont be transformed to NaN  */
export type NumLike = string | number;

export type Predicator<T> = (who: unknown) => who is T;

type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`;
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
type DD = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`;

export type DateString = `${YYYY}${MM}${DD}`;

export type ReadonlyNonEmptyArray<A> = ReadonlyArray<A> & {
  readonly 0: A;
};

export interface NonEmptyArray<A> extends Array<A> {
  0: A;
  pop(): A;
  shift(): A;
}

export type AnyFunction = (...args: any) => any;
