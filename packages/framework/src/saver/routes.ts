import { writeFile } from "fs/promises";
import { join } from "path";
import { BUILD_DIR } from "../config";

import Prettier from "prettier";

export async function saveRoutesDTS(routes: string[]) {
  const formatted = await Prettier.format(
    `declare namespace Routes {
       type DefinedPaths = ${routes
         .map((route) => {
           route = route.replace("/index", "/");
           if (!route.endsWith("/")) {
             route += "/";
           }
           return `'${route}'`;
         })
         .join("|")};
     }`,
    { parser: "typescript" },
  );

  await writeFile(join(BUILD_DIR, "routes.d.ts"), formatted);
}
