if (!/pnpm/.test(process.env.npm_execpath) || process.env.npm_execpath === "") {
  console.warn(`\u001b[33m You need to use pnpm as the package management \n`);

  process.exit(1);
}
