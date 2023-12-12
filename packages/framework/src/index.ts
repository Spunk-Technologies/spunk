import { readdir, mkdir, rm, stat } from "fs/promises";

import { BUILD_DIR, ROUTER_DIR, parseConfig } from "./config";
import { buildRoute } from "./builder";
import { saveRoute } from "./saver";
import { join } from "path";

export { RenderStrategy } from "./renderStrategies";

async function buildAndSaveRoutes(directory: string) {
  const routeFiles = await readdir(directory);
  const routePromises: Promise<void>[] = [];
  for (const routeFile of routeFiles) {
    routePromises.push(
      (async () => {
        const routePath = join(directory, routeFile);
        if ((await stat(routePath)).isDirectory()) {
          return buildAndSaveRoutes(routePath);
        }

        const renderInfo = await buildRoute(routePath);
        // console.log(routePath, "Render Info:");
        // console.log(renderInfo);

        const routeSplit = routePath.replace(ROUTER_DIR, "").split(".");
        routeSplit.pop();
        const routeName = routeSplit.join(".");

        await saveRoute(routeName, renderInfo);
      })(),
    );
  }
  await Promise.all(routePromises);
}

async function main() {
  await parseConfig();

  await rm(BUILD_DIR, { recursive: true });
  await mkdir(BUILD_DIR, { recursive: true });

  await buildAndSaveRoutes(ROUTER_DIR);
}

main();
