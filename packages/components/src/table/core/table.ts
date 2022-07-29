import type { Overwrite, Id } from "../../types";
import type {
  PaginationTableState,
  PaginationOptions,
  PaginationInstance,
} from "../features/Pagination";

export type TableGenerics = {
  Record?: any;
};

export type TableState = {} & PaginationTableState;

/** 配置合并 */
interface CoreOptions<TGenerics extends TableGenerics> {
  data: TGenerics["Record"][];
}

export type TableOptions<TGenerics extends TableGenerics> =
  CoreOptions<TGenerics> & PaginationOptions<TGenerics>;

/** 实例合并 */
export interface TableCoreInstance<TGenerics extends TableGenerics> {
  /** 功能预览 */
  generic: TGenerics;
  options: TableOptions<TGenerics>;
}

export type TableInstance<TGenerics extends TableGenerics> =
  TableCoreInstance<TGenerics> & PaginationInstance<TGenerics>;

interface Helpers<T> {
  setRecordType<RecordType>(): Table<Overwrite<T, { Record: RecordType }>>;
}

export function createTable<T>(
  options: TableOptions<T>
): Id<TableInstance<T> & Helpers<T>> {
  const table: Table<T> = {
    generic: undefined as any, // any 断言避开 generic 检查
    options: {
      data: [],
    },
  };

  const helpers: Helpers<T> = {
    setRecordType() {
      return table as any;
    },
  };

  return Object.assign(table, helpers);
}

const table = createTable();

const table2 = createTable().setRecordType<{ a: 1 }>();
