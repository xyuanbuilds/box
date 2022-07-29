import type { TableGenerics, Table as TableInstance } from "../core/table";
import { memo, makeStateUpdater, functionalUpdate } from "../../utils";
import { OnChangeFn, Updater } from "../../types";

/** Pagination 相关状态 */
export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};
export type PaginationTableState = {
  pagination: PaginationState;
};
export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>;
};

/** Pagination 相关配置 */
export type PaginationOptions<TGenerics extends TableGenerics> = {
  pageCount?: number;
  onPaginationChange?: OnChangeFn<PaginationState>;
};

export type PaginationDefaultOptions = {
  onPaginationChange: OnChangeFn<PaginationState>;
};

/** Pagination 需要额外提供挂载到实例上的操作方法 */
export type PaginationInstance<TGenerics extends TableGenerics> = {
  setPagination: (updater: Updater<PaginationState>) => void;
  setPageCount: (updater: Updater<number>) => void;
  getPageOptions: () => number[];
  previousPage: () => void;
  nextPage: () => void;
  getPageCount: () => number;
};

export type TableFeature = {
  /** 获取默认配置 */
  getDefaultOptions?: (instance: any) => any;
  /** 获取初始状态 */
  getInitialState?: (initialState?: PaginationTableState) => any;
  /** 挂载方法到实例 */
  createInstance?: (instance: any) => any;
};

const defaultPageIndex = 0;
const defaultPageSize = 10;
/** 设置 pagination 默认状态 */
const getDefaultPaginationState = (): PaginationState => ({
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize,
});
export const Pagination: TableFeature = {
  getInitialState: (state): PaginationTableState => {
    return {
      ...state,
      pagination: {
        ...getDefaultPaginationState(),
        ...state?.pagination,
      },
    };
  },

  getDefaultOptions: <TGenerics extends TableGenerics>(
    instance: TableInstance<TGenerics>
  ): PaginationDefaultOptions => {
    return {
      onPaginationChange: makeStateUpdater("pagination", instance),
    };
  },

  createInstance: <TGenerics extends TableGenerics>(
    instance: TableInstance<TGenerics>
  ): PaginationInstance<TGenerics> => {
    return {
      setPagination: (updater) => {
        const safeUpdater: Updater<PaginationState> = (old) => {
          let newState = functionalUpdate(updater, old);

          return newState;
        };

        return instance.options.onPaginationChange?.(safeUpdater);
      },

      setPageCount: (updater) =>
        instance.setPagination((old) => {
          let newPageCount = functionalUpdate(
            updater,
            instance.options.pageCount ?? -1
          );

          if (typeof newPageCount === "number") {
            newPageCount = Math.max(-1, newPageCount);
          }

          return {
            ...old,
            pageCount: newPageCount,
          };
        }),

      getPageOptions: memo(
        () => [instance.getPageCount()],
        (pageCount) => {
          let pageOptions: number[] = [];
          if (pageCount && pageCount > 0) {
            pageOptions = [...new Array(pageCount)].fill(null).map((_, i) => i);
          }
          return pageOptions;
        }
      ),

      previousPage: () => {
        return instance.setPageIndex((old) => old - 1);
      },

      nextPage: () => {
        return instance.setPageIndex((old) => {
          return old + 1;
        });
      },

      getPageCount: () => {
        return (
          instance.options.pageCount ??
          Math.ceil(
            instance.getPrePaginationRowModel().rows.length /
              instance.getState().pagination.pageSize
          )
        );
      },
    };
  },
};
