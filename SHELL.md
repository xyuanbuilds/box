// filter 后参数为子包 package.json 中的 name
pnpm add -r vitest --filter test
pnpm remove -r vitest --filter test

// -w 表示安装到根目录
pnpm i typescript -w

// 安装公共开发依赖
pnpm i typescript -w -D
