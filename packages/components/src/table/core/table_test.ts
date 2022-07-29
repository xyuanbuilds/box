// @ts-nocheck

// // options 集中管理

// type Render = (cmp: any, props: any) => any;
// interface TableOptions {}

// export type Overwrite<T, U extends { [TKey in keyof T]?: any }> = Omit<
//   T,
//   keyof U
// > &
//   U;

// export class Table<T> {
//   // * 每个实例创建的同时，会保留所有的配置信息
//   // * 可以重复传入新的 options，再创建新的实例
//   options: TableOptions = {};

//   // static createTable() {
//   //   return new Table();
//   // }

//   // * 重要类型的提示整合
//   generic: T;

//   private features = [{}, {}];

//   constructor() {
//     this.generic = undefined as any;

//     // * 初始的 options 为预置功能相关的默认配置添加
//     // this.options = this.features.reduce((obj, feature) => {
//     //   return Object.assign(obj, feature.getDefaultOptions?.(this));
//     // });
//   }

//   // mergeOptions(extraOptions) {
//   //   if (this.options.mergeOptions) {
//   //     return this.options.mergeOptions(defaultOptions, options);
//   //   }

//   //   return {
//   //     ...this.options,
//   //     ...extraOptions,
//   //   };
//   // }

//   // // * 用于外部设置 options
//   // setOptions(newOptions) {
//   //   // const newOptions = functionalUpdate(updater, instance.options);
//   //   this.options = mergeOptions(newOptions);
//   // }

//   setRecordType<RecordType>(): Table<Overwrite<T, { record: RecordType }>> {
//     return this as any;
//   }
// }

// const table = new Table();
// const tableSetRecord = table.setRecordType<{ a: 1 }>();

export type Overwrite<T, U extends { [TKey in keyof T]?: any }> = Omit<
  T,
  keyof U
> &
  U;

/** 用于展开联合类型 */
type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

/** 泛型类型组合 */
export type TableGenerics = {
  Row?: any;
};

interface TableOptions<TGenerics extends TableGenerics> {
  data: TGenerics["Row"][];
}

interface Table<TGenerics extends TableGenerics> {
  generic: TGenerics;
  options: TableOptions<TGenerics>;
}

/** 协助覆写类型方法*/
interface Helpers<T> {
  setRowType<RecordType>(): Table<Overwrite<T, { Row: RecordType }>>;
}

function createTable<T>(): Id<Table<T> & Helpers<T>> {
  const table: Table<T> = {
    generic: undefined as any, // any 断言避开 generic 检查
    options: {
      data: [],
    },
  };

  const helpers: Helpers<T> = {
    setRowType() {
      return table as any;
    },
  };

  return Object.assign(table, helpers);
}

const table = createTable();
const table2 = createTable().setRowType<{ a: 1 }>();
