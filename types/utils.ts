export type Copy<T extends object> = {
  [K in keyof T]: T[K];
};

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
