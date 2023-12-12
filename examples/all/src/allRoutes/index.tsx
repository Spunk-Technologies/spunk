import React, { useState } from "react";
import type { RenderStrategy } from "framework";

export const render: RenderStrategy = "client-only";

export default function HomePage() {
  const [count, setCount] = useState(0);
  return (
    <div>
      Stuff On Home page
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          Increment Me {count}
        </button>
      </div>
    </div>
  );
}
