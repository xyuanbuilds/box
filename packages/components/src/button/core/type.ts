export type ButtonFeature<T extends {}> = {
  /** 往初始配置 中添加的 内容 */
  getDefaultOptions?: (instance: any) => any;
  /** 往初始状态中添加的 state */
  getInitialState?: (initialState?: T) => any;
  /** 往最终生成的 instance 中添加方法 */
  createInstance?: (instance: any) => any;
};
