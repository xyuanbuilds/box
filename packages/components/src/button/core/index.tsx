import { Updater } from "../../types";

/** 每个组件都会有的Option */
interface BasicOption<State> {
  initialStates?: Partial<State>;
  state?: Partial<State>;
  onStateChange?: (updater: Updater<State>) => void;
}

/** Button 自有的状态 */
export interface ButtonState {
  disabled?: boolean;
  loading?: boolean;
}

/** 组件独有的 Options */
interface ButtonOptions extends BasicOption<ButtonState> {
  type?: "outlined" | "contained" | "text";
  size?: "small" | "middle" | "large";
  disabled?: boolean;
  loading?: boolean;
}

const defaultOptions: ButtonOptions = {
  type: "outlined",
  size: "middle",
  state: {
    loading: false,
    disabled: false,
  },
};

interface ButtonCoreInstance {
  getState: () => ButtonState;
  setState: (update: Updater<ButtonState>) => void;
}

interface Button {
  options: ButtonOptions;
}

export function createButton<T extends Record<string, any> = ButtonStates>(
  options: ButtonOptions<T>
): Button<T> {
  // TODO generic
  const instance: Button<T> = {
    options: defaultOptions,
  };

  const coreInstance: ButtonCoreInstance<ButtonStates> = {
    getState: () => {
      return instance.options.state;
    },
    setState: (updater) => {
      instance.options.onStateChange?.(updater);
    },
  };

  Object.assign(instance, coreInstance);

  return instance;
}

const a = createButton<{ a: 1 }>({});
type A = typeof a.options.state;
type C = A["a"];
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
