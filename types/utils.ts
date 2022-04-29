export type Copy<T extends object> = {
  [K in keyof T]: T[K];
};

// export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

export type ReadOnlyWith<T extends object, U extends keyof T> = {
  readonly [Key in U]: T[Key];
} & {
  [Key in keyof T as Key extends U ? never : Key]: T[Key];
};

//  只对k-v结构生效，且展开所有
export type DeepPartial<T> = T extends object // * 不增加此处 递归不会展开
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;

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

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type A = { a: 1; b: 2 };
type B = { a: 1 } & { b: 2 };

type T = B extends A ? 1 : 0;

type AA = Id<B>;
