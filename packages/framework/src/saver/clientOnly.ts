import { writeFile } from "fs/promises";
import { ClientOnlyRenderInfo } from "../renderStrategies";
import { BUILD_DIR } from "../config";

export async function saveClientOnly(
  savePath: string,
  renderInfo: ClientOnlyRenderInfo,
): Promise<void> {
  const scriptSrc = generateScriptSrc(savePath);
  const scriptTag = generateScriptTag(scriptSrc);
  const preloadTag = generatePreloadTag(As.Script, scriptSrc);
  await Promise.all([
    writeFile(
      savePath,
      `<head>${preloadTag}</head>${renderInfo.html}${scriptTag}`,
    ),
    writeFile(savePath.replace(".html", ".js"), renderInfo.javascript),
  ]);
}

function generateScriptSrc(savePath: string): string {
  return savePath.replace(BUILD_DIR, "").replace(".html", ".js");
}

function generateScriptTag(scriptSrc: string): string {
  return `<script defer src="${scriptSrc}"></script>`;
}

enum As {
  Script = "script",
}

function generatePreloadTag(as: As, scriptSrc: string): string {
  return `<link rel="preload" href="${scriptSrc}" as="${as}" />`;
}
