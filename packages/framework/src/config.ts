import { join } from "path";
import { RenderStrategy } from "./renderStrategies";

export async function parseConfig() {
  // TODO actually parse some config file?
}

export const SOURCE_DIR = "src" satisfies string;
export const ROUTER_DIR_NAME = "routes" satisfies string;
export const ROUTER_DIR = join(SOURCE_DIR, ROUTER_DIR_NAME) satisfies string;
export const BUILD_DIR = "build" satisfies string;
export const USE_SET_DURING_MODULE_RESOLUTION = false satisfies boolean;
export const DEFAULT_RENDERING_STRATEGY: RenderStrategy = "static";

export const DEBUG_MINIFY = true satisfies boolean;
