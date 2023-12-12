import React from "react";
import type { RenderStrategy } from "framework";

export const render: RenderStrategy = "static";

export default function HomePage() {
  return <div>Stuff On Home page</div>;
}
