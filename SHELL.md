// filter 后参数为子包 package.json 中的 name
pnpm add -r vitest --filter test
pnpm remove -r vitest --filter test

// -w 表示安装到根目录
pnpm i typescript -w

// 安装公共开发依赖
pnpm i typescript -w -D

// 所有包安装依赖
pnpm i typescript -r

// 内部依赖
pnpm add -r @boxes/utils --filter @boxes/hooks

// workspace packages all build
pnpm run -r build
https://juejin.cn/post/7053807488952434719#heading-5
