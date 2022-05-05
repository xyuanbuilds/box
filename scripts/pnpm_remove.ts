import * as child from "child_process";

let dependence = "";
let packageName = "";

process.argv.forEach((val) => {
  const matched = val.match(/(.*)--(.*)/);
  if (matched) {
    dependence = matched[1];
    packageName = matched[2];
  }
});
const params = ["remove", dependence, "-r", "--filter", packageName];
child.spawn("pnpm", params, {
  stdio: "inherit",
});
