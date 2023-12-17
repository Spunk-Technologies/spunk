import { readdir, mkdir, rm, stat } from "fs/promises";

// Must be the first import
import "preact/debug";

import { BUILD_DIR, ROUTER_DIR, parseConfig } from "./config";
import { buildRoute } from "./builder";
import { saveRoute } from "./saver";
import { join } from "path";
import { argv, exit } from "process";

import { main as serverMain } from "@framework/server";
import { saveRoutesDTS } from "./saver/routes";

export { RenderStrategy } from "./renderStrategies";

async function buildAndSaveRoutes(directory: string): Promise<string[]> {
  const routeFiles = await readdir(directory);
  const routePromises: Promise<string[]>[] = [];
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

        return [routeName];
      })(),
    );
  }
  return (await Promise.all(routePromises)).flat();
}

async function main() {
  await parseConfig();

  console.log("running");
  if (argv[2]?.toLowerCase() === "server") {
    await serverMain();
    return;
  }

  console.log("cleaning build directory");
  await rm(BUILD_DIR, { recursive: true });
  await mkdir(BUILD_DIR, { recursive: true });

  console.log("building");
  const routes = await buildAndSaveRoutes(ROUTER_DIR);
  await saveRoutesDTS(routes);

  exit(0);
}

main();
