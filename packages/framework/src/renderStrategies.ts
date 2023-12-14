const VALID_RENDER_STRATEGIES = [
  "static",
  "server-and-client",
  "client-only",
  "server-only",
] as const;

export type RenderStrategy = (typeof VALID_RENDER_STRATEGIES)[number];

type GenericRenderInfo = {
  type: RenderStrategy;
};

export interface StaticRenderInfo extends GenericRenderInfo {
  type: "static";
  html: string;
}

export interface ClientOnlyRenderInfo extends GenericRenderInfo {
  type: "client-only";
  html: string;
  javascript: string;
}

export interface ServerOnlyRenderInfo extends GenericRenderInfo {
  type: "server-only";
  javascript: string;
}

export type RenderInfo = GenericRenderInfo &
  (StaticRenderInfo | ClientOnlyRenderInfo | ServerOnlyRenderInfo);

export function isRenderStrategy(strat: any): strat is RenderStrategy {
  return VALID_RENDER_STRATEGIES.includes(strat);
}
