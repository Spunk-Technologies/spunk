import React from "react";
import type { RenderStrategy } from "framework";

export const render: RenderStrategy = "static";

export default function OtherPage() {
  return <div>Other page is almost as good as Home Page</div>;
}
