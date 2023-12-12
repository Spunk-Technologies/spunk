import { ROUTER_DIR, DEFAULT_RENDERING_STRATEGY } from "../config";
import { RenderInfo, isRenderStrategy } from "../renderStrategies";
import { requireFromString } from "../userModuleParser";
import { renderStatic } from "./static";
import { renderClientOnly } from "./clientOnly";
import { CompileType, compile } from "../compiler/esbuild";
import { tryOrPrint } from "../logging/errorHandling";

// import {Server, render} from "@state-less/react-server";
// import { jsx } from "@state-less/react-server/dist/jsxRenderer/jsx-runtime";

// import { PrerenderedComponent } from "react-prerendered-component";

export async function buildRoute(routeFile: string): Promise<RenderInfo> {
  const src: string = await compile(routeFile, CompileType.CommonJS);

  const { default: Component, render = DEFAULT_RENDERING_STRATEGY } =
    requireFromString(src, routeFile, ROUTER_DIR, [
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
      return (
        tryOrPrint(
          () => [src],
          () => renderClientOnly(Component, routeFile),
        ) || {
          type: "static",
          html: "build error",
        }
      );
    default:
      throw new Error(`${render} render strategy not implemented yet`);
  }
}
