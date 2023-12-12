import React from "react";
import ReactDOM from "react-dom/client";

export async function clientSideMain(tag: string, Component: any) {
  const rootNode = document.getElementsByTagName(tag)[0];
  if (!rootNode) {
    throw new Error(`can not find a ${tag} tag. what?`);
  }

  const root = ReactDOM.hydrateRoot(rootNode, React.createElement(Component));
}
