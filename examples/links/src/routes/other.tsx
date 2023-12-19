import type { RenderStrategy } from "framework";

export const render: RenderStrategy = "server-only";

export default function OtherPage() {
  return <div>Other page is almost as good as Home Page</div>;
}
