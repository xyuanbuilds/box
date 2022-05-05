import * as child from "child_process";

let isDev = false;
let dependence = "";
let packageName = "";

process.argv.forEach((val) => {
  console.log(val);
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
