import { compare, isFn } from "@boxes/utils";
const { isShallowEqual } = compare;

// * 类似 memo
export function memo<Deps extends Array<any>, Result>(
  dep: () => Deps,
  fn: (...dep: Deps) => Result,
  options?: {
    exceptFunction?: boolean;
    onChange?: (res: Result) => void;
  }
): () => Result {
  let deps: Deps[] = [];
  let result: Result = fn(...dep());

  return () => {
    const newDeps = dep();

    const depsChanged = isShallowEqual(deps, newDeps, {
      exceptFunction: options?.exceptFunction ?? true,
    });

    if (!depsChanged) {
      return result;
    }

    deps = newDeps;
    result = fn(...newDeps);
    options?.onChange?.(result);
    return result!;
  };
}

// * 类似 setState
export type Updater<T> = T | ((old: T) => T);

// * 使用 Updater
export function functionalUpdate<T>(updater: Updater<T>, input: T): T {
  return isFn(updater) ? updater(input) : updater;
}

// * 创造 Updater
export function initUpdater<IState>() {
  return function makeStateUpdater<K extends keyof IState>(
    key: K,
    instance: unknown
  ) {
    return (updater: Updater<IState[K]>) => {
      (instance as any).setState((old: IState) => {
        return {
          ...old,
          [key]: functionalUpdate(updater, (old as any)[key]),
        };
      });
    };
  };
}
