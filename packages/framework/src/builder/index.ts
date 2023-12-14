import { ROUTER_DIR, DEFAULT_RENDERING_STRATEGY } from "../config";
import { RenderInfo, isRenderStrategy } from "../renderStrategies";
import { requireFromString } from "../userModuleParser";
import { renderStatic } from "./static";
import { renderClientOnly } from "./clientOnly";
import { CompileType, compileDynamic } from "../compiler/esbuild";
import { tryOrPrint } from "../logging/errorHandling";
import { ComponentType, h } from "preact";

// import {Server, render} from "@state-less/react-server";
// import { jsx } from "@state-less/react-server/dist/jsxRenderer/jsx-runtime";

// import { PrerenderedComponent } from "react-prerendered-component";

export async function buildRoute(routeFile: string): Promise<RenderInfo> {
  const src: string = await compileDynamic(routeFile, CompileType.CommonJS);

  const { Component, render = DEFAULT_RENDERING_STRATEGY } = getModuleFields(
    requireFromString(src, routeFile, ROUTER_DIR, [
      // "@state-less/react-server",
    ]),
  );

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
          (e) => [
            src,
            "\n\n=============================================\n\n",
            e.toString(),
            e.stack,
          ],
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

function getModuleFields(
  mod: unknown,
): Partial<{ Component: ComponentType<never>; render: unknown }> {
  const res: Partial<{ Component: ComponentType<never>; render: unknown }> = {};
  if (typeof mod !== "object") {
    throw new Error(
      "exports is not an object. what is going on?\n" +
        "Please file an issue with this stacktrace and a link to your project.\n" +
        "https://github.com/Geo25rey/framework-without-a-name/issues",
    );
  }

  if (!mod) {
    throw new Error(
      "exports is a null object. what is going on?\n" +
        "Please file an issue with this stacktrace and a link to your project.\n" +
        "https://github.com/Geo25rey/framework-without-a-name/issues",
    );
  }

  if ("default" in mod) {
    h(mod.default as any, null);
    res.Component = mod.default as any;
  }

  if ("render" in mod) {
    res.render = mod.render;
  }

  return res;
}
