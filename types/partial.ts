import type { Id } from "./utils";
// type DeepPartial<T> = {
//   [K in keyof T]?: DeepPartial<T[K]>;
// };
// * 只对key-v解构生效，且展开所有
export type DeepPartial<T> = T extends object // * 不增加此处 递归不会展开
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

// type G = { a: 1; b: { c: 1 } };
// type TD = DeepPartial<G>;
// type PartialWith<T extends object, K extends keyof T> = Copy<
//   { [Key in Exclude<keyof T, K>]: T[Key] } & {
//     [Key in K]?: T[Key];
//   }
// >;
export type PartialWith<T extends object, K extends keyof T> = Id<
  { [Key in keyof T as Key extends K ? never : Key]: T[Key] } & {
    [Key in keyof T as Key extends K ? Key : never]?: T[Key];
  }
>;

// type R = PartialWith<{ a: 1; b: 2 }, "a">;
