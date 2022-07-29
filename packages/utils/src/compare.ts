type SimilarObject = string | number | Array<any> | object | null | undefined;
export function isShallowEqual(
  source: SimilarObject,
  target: SimilarObject,
  options: {
    exceptFunction?: boolean;
  }
) {
  if (source === target) {
    return true;
  }
  if (
    source &&
    target &&
    typeof source === "object" &&
    typeof target === "object"
  ) {
    const sourceKeys = Object.keys(source);
    const targetKeys = Object.keys(target);

    if (sourceKeys.length !== targetKeys.length) return false;

    return [...sourceKeys].every((key) => {
      const sourceValue = source[key];
      const targetValue = target[key];

      // * compare except function
      if (
        typeof sourceValue === "function" &&
        typeof targetValue === "function"
      ) {
        return options.exceptFunction ? true : sourceValue === targetValue;
      }
      return sourceValue === targetValue;
    });
  }

  if (typeof source !== typeof target) return false;
  if (source !== target) return false;
  return true;
}
