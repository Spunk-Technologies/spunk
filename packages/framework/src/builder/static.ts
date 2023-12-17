import { h, ComponentType, VNode } from "preact";
import renderToString from "preact-render-to-string";
import { StaticRenderInfo } from "../renderStrategies";

export function renderStatic(
  Component: ComponentType<never>,
): StaticRenderInfo {
  const html = renderToString(h(Component, null as never) as VNode);
  return {
    type: "static",
    html,
  };
}
