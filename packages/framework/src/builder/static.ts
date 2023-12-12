import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRenderInfo } from "../renderStrategies";

export function renderStatic(Component: any): StaticRenderInfo {
  const html = renderToStaticMarkup(createElement(Component));
  return {
    type: "static",
    html,
  };
}
