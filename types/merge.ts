import type { UnionToTuple } from "./transform";

type Merge3Helper<K extends any[], V extends object> = {
  [Key in keyof K as Key extends "0"
    ? K[0]
    : Key extends "1"
    ? K[1]
    : Key extends "2"
    ? K[2]
    : never]: V[Key extends "0" | "1" | "2" ? Key : keyof V];
};

export type Merge3<U1, U2> = Merge3Helper<UnionToTuple<U1>, UnionToTuple<U2>>;

// type obj3 = Merge3<"a" | "b" | "c", "1" | "2" | "3">;
