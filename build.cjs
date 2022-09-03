const { build } = require("esbuild");
const replace = require("replace-in-file");

build({
  entryPoints: ["./src/function.ts"],
  outdir: "./dist",
  minify: false,
  bundle: true,
})
  .catch(() => process.exit(1))
  .finally(() => {
    console.log("BUILT BROOOOO");
    // replace.sync({
    //   files: "./dist/function.js",
    //   from: ["async function handle"],
    //   to: "export async function handle",
    //   countMatches: true,
    // });
  });
