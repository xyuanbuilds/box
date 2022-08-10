import * as React from "react";
import { isReactComponent } from "@boxes/utils";
import { createButton } from "../core";
import type { ButtonState } from "../core";

export type Renderable<TProps> =
  | React.ReactNode
  | React.FunctionComponent<TProps>
  | React.Component<TProps>;

export type Render = <TProps extends {}>(
  Comp: Renderable<TProps>,
  props: TProps
) => React.ReactNode | JSX.Element;

export const render: Render = (Comp, props) =>
  !Comp ? null : isReactComponent(Comp) ? (
    <Comp {...props} />
  ) : (
    (Comp as React.ReactNode)
  );

export function useButton(options) {
  const resolvedOptions = {
    state: {}, // Dummy state
    onStateChange: () => {}, // noop
    render,
    renderFallbackValue: null,
    ...options,
  };

  const [instanceRef] = React.useState(() => ({
    // * createTableInstance 方法是真实创建实例
    current: createButton(resolvedOptions),
  }));

  // By default, manage table state here using the instance's initial state
  const [state, setState] = React.useState(
    () => instanceRef.current.initialState
  );

  // Compose the default state above with any user state. This will allow the user
  // to only control a subset of the state if desired.
  instanceRef.current.setOptions((prev) => ({
    ...prev,
    ...options,
    state: {
      ...state,
      // 受控状态
      ...options.state,
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (updater) => {
      setState(updater);
      options.onStateChange?.(updater);
    },
  }));

  return instanceRef.current;
}
