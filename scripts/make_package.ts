import * as path from "path";
import { spawn } from "child_process";
import { createInterface } from "readline";
import { fileURLToPath } from "url";
import { mkdirSync } from "./utils/mkdir";

const { WORKSPACE_DIR, PROJECT_NAME } = process.env;

const __filename = fileURLToPath(import.meta.url);
// https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, "..");

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let packageCWD = "";

if (process.argv.length <= 2) {
  readline.question(`package name?`, (pathStr) => {
    try {
      packageCWD = path.resolve(root, WORKSPACE_DIR, pathStr);
      mkdirSync(path.resolve(packageCWD));
    } catch (e) {
      console.log(e);
    }

    readline.close();
  });
} else {
  const args = process.argv.slice(2);

  packageCWD = path.resolve(root, WORKSPACE_DIR, ...args);
  try {
    mkdirSync(packageCWD);
  } catch (e) {
    console.log(e);
  }

  // copy(packageCWD);
}
makePackage(packageCWD);

function makePackage(packageCWD: string) {
  const child = spawn("npm", ["init"], {
    cwd: packageCWD,
    // stdio: "inherit",
  });
  child.stdout.setEncoding("utf-8");
  child.stdout.on("end", function () {
    console.log("\nDone\n");
    process.exit(1);
  });
  // child.stdout.on("data", function (data) {
  //   console.log("data", data);
  // });
  child.stdout.pipe(process.stdout);

  const rl = createInterface({
    input: process.stdin,
  });

  rl.on("line", function (cmd) {
    // console.log("cmd", cmd);
    child.stdin.write(`${cmd}\n`);
  });
}
