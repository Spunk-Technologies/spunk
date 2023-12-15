import { Server } from "hyper-express";
import { hotReload } from "./hotReload";
import { serveWithServerRendering } from "./serving/serverRendering";
import { serveStatic } from "./serving/static";

export async function main() {
  const server = new Server()
    .use("/ws", hotReload())
    .use(serveStatic())
    .use(serveWithServerRendering()) as Server;

  await server.listen(3000);
  console.log("running on http://localhost:3000");
}

// main();
