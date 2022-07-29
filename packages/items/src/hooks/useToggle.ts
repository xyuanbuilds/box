import * as React from "react";
import { predicates } from "@boxes/utils";

const { isFn } = predicates;

type OnToggleFn = (state: boolean) => void;

interface UseToggleProps {
  defaultValue?: boolean | (() => boolean);
  onToggle?: OnToggleFn;
}

const useHooks = ({ defaultValue, onToggle }: UseToggleProps) => {
  const [on, setState] = React.useState(defaultValue);
  const onToggleCB = React.useRef(isFn(onToggle) ? onToggle : null);

  if (isFn(onToggle)) onToggleCB.current = onToggle;
  const toggle = React.useCallback(() => {
    setState((prev) => {
      onToggleCB.current?.(!prev);
      return !prev;
    });
  }, []);

  return [on, toggle];
};

export default useHooks;
