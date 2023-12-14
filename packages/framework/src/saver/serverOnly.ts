import { writeFile, readFile } from "fs/promises";
import { ServerOnlyRenderInfo } from "../renderStrategies";
import { join } from "path";
import { DEBUG_MINIFY } from "../config";

export async function saveServerOnly(
  savePath: string,
  renderInfo: ServerOnlyRenderInfo,
): Promise<void> {
  const routeTemplate = await getRouteTemplate();
  savePath =
    savePath.substring(0, savePath.length - "/index.html".length) + ".js";
  await writeFile(
    savePath,
    `${renderInfo.javascript}${DEBUG_MINIFY ? "" : "\n\n"}${routeTemplate}`,
  );
}

const getRouteTemplate = (() => {
  let routeTemplate: string | undefined;

  return async function getRouteTemplate(): Promise<string> {
    if (routeTemplate) {
      return routeTemplate;
    }

    const file = await readFile(
      join(__dirname, "templates/serverOnlyRouting.js"),
      { encoding: "utf-8" },
    );
    routeTemplate = file;
    return file;
  };
})();
