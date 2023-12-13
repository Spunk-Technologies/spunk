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

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: false,
  external: Object.keys(dependencies || {}).concat(
    Object.keys(peerDependencies || {}),
  ),
};

// console.log("Building index.ts");
const building = build({
  ...sharedConfig,
  platform: "node", // for CJS
  outfile: "dist/index.js",
});
// .then(() => console.log("Finished building index.ts"));

// build({
//   ...sharedConfig,
//   outfile: "dist/index.esm.js",
//   platform: "neutral", // for ESM
//   format: "esm",
// });

Promise.all([generating, building]);
