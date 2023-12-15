import type { ComponentType } from "preact";
import type { Request, Response, UserRouteHandler } from "hyper-express";
import type { RenderStrategy } from "../renderStrategies";
import { renderStatic } from "../builder/static";

declare const route: {
  render?: RenderStrategy;
  default: ComponentType<never>;
};

export default (async function handler(req: Request, res: Response) {
  const { html } = renderStatic(route.default);
  res.end(html);
} satisfies UserRouteHandler);
