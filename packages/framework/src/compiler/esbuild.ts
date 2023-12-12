import { BuildOptions, BuildResult, build } from "esbuild";
import { readFile } from "fs/promises";
import { BUILD_DIR, DEBUG_MINIFY } from "../config";
import { join } from "path";

export enum CompileType {
  CommonJS = "node",
  Module = "browser",
}

const SHARED_COMPILE_OPTIONS = {
  bundle: true,
  minify: DEBUG_MINIFY,
  write: false,
  outdir: join(BUILD_DIR, "esbuild.tmp"),
} satisfies BuildOptions;

export async function format(code: string): Promise<string> {
  const buildResult = await build({
    stdin: {
      contents: code,
    },
    minify: DEBUG_MINIFY,
    write: false,
  });

  return parseBuildResult(buildResult, code.substring(0, 8));
}

export async function compileString(compileType: CompileType, code: string) {
  return compileStringWithDeps(compileType, [], code);
}

export async function compileStringWithDeps(
  compileType: CompileType,
  deps: string[],
  code: string,
) {
  // console.log("code", code);
  const buildResult = await build({
    ...SHARED_COMPILE_OPTIONS,
    // entryPoints: deps,
    stdin: {
      contents: code,
      resolveDir: ".",
    },
    platform: compileType,
  });

  return parseBuildResult(buildResult, code.substring(0, 8));
}

export async function compile(
  file: string,
  compileType: CompileType,
  globalName?: string,
) {
  // const { dependencies = {}, peerDependencies = {} } = await getPackageJson();
  // console.log(
  //   "external",
  //   JSON.stringify(
  //     Object.keys(dependencies).concat(Object.keys(peerDependencies)),
  //     null,
  //     2,
  //   ),
  // );

  const buildResult = await build({
    ...SHARED_COMPILE_OPTIONS,
    entryPoints: [file],
    // external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
    platform: compileType,
    globalName,
  });

  return parseBuildResult(buildResult, file);
}

const getPackageJson = (() => {
  let packageJson: Record<string, any> | undefined;

  return async function getPackageJson(): Promise<Record<string, any>> {
    if (packageJson === undefined) {
      packageJson = JSON.parse(
        (await readFile("./package.json", { encoding: "utf-8" })) || "{}",
      );
      console.log("packageJson", JSON.stringify(packageJson, null, 2));
    }

    return packageJson!;
  };
})();

function parseBuildResult<T extends BuildOptions>(
  buildResult: BuildResult<T>,
  filePrefix: string,
): string {
  if (buildResult.errors.length > 0) {
    console.log(filePrefix, "has errors");
    for (const error of buildResult.errors) {
      console.log(error);
    }
    throw new Error();
  }

  if ((buildResult.outputFiles?.length || 0) !== 1) {
    console.log(
      JSON.stringify(
        (buildResult.outputFiles ?? []).map((output) => ({
          hash: output.hash,
          path: output.path,
          text: output.text,
        })),
        null,
        2,
      ),
    );
    console.log(
      filePrefix,
      "does not have exactly 1 output file when bundled?",
    );
    console.log("it has", buildResult.outputFiles?.length || 0);
    throw new Error();
  }

  return buildResult.outputFiles![0].text;
}
