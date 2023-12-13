import { readdir, mkdir, rm, stat } from "fs/promises";

// Must be the first import
import "preact/debug";

import { BUILD_DIR, ROUTER_DIR, parseConfig } from "./config";
import { buildRoute } from "./builder";
import { saveRoute } from "./saver";
import { join } from "path";

export { RenderStrategy } from "./renderStrategies";

async function buildAndSaveRoutes(directory: string) {
  const routeFiles = await readdir(directory);
  const routePromises: Promise<void>[] = [];
  for (const routeFile of routeFiles) {
    routePromises.push(
      (async () => {
        const routePath = join(directory, routeFile);
        if ((await stat(routePath)).isDirectory()) {
          return buildAndSaveRoutes(routePath);
        }

        const renderInfo = await buildRoute(routePath);
        // console.log(routePath, "Render Info:");
        // console.log(renderInfo);

        const routeSplit = routePath.replace(ROUTER_DIR, "").split(".");
        routeSplit.pop();
        const routeName = routeSplit.join(".");

        await saveRoute(routeName, renderInfo);
      })(),
    );
  }
  await Promise.all(routePromises);
}

async function main() {
  // console.log(
  //   "React",
  //   JSON.stringify(
  //     // @ts-ignore
  //     Object.keys(),
  //     null,
  //     2,
  //   ),
  // );
  // return;

  // This works, but means a lot of extra dev while (theoretically Preact Just Works™)
  // const dispatcher: Dispatcher = {
  //   use: function <T>(u: Usable<T>): T {
  //     throw new Error("Function not implemented.");
  //   },
  //   readContext: function <T>(context: React.Context<T>): T {
  //     throw new Error("Function not implemented.");
  //   },
  //   useState: function <S>(
  //     initialState: S | (() => S),
  //   ): [S, React.Dispatch<React.SetStateAction<S>>] {
  //     throw new Error("Function not implemented.");
  //   },
  //   useReducer: function <S, I, A>(
  //     reducer: (s: S, a: A) => S,
  //     initialArg: I,
  //     init?: ((i: I) => S) | undefined,
  //   ): [S, React.Dispatch<A>] {
  //     throw new Error("Function not implemented.");
  //   },
  //   useContext: function <T>(context: React.Context<T>): T {
  //     throw new Error("Function not implemented.");
  //   },
  //   useRef: function <T>(initialValue: T): { current: T } {
  //     throw new Error("Function not implemented.");
  //   },
  //   useEffect: function (
  //     create: () => void | (() => void),
  //     deps: void | any[] | null,
  //   ): void {
  //     throw new Error("Function not implemented.");
  //   },
  //   useInsertionEffect: function (
  //     create: () => void | (() => void),
  //     deps: void | any[] | null,
  //   ): void {
  //     throw new Error("Function not implemented.");
  //   },
  //   useLayoutEffect: function (
  //     create: () => void | (() => void),
  //     deps: void | any[] | null,
  //   ): void {
  //     throw new Error("Function not implemented.");
  //   },
  //   useCallback: function <T>(callback: T, deps: void | any[] | null): T {
  //     throw new Error("Function not implemented.");
  //   },
  //   useMemo: function <T>(nextCreate: () => T, deps: void | any[] | null): T {
  //     throw new Error("Function not implemented.");
  //   },
  //   useImperativeHandle: function <T>(
  //     ref:
  //       | void
  //       | {
  //           current: T | null;
  //         }
  //       | ((inst: T | null) => any)
  //       | null,
  //     create: () => T,
  //     deps: void | any[] | null,
  //   ): void {
  //     throw new Error("Function not implemented.");
  //   },
  //   useDebugValue: function <T>(
  //     value: T,
  //     formatterFn?: ((value: T) => any) | undefined,
  //   ): void {
  //     throw new Error("Function not implemented.");
  //   },
  //   useDeferredValue: function <T>(value: T, initialValue?: T | undefined): T {
  //     throw new Error("Function not implemented.");
  //   },
  //   useTransition: function (): [boolean, React.TransitionStartFunction] {
  //     throw new Error("Function not implemented.");
  //   },
  //   useSyncExternalStore: function <Snapshot>(
  //     subscribe: (onStoreChange: () => void) => () => void,
  //     getSnapshot: () => Snapshot,
  //     getServerSnapshot?: (() => Snapshot) | undefined,
  //   ): Snapshot {
  //     throw new Error("Function not implemented.");
  //   },
  //   useId: function (): string {
  //     throw new Error("Function not implemented.");
  //   },
  // };
  // setDispatcher(dispatcher);
  // useState("test");

  await parseConfig();

  await rm(BUILD_DIR, { recursive: true });
  await mkdir(BUILD_DIR, { recursive: true });

  await buildAndSaveRoutes(ROUTER_DIR);
}

main();
