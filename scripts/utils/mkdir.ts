import * as fs from "fs";
import * as path from "path";

export function mkdirSync(dirname: string, mode?: fs.Mode) {
  const pathsCreated = [];
  const pathsFound = [];
  let name = dirname;

  let first = true;
  while (true) {
    try {
      const stats = fs.statSync(name);
      if (stats.isDirectory()) {
        if (first) console.warn(`path: ${name} already exists`);
        break;
      }
      throw new Error(`Unable to create directory at ${name}`);
    } catch (e) {
      if (e.code === "ENOENT") {
        pathsFound.push(name);
        name = path.dirname(name);
      } else {
        throw e;
      }
    }
    first = false;
  }

  for (let i = pathsFound.length - 1; i >= 0; i -= 1) {
    const fn = pathsFound[i];
    fs.mkdirSync(fn, mode);
    pathsCreated.push(fn);
  }
  return pathsCreated;
}
