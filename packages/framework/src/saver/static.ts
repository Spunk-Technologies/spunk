import { writeFile } from "fs/promises";
import { StaticRenderInfo } from "../renderStrategies";

export async function saveStatic(
  savePath: string,
  renderInfo: StaticRenderInfo,
): Promise<void> {
  await writeFile(savePath, `<!doctype html>${renderInfo.html}`);
}
