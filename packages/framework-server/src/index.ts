import { Server } from "hyper-express";
import { hotReload } from "./hotReload";
import { serveWithServerRendering } from "./serving/serverRendering";
import { serveStatic } from "./serving/static";

export async function main() {
  const server = new Server({ auto_close: true })
    .use("/ws", hotReload())
    .use(serveWithServerRendering())
    .use(serveStatic());

  let err: any;
  for (let i = 3000; i < 4000; i++) {
    try {
      await server.listen(i);
      console.log(`running on http://localhost:${i}`);
      err = undefined;
      break;
    } catch (e) {
      err = e;
    }
  }

  if (err) {
    console.log("failed to start server with the error below... exiting");
    console.log(err.stack || err.toString());
    process.exit(1);
  }

  let firstInt = true;
  process.addListener("SIGINT", () => {
    if (!firstInt) {
      process.exit(0);
    }
    firstInt = false;
    console.log(
      "\ngracefully shutting down server. press Ctrl+C again to force quit",
    );
    server.close();
    process.exit(0);
  });
}

// main();
