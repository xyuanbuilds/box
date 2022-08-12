import type { Updater, BasicOption } from "../../types";
import type { ButtonFeature } from "./type";
import { functionalUpdate } from "../../utils";
import Group from "./group";

/** Button 自有的状态 */
export interface ButtonState {
  disabled?: boolean;
  loading?: boolean;
}

/** 组件独有的 Options */
interface ButtonOptions extends BasicOption<ButtonState> {
  type?: "outlined" | "contained" | "text";
  size?: "small" | "middle" | "large";
  /** 在 group 中的 button 拥有 parent */
  parent?: any;
  state: ButtonState;
}

const defaultState: ButtonState = {
  loading: false,
  disabled: false,
};
const defaultOptions: ButtonOptions = {
  type: "outlined",
  size: "middle",
  state: defaultState,
};
// const initialState = {};

interface ButtonCoreInstance {
  initialState: any;
  getState: () => Partial<ButtonState>;
  setState: (update: Updater<ButtonState>) => void;
  setOptions: (update: Updater<ButtonOptions>) => void;
}

interface Button extends ButtonCoreInstance {
  /** 初始状态 */
  initialState: Partial<ButtonState>;
  /** 默认配置 */
  defaultOptions: typeof defaultOptions;
  options: typeof defaultOptions;
  _features: ButtonFeature<ButtonState>[];
}

const features = [Group];

export function createButton(options: Partial<ButtonOptions>): Button {
  // TODO generic
  let initialState = {};
  const instance = {
    defaultOptions,
    options: defaultOptions,
    _features: features,
  } as Button;

  instance._features.forEach((feature) => {
    initialState = feature.getInitialState?.(initialState) ?? initialState;
  });

  const coreInstance: ButtonCoreInstance = {
    initialState,
    getState: () => {
      return instance.options.state;
    },
    setState: (updater) => {
      instance.options.onStateChange?.(updater);
    },
    /** 每次setOption 相当于重置，因为state可以直接被替换，state缺失时默认使用初始state */
    setOptions: (updater) => {
      const newOptions = functionalUpdate(updater, instance.options);

      instance.options = {
        ...defaultOptions,
        ...newOptions,
      };
    },
  };

  Object.assign(instance, coreInstance);

  return instance;
}

const button = createButton({});

// * group 中 type、size 共享
// button
//   .getButtonGroup(buttons, option)
//   .map((item) => <button key={item.id}></button>);
// const test = () => {
//   const group = button.getButtonGroup(buttons, option)

//   return <div>{group.map(item => {
//     return (
//       <button key={item.id}></button>
//     )
//   })}</div>;
// };
