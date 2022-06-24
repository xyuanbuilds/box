import * as child from "child_process";

let isDev = false;
let dependence = "";
let packageName = "";

function check() {
  return new Promise<void>((r, rj) => {
    if (process.argv.length <= 2) {
      rj("at least parameter：`dependenceName--packageName`");
    }
    r();
  });
}

function action() {
  process.argv.forEach((val) => {
    const matched = val.match(/(.*)--(.*)/);
    if (matched) {
      dependence = matched[1];
      packageName = matched[2];
    }
    if (val === "-D") {
      isDev = true;
    }
  });
  const params = ["add", dependence, "-r", "--filter", packageName].concat(
    isDev ? ["-D"] : []
  );
  child.spawn("pnpm", params, {
    stdio: "inherit",
  });
}

check().then(action, (err) => {
  console.error(err);
  process.exitCode = 1; // https://juejin.cn/post/6865060371481395213
});
