import * as child from "node:child_process";

const { PROJECT_NAME } = process.env;

function check() {
  console.log(`
  params:
    -ws: add workspace package
    -D: add devDependencies
    -d: packages all add
  `);

  return new Promise<void>((r, rj) => {
    if (process.argv.length <= 2) {
      rj("at least parameter：`dependenceName--packageName`");
    }
    r();
  });
}

function action() {
  let isDev = false;
  let isAll = false;
  let isWS = false;
  let dependence = "";
  let packageName = "";

  process.argv.forEach((val) => {
    // dependenceName--packageName
    const matched = val.match(/(.*)--(.*)/);
    if (matched) {
      dependence = matched[1];
      packageName = /^@\w+\/\w+/.test(matched[2])
        ? matched[2]
        : `@${PROJECT_NAME}/${matched[2]}`;
    }
    if (val === "-D" || val === "-d") {
      isDev = true;
    }
    if (val === "-r") {
      isAll = true;
    }
    if (val === "-ws") {
      isWS = true;
    }
  });

  if (isWS) {
    dependence = /^@\w+\/\w+/.test(dependence)
      ? dependence
      : `@${PROJECT_NAME}/${dependence}`;
  }

  const single = ["add", dependence, "-r", "--filter", packageName];
  const all = ["add", dependence, "-r"];

  const params = (isAll ? all : single).concat(isDev ? ["-D"] : []);

  child.spawn("pnpm", params, {
    stdio: "inherit",
  });
}

check().then(action, (err) => {
  console.error(err);
  process.exitCode = 1; // https://juejin.cn/post/6865060371481395213
});
