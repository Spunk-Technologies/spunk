import { RenderInfo } from "../renderStrategies";
import { saveStatic } from "./static";
import { join } from "path";
import { BUILD_DIR } from "../config";
import { mkdir } from "fs/promises";

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
    default:
      throw new Error(`${renderInfo.type} saving is not implemented yet`);
  }
}
