const requireRegex = /_{0,2}require\s*\(\s*(["'].*["'])\s*\)/g;
const IMPORT_STRING_PREFIX = "__require_for_vite";
function transformRequire(code, id) {
  const requireMatches = code.matchAll(requireRegex);
  let importsString = "";
  let packageName = "";
  let replaced = false;
  for (let item of requireMatches) {
    if (!isString(item[1])) {
      console.warn(`Not supported dynamic import, file:${id}`);
      continue;
    }
    replaced = true;
    packageName = `${IMPORT_STRING_PREFIX}_${randomString(6)}`;
    importsString += `import * as ${packageName} from ${item[1]};\n`;
    code = code.replace(item[0], `${packageName}.default || ${packageName}`);
  }
  if (replaced) {
    code = importsString + code;
  }
  code = code.replace("module.exports =", "export default");
  return code;
}
