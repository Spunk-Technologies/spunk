import { Server } from "hyper-express";
import { hotReload } from "./hotReload";
import { serveWithServerRendering } from "./serving/serverRendering";
import { serveStatic } from "./serving/static";

export async function main() {
  const server = new Server()
    .use("/ws", hotReload())
    .use(serveWithServerRendering())
    .use(serveStatic()) as Server;

  for (let i = 3000; i < 4000; i++) {
    try {
      await server.listen(i);
      console.log(`running on http://localhost:${i}`);
      break;
    } catch {}
  }
}

// main();
