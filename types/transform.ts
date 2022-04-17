import type { Id } from "./utils";

export type TupleKeys<T extends any[]> = Exclude<keyof T, keyof []>;

// type Test2 = TupleKeys<[{ a: 1 }, 2, 3]>;

// ----------------------------------------------------------------------------------------------------------

// bare type parameters before extends in a conditional type are distributed across any union constituents.
// 基本能够实现，除了 false | true
type IntersectionHelper<T> = (T extends any ? (x: T) => void : never) extends (
  x: infer R
) => void
  ? R
  : never;

// false | true 不可直接 intersection 化
// 因为不存在 false & true，所以直接从 union 中 exclude false | true
// 在生成的 intersection 后加上 boolean
type UnionToIntersection<U> = boolean extends U
  ? IntersectionHelper<Exclude<U, boolean>> & boolean
  : IntersectionHelper<U>;

// ----------------------------------------------------------------------------------------------------------
export type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? [...UnionToTuple<Exclude<T, R>>, R]
  : [];

export type UnionToObj<T> = Id<
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R
    ? {
        [Key in R & string]: R;
      } & UnionToObj<Exclude<T, R>>
    : {}
>;

// type UT = UnionToTuple<"a" | "b" | "c">;
// type UO = UnionToObj<"a" | "b" | "c">;
