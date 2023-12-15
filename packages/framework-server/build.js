const { build } = require("esbuild");
const { dependencies, peerDependencies } = require("./package.json");
const { Generator } = require("npm-dts");

// console.log("Generating index.d.ts");
const generating = new Generator(
  {
    entry: "src/index.ts",
    output: "dist/index.d.ts",
  },
  false,
  true,
)
  .generate()
  // .then(() => console.log("Finished generating index.d.ts"))
  .catch((e) => {
    for (const out of e.output || []) {
      if (out) {
        console.log(out.toString("utf-8"));
      }
    }
  });

/**
@type import('esbuild').BuildOptions
*/
const sharedConfig = {
  platform: "node", // for CJS
  bundle: true,
  minify: false,
};

// console.log("Building index.ts");
const building = build({
  ...sharedConfig,
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  external: Object.keys(dependencies || {})
    .concat(Object.keys(peerDependencies || {}))
    .filter((mod) => !mod.startsWith("@framework")),
});
// .then(() => console.log("Finished building index.ts"));

// build({
//   ...sharedConfig,
//   entryPoints: ["src/index.ts"],
//   outdir: "dist",
//   entryNames: "[name].bundled",
// });

// build({
//   ...sharedConfig,
//   outfile: "dist/index.esm.js",
//   platform: "neutral", // for ESM
//   format: "esm",
// });
