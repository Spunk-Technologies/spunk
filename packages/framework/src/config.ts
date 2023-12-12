import { join } from "path";
import { RenderStrategy } from "./renderStrategies";

export async function parseConfig() {
  // TODO actually parse some config file?
}

export const SOURCE_DIR = "src";
export const ROUTER_DIR_NAME = "routes";
export const ROUTER_DIR = join(SOURCE_DIR, ROUTER_DIR_NAME);
export const BUILD_DIR = "build";
export const USE_SET_DURING_MODULE_RESOLUTION = false;
export const DEFAULT_RENDERING_STRATEGY: RenderStrategy = "static";
