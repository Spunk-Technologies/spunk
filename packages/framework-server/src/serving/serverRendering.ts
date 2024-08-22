import { MiddlewareHandler, Request, Response } from "hyper-express";
import { extname, join, sep } from "path";
import { assets } from "../assets";
import { cwd } from "process";
import { requireFromString } from "@framework/utils";

export function serveWithServerRendering(): MiddlewareHandler {
  return async (req, res, next) => {
    let path = req.path;
    if (path.endsWith("/")) {
      path = path.slice(0, path.length - 1);
    }
    const ext = extname(path);
    switch (ext) {
      case "":
        path += ".js";
      case "js":
        // oops not ssr
        if (
          assets.get(
            req.path.substring(0, path.length - ".js".length) + ".html",
          )
        ) {
          return next();
        }
        break;
      default:
        // definitly not ssr
        return next();
    }

    const file = assets.get(path);
    if (!file) {
      // users stop doing bad things
      return next();
    }

    if (!file.cached) {
      await file.reload(undefined, true);
    }

    return doSSR(file.content.toString("utf-8"), req, res);
  };
}

function doSSR(src: string, req: Request, res: Response) {
  const route = requireFromString(src, "", "", []) as any; // TODO don't do as any
  return route.default(req, res);
}
