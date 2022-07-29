import * as React from "react";
import { isReactComponent } from "@boxes/utils";

// * 所有需要渲染的内容，都通过 render 进行调用
export const render = (Comp: any, props) =>
  // !Comp ? null : isReactElement(Comp) ? <Comp {...props} /> : Comp;
  !Comp ? null : isReactComponent(Comp) ? <Comp {...props} /> : Comp;

export interface TInstance {}

export function createUseInstance({ createInstance }) {
  function useInstance(instance, options) {
    const resolvedOptions = {
      ...instance.options,
      state: {}, // Dummy state
      onStateChange: () => {}, // noop
      render,
      renderFallbackValue: null,
      ...options,
    };

    const [state, setState] = React.useState(
      () => instanceRef.current.initialState
    );

    const [instanceRef] = React.useState(() => ({
      current: createInstance(resolvedOptions),
    }));

    instanceRef.current.setOptions((prev) => ({
      ...prev,
      ...options,
      state: {
        ...state,
        ...options.state,
      },
      onStateChange: (updater) => {
        setState(updater);
        options.onStateChange?.(updater);
      },
    }));

    return instanceRef.current;
  }

  return useInstance;
}

// 思考 headless 主要提供什么
// 1. 状态/数据
// 2. 必要情况下的渲染控制（非必要让外部自行组织标签结构，读取内部状态即可）
//   如 Table 中的 Grouping，需要内部承接结构处理
//   定制渲染，在原有的渲染逻辑中传递定制配置
