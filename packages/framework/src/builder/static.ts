import { h } from "preact";
import renderToString from "preact-render-to-string";
import { StaticRenderInfo } from "../renderStrategies";

export function renderStatic(Component: any): StaticRenderInfo {
  const html = renderToString(h(Component, {}));
  return {
    type: "static",
    html,
  };
}
