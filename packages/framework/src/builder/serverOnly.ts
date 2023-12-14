import { ServerOnlyRenderInfo } from "../renderStrategies";
import { CompileType, compile } from "../compiler/esbuild";
import type { ComponentType } from "preact";

export async function renderServerOnly(
  Component: ComponentType<never>,
  routeFile: string,
): Promise<ServerOnlyRenderInfo> {
  const src = await compile(routeFile, CompileType.Module, "route", [
    "preact",
    "preact-render-to-string",
  ]);
  return {
    type: "server-only",
    javascript: src,
  };
}
