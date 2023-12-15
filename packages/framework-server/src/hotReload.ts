import type { MiddlewareHandler } from "hyper-express";
import { DEV_MODE } from "./config";

export function hotReload(): MiddlewareHandler {
  if (!DEV_MODE) {
    return (req, res, next) => next();
  }
  throw new Error("hot reload not implemented.");
}
