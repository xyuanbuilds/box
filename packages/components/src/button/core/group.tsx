import { memo } from "../../utils";

export const Group = () => {
  createInstance: (instance) => {
    return {
      getHeaderGroups: memo(
        () => [instance.buttons, instance.get],
        (buttons, options) => {
          return buttons;
        }
      ),
    };
  };
};
