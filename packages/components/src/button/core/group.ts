import { memo } from "../../utils";
import { makeStateUpdater } from "./utils";
import type { ButtonFeature } from "./type";
import type { ButtonState } from ".";

export interface GroupButtonState {
  buttons: any[];
  orientation: "vertical" | "horizontal";
}

export const Group: ButtonFeature<ButtonState> = {
  getDefaultOptions: (instance) => ({
    onGroupingChange: makeStateUpdater("buttons", instance),
    reverse: false,
  }),

  getInitialState: (state) => {
    return {
      ...state,
    };
  },

  // ? 父子间怎么通信的
  createInstance: (instance) => {
    return {
      createButtonGroup: memo(
        () => [instance.buttons, instance.get],
        (buttons, options) => {
          return buttons;
        }
      ),
      /** 使用group
       * getGroup(n).map(button)
       * getGroup([<button />]) // 内部处理  render /
       */
      getGroup() {

      }
      // const [grouping, setGrouping] = React.useState<GroupingState>([])

      // const instance = useTableInstance(table, {
      //   data,
      //   columns,
      //   state: {
      //     grouping,
      //   },
      //   onGroupingChange: setGrouping,
      //   getExpandedRowModel: getExpandedRowModel(),
      //   getGroupedRowModel: getGroupedRowModel(),
      //   getCoreRowModel: getCoreRowModel(),
      //   getPaginationRowModel: getPaginationRowModel(),
      //   getFilteredRowModel: getFilteredRowModel(),
      //   debugTable: true,
      // })

      setGroup: (updater) => instance.options.onGroupingChange?.(updater),
    };
  },
};

export default Group;
