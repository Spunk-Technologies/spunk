import React, {
  Context,
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
} from "react";
import { Thenable } from "react-reconciler";
// import {Dispatcher} from 'react-reconciler/src/ReactInternalTypes.js'
// import {Usable} from 'shared/ReactTypes.js'

export type Usable<T> = Thenable<T> | Context<T>;

export type Dispatcher = {
  use: <T>(u: Usable<T>) => T;
  readContext<T>(context: Context<T>): T;
  useState<S>(initialState: (() => S) | S): [S, Dispatch<SetStateAction<S>>];
  useReducer<S, I, A>(
    reducer: (s: S, a: A) => S,
    initialArg: I,
    init?: (i: I) => S,
  ): [S, Dispatch<A>];
  useContext<T>(context: Context<T>): T;
  useRef<T>(initialValue: T): { current: T };
  useEffect(
    create: () => (() => void) | void,
    deps: Array<any> | void | null,
  ): void;
  useEffectEvent?: <Args extends any[], F extends (...args: Args) => any>(
    callback: F,
  ) => F;
  useInsertionEffect(
    create: () => (() => void) | void,
    deps: Array<any> | void | null,
  ): void;
  useLayoutEffect(
    create: () => (() => void) | void,
    deps: Array<any> | void | null,
  ): void;
  useCallback<T>(callback: T, deps: Array<any> | void | null): T;
  useMemo<T>(nextCreate: () => T, deps: Array<any> | void | null): T;
  useImperativeHandle<T>(
    ref: { current: T | null } | ((inst: T | null) => any) | null | void,
    create: () => T,
    deps: Array<any> | void | null,
  ): void;
  useDebugValue<T>(value: T, formatterFn?: (value: T) => any): void;
  useDeferredValue<T>(value: T, initialValue?: T): T;
  useTransition(): [boolean, TransitionStartFunction];
  useSyncExternalStore<Snapshot>(
    subscribe: (onStoreChange: () => void) => () => void,
    getSnapshot: () => Snapshot,
    getServerSnapshot?: (() => Snapshot) | undefined,
  ): Snapshot;
  useId(): string;
  // useCacheRefresh?: () => <T>(?() => T, ?T) => void,
  // useMemoCache?: (size: number) => Array<any>,
  // useHostTransitionStatus?: () => TransitionStatus,
  // useOptimistic?: <S, A>(
  //   passthrough: S,
  //   reducer: ?(S, A) => S,
  // ) => [S, (A) => void],
  // useFormState?: <S, P>(
  //   action: (Awaited<S>, P) => S,
  //   initialState: Awaited<S>,
  //   permalink?: string,
  // ) => [Awaited<S>, (P) => void],
};

export function getDispatcher(): Dispatcher | null {
  // @ts-ignore
  return React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    .ReactCurrentDispatcher.current;
}

export function setDispatcher(dispatcher: Dispatcher | null) {
  // @ts-ignore
  return (React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher.current =
    dispatcher);
}
