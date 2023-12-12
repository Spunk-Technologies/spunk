import React from "react";
import type { RenderStrategy } from "framework";

export const render: RenderStrategy = "static";

export default function SubPage() {
  return <div>Sub page is below the ocean</div>;
}
