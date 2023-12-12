import React from "react";
import type { RenderStrategy } from "framework";

export const render: RenderStrategy = "static";

export default function DirPage() {
  return <div>Dir page has a sub index</div>;
}
