import { createElement } from "react";
import { renderToPipeableStream, renderToString } from "react-dom/server";
// import { createRoot } from "react-dom/client";
import { ClientOnlyRenderInfo } from "../renderStrategies";
import { CompileType, compileStringWithDeps } from "../compiler/esbuild";
import { tryOrPrintAndThrow } from "../logging/errorHandling";
// import { Writable } from "stream";
import { JSDOM } from "jsdom";

const FIRST_HTML_TAG_REGEX = /^<[a-zA-Z]+>/;

const dom = new JSDOM();
globalThis.window = dom.window as any;

export async function renderClientOnly(
  Component: any,
  routeFile: string,
): Promise<ClientOnlyRenderInfo> {
  const html = tryOrPrintAndThrow(`failed to render ${routeFile}`, () =>
    renderToString(
      tryOrPrintAndThrow(`failed to create element`, () =>
        createElement(Component),
      ),
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

  const tag = rawTag.substring(1, rawTag.length - 1);

  const src = await compileStringWithDeps(
    CompileType.Module,
    [routeFile],
    `
    import React from "react";
    import ReactDOM from "react-dom/client";
    import Component from "./${routeFile}";

    async function clientSideMain() {
      const rootNode = document.getElementsByTagName(tag)[0];
      if (!rootNode) {
        throw new Error(\`can not find a ${tag} tag. what?\`);
      }

      const root = ReactDOM.hydrateRoot(rootNode, React.createElement(Component));
    }

    clientSideMain();
  `,
  );
  return {
    type: "client-only",
    html,
    javascript: src,
  };
}
