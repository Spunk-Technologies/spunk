import { MiddlewareHandler } from "hyper-express";
import { extname, join } from "path";
import { assets } from "../assets";

export function serveStatic(): MiddlewareHandler {
  return async (req, res, next) => {
    console.log("static");
    let path = req.path;
    if (path === "") {
      path = "/index.html";
    }
    if (path.endsWith("/")) {
      path += "index.html";
    }
    let ext = extname(path);
    switch (ext) {
      case "":
        if (assets.get(path + "/index.html")) {
          path += "/index.html";
          ext = "html";
          break;
        }
      case "js":
        // don't serve the server side rendering code
        if (!assets.get(path.substring(0, path.length - ext.length) + "html")) {
          return next();
        }
        break;
    }

    const file = assets.get(path);

    console.log("static:", path);
    console.log("static join:", join(path, "index.html"));

    // Return a 404 if no asset/file exists on the derived path
    if (file === undefined)
      return res
        .status(404)
        .send(
          `${path} not found\n\nvalid paths:\n\n${[...assets.files.keys()].join(
            "\n",
          )}`,
        );

    // Retrieve the file content and serve it depending on the type of content available for this file
    const content = file.content;
    if (file.cached) {
      // Set appropriate mime-type and serve file content Buffer as response body (This means that the file content was cached in memory)
      return res.type(ext).send(content);
    } else {
      // Set the type and stream the content as the response body (This means that the file content was NOT cached in memory)
      return res.type(ext).stream(file.stream());
    }
  };
}
