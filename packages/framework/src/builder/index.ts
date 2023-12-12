import { build } from "esbuild";
import { readFile } from "fs/promises";
import { ROUTER_DIR, DEFAULT_RENDERING_STRATEGY } from "../config";
import { RenderInfo, isRenderStrategy } from "../renderStrategies";
import { requireFromString } from "../userModuleParser";
import { renderStatic } from "./static";

// import {Server, render} from "@state-less/react-server";
// import { jsx } from "@state-less/react-server/dist/jsxRenderer/jsx-runtime";

// import { PrerenderedComponent } from "react-prerendered-component";

export async function buildRoute(routeFile: string): Promise<RenderInfo> {
  const { dependencies = {}, peerDependencies = {} } = JSON.parse(
    (await readFile("./package.json", { encoding: "utf-8" })) || "{}",
  );

  const sharedConfig = {
    entryPoints: [routeFile],
    bundle: true,
    minify: false,
    write: false,
    external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
  };

  // const buildFile = `${BUILD_DIR}/tmp/${route}.js`;
  const buildResult = await build({
    ...sharedConfig,
    platform: "node", // for CJS
    // outfile: buildFile,
  });

  if (buildResult.errors.length > 0) {
    console.log(routeFile, "has errors");
    for (const error of buildResult.errors) {
      console.log(error);
    }
    throw new Error();
  }

  if ((buildResult.outputFiles?.length || 0) > 1) {
    console.log(routeFile, "has than 1 output file?");
    throw new Error();
  }

  const { default: Component, render = DEFAULT_RENDERING_STRATEGY } =
    requireFromString(buildResult.outputFiles![0].text, routeFile, ROUTER_DIR, [
      // "@state-less/react-server",
    ]) || {};

  if (!Component) {
    throw new Error(`${routeFile} is missing default exported Component`);
  }

  if (!isRenderStrategy(render)) {
    throw new Error(`${render} is not a valid render strategy`);
  }

  // TODO do I need this?
  // if it uses react hooks it will throw and can not be prerendered
  // const reactNode = Component();
  // console.log("reactNode");
  // console.log(JSON.stringify(reactNode, null, 2));

  // @state-less/react-server
  // const rootNode = jsx(Server, { children: [jsx(Component, {})] });
  // const renderResult = render(rootNode);

  // react-prerendered-component
  // PrerenderedComponent;

  switch (render) {
    case "static":
      return renderStatic(Component);
    case "client-only":
    // TODO render static then hydrate with ReactDOM.hydrate on client
    default:
      throw new Error(`${render} render strategy not implemented yet`);
  }
}
