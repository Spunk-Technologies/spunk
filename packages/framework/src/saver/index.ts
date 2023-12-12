import { RenderInfo } from "../renderStrategies";
import { saveStatic } from "./static";
import { join } from "path";
import { BUILD_DIR } from "../config";
import { mkdir } from "fs/promises";
import { saveClientOnly } from "./clientOnly";

export async function saveRoute(
  route: string,
  renderInfo: RenderInfo,
): Promise<void> {
  route = route.replace(/index$/g, "");
  const saveDir = join(BUILD_DIR, route);
  await mkdir(saveDir, { recursive: true });
  const savePath = join(saveDir, "index.html");
  switch (renderInfo.type) {
    case "static":
      return saveStatic(savePath, renderInfo);
    case "client-only":
      return saveClientOnly(savePath, renderInfo);
    default:
      throw new Error(
        `${
          // TODO add other types to RenderInfo and remove this ts-ignore
          // @ts-ignore
          renderInfo.type
        } saving is not implemented yet`,
      );
  }
}
