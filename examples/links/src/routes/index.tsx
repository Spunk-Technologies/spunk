import type { RenderStrategy } from "framework";
import { Link } from "@framework/router";

export const render: RenderStrategy = "client-only";

export default function HomePage() {
  return (
    <div>
      {/* This is a type safe link to a local route */}
      <Link to="/other/">Other Link</Link>

      {/* Notice how this gives a type error since the route doesn't exist */}
      {/* @ts-expect-error */}
      <Link to="/does-not-exist">Local Link Does Not Exist</Link>

      {/* Even if this route isn't explicitly created, it can still be added */}
      {/* See src/userDefinedRoutes.d.ts for details */}
      <Link to="/user/">Local Link Does Not Exist</Link>

      {/* In fact, TS is so smart it might make suggests if a typo was made */}
      {/* Type '"/othe"' is not assignable to type 'Path'. Did you mean '"/other/"'? */}
      {/* @ts-expect-error */}
      <Link to="/othe">Almost Other Link</Link>

      {/* There is even type checking for external links too */}
      <Link toExternal="http://fake.test">External Link</Link>

      {/* If the toExternal prop is used for a local route, it will give you a type error containing 'use_to_prop_instead' */}
      {/* Type '"/other/"' is not assignable to type 'use_to_prop_instead & "/other/"'. */}
      {/* @ts-expect-error */}
      <Link toExternal="/other/">Local Link As External Link</Link>

      {/* The toExternal prop also handles some common errors when linking to an external site */}
      {/* If this is the case, the type error will include 'ensure_external_link_format' */}
      {/* Type '"bad-format.test"' is not assignable to type 'ensure_external_link_format & "bad-format.test"'. */}
      {/* @ts-expect-error */}
      <Link toExternal="bad-format.test">
        Incorrectly Formatted External Link
      </Link>
    </div>
  );
}
