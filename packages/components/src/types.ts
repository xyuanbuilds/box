// * same as SetStateAction
export type Updater<T> = T | ((oldValue: T) => T);

// * render jsx
export type Render = (cmp: any, props: any) => any;

// * onChange 与 setState 同构处理
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;

export type Overwrite<T, U extends { [TKey in keyof T]?: any }> = Omit<
  T,
  keyof U
> &
  U;

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
