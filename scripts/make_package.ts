/**
 * pnpm run mk
 *  packageName
 */
import * as path from "node:path";
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { EOL } from "node:os";
import { mkdirSync } from "./utils/mkdir";

const { WORKSPACE_DIR } = process.env;

const __filename = fileURLToPath(import.meta.url);
// https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, "..");

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/** package cwd */
let packageCWD = "";

function printCWD() {
  console.log(packageCWD);
}

function check() {
  /** make with ask */
  if (process.argv.length <= 2) {
    readline.question(`package name? `, (pathStr) => {
      try {
        packageCWD = path.resolve(root, WORKSPACE_DIR ?? "packages", pathStr);
        mkdirSync(path.resolve(packageCWD));
      } catch (e) {
        console.log(e);
      }

      readline.close();
    });

    readline.on("close", () => {
      makePackage(packageCWD);
      printCWD();
    });
  } else {
    const args = process.argv.slice(2);

    packageCWD = path.resolve(root, WORKSPACE_DIR ?? "packages", ...args);
    try {
      mkdirSync(packageCWD);
    } catch (e) {
      console.log(e);
    }

    makePackage(packageCWD);
    printCWD();
  }
}

function makePackage(packageCWD: string) {
  const child = spawn("npm", ["init"], {
    cwd: packageCWD,
    // stdio: "inherit",
  });
  child.stdout.setEncoding("utf-8");

  // child.stdout.on("data", function (data) {
  //   console.log("data", data);
  // });
  child.stdout.pipe(process.stdout);

  const rl = createInterface({
    input: process.stdin,
  });

  rl.on("line", function (cmd) {
    // console.log("cmd", cmd);
    child.stdin.write(`${cmd}${EOL}`);
  });

  child.stdout.on("end", function () {
    console.log("\nDone\n");
    // process.exit(1);
    process.stdin.unref();
  });
}

check();
