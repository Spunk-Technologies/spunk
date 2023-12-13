import { h, options } from "preact";
import { renderToString } from "preact-render-to-string";
// import { createRoot } from "react-dom/client";
import { ClientOnlyRenderInfo } from "../renderStrategies";
import { CompileType, compileStringWithDeps } from "../compiler/esbuild";
import { tryOrPrintAndThrow } from "../logging/errorHandling";
import { RENDER } from "../preact/constants";
// import { Writable } from "stream";
// import { JSDOM } from "jsdom";

const FIRST_HTML_TAG_REGEX = /^<[a-zA-Z]+>/;

// const dom = new JSDOM();
// globalThis.window = dom.window as any;

export async function renderClientOnly(
  Component: any,
  routeFile: string,
): Promise<ClientOnlyRenderInfo> {
  // @ts-ignore
  // options[RENDER] = (vnode) => {
  //   throw new Error("I broke it");
  // };
  // console.log("options", JSON.stringify(options, null, 2));
  const html = tryOrPrintAndThrow(`failed to render ${routeFile}`, () =>
    renderToString(
      tryOrPrintAndThrow(`failed to create element`, () => h(Component, null)),
    ),
  );

  // const { pipe, abort } = renderToPipeableStream(createElement(Component), {});

  // const html = await new Promise<string>((r, f) => {
  //   const res: any[] = [];
  //   const writer = new Writable({
  //     write(chunk, encoding, callback) {
  //       res.push(chunk);
  //       callback();
  //     },
  //   });
  //   writer.on("close", () => {
  //     r(res.join(""));
  //   });
  //   pipe(writer);
  // });

  // const container = dom.window.document.documentElement;
  // const root = createRoot(container);
  // root.render(createElement(Component));

  // const html = dom.serialize();

  const rawTag = html.match(FIRST_HTML_TAG_REGEX)?.[0];
  if (!rawTag) {
    console.log(
      "no html tag matches when generating client-only script tag...ignoring",
    );
    throw new Error();
  }

  const rootId = "root"; // TODO perhaps randomly generate here?

  const src = await compileStringWithDeps(
    CompileType.Module,
    [routeFile],
    `
    import {h, hydrate} from "preact";
    import Component from "./${routeFile}";

    function clientSideMain() {
      const rootNode = document.getElementById("${rootId}");
      if (!rootNode) {
        throw new Error(\`can not find a tag with id "${rootId}". what?\`);
      }

      hydrate(h(Component, null), rootNode);
    }

    clientSideMain();
  `,
  );
  return {
    type: "client-only",
    html: `<div id="${rootId}">${html}</div>`,
    javascript: src,
  };
}
