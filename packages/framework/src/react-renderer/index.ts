import Reconciler from "react-reconciler";

type TODO = never;

type Type = TODO;
type Props = TODO;
type Container = TODO;
type Instance = TODO;
type TextInstance = TODO;
type SuspenseInstance = TODO;
type HydratableInstance = TODO;
type PublicInstance = TODO;
type HostContext = TODO;
type UpdatePayload = TODO;
type ChildSet = TODO;
type TimeoutHandle = TODO;
type NoTimeout = typeof NO_TIMEOUT_SYMBOL;

const NO_TIMEOUT_SYMBOL = Symbol.for("no-timeout");

const config: Reconciler.HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  supportsMutation: true,
  supportsPersistence: false,
  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: any,
  ) {
    throw new Error("createInstance() Function not implemented.");
  },
  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: any,
  ) {
    throw new Error("createTextInstance() Function not implemented.");
  },
  appendInitialChild(parentInstance: Instance, child: any): void {
    throw new Error("appendInitialChild() Function not implemented.");
  },
  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ): boolean {
    throw new Error("finalizeInitialChildren() Function not implemented.");
  },
  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext,
  ) {
    throw new Error("prepareUpdate() Function not implemented.");
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    throw new Error("shouldSetTextContent() Function not implemented.");
  },
  getRootHostContext(rootContainer: Container) {
    throw new Error("getRootHostContext() Function not implemented.");
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container,
  ) {
    throw new Error("getChildHostContext() Function not implemented.");
  },
  getPublicInstance(instance: any) {
    throw new Error("getPublicInstance() Function not implemented.");
  },
  prepareForCommit(containerInfo: Container): Record<string, any> | null {
    throw new Error("prepareForCommit() Function not implemented.");
  },
  resetAfterCommit(containerInfo: Container): void {
    throw new Error("resetAfterCommit() Function not implemented.");
  },
  preparePortalMount(containerInfo: Container): void {
    throw new Error("preparePortalMount() Function not implemented.");
  },
  scheduleTimeout(
    fn: (...args: unknown[]) => unknown,
    delay?: number | undefined,
  ) {
    throw new Error("scheduleTimeout() Function not implemented.");
  },
  cancelTimeout(id: TimeoutHandle): void {
    throw new Error("cancelTimeout() Function not implemented.");
  },
  noTimeout: NO_TIMEOUT_SYMBOL,
  isPrimaryRenderer: false,
  getCurrentEventPriority(): number {
    throw new Error("getCurrentEventPriority() Function not implemented.");
  },
  getInstanceFromNode(node: any): Reconciler.Fiber | null | undefined {
    throw new Error("getInstanceFromNode() Function not implemented.");
  },
  beforeActiveInstanceBlur(): void {
    throw new Error("beforeActiveInstanceBlur() Function not implemented.");
  },
  afterActiveInstanceBlur(): void {
    throw new Error("afterActiveInstanceBlur() Function not implemented.");
  },
  prepareScopeUpdate(scopeInstance: any, instance: any): void {
    throw new Error("prepareScopeUpdate() Function not implemented.");
  },
  getInstanceFromScope(scopeInstance: any) {
    throw new Error("getInstanceFromScope() Function not implemented.");
  },
  detachDeletedInstance(node: Instance): void {
    throw new Error("detachDeletedInstance() Function not implemented.");
  },
  supportsHydration: true,

  canHydrateInstance(
    instance: HydratableInstance,
    type: Type,
    props: Props,
  ): null | Instance {
    throw new Error("canHydrateInstance() Function not implemented.");
  },

  canHydrateTextInstance(
    instance: HydratableInstance,
    text: string,
  ): null | TextInstance {
    throw new Error("canHydrateTextInstance() Function not implemented.");
  },

  canHydrateSuspenseInstance(
    instance: HydratableInstance,
  ): null | SuspenseInstance {
    throw new Error("canHydrateSuspenseInstance() Function not implemented.");
  },

  isSuspenseInstancePending(instance: SuspenseInstance): boolean {
    throw new Error("isSuspenseInstancePending() Function not implemented.");
  },

  isSuspenseInstanceFallback(instance: SuspenseInstance): boolean {
    throw new Error("isSuspenseInstanceFallback() Function not implemented.");
  },

  registerSuspenseInstanceRetry(
    instance: SuspenseInstance,
    callback: () => void,
  ): void {
    throw new Error(
      "registerSuspenseInstanceRetry() Function not implemented.",
    );
  },

  getNextHydratableSibling(
    instance: HydratableInstance,
  ): null | HydratableInstance {
    throw new Error("getNextHydratableSibling() Function not implemented.");
  },

  getFirstHydratableChild(
    parentInstance: Container | Instance,
  ): null | HydratableInstance {
    throw new Error("getFirstHydratableChild() Function not implemented.");
  },

  hydrateInstance(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainerInstance: Container,
    hostContext: HostContext,
    internalInstanceHandle: any,
  ): null | any[] {
    throw new Error("hydrateInstance() Function not implemented.");
  },

  hydrateTextInstance(
    textInstance: TextInstance,
    text: string,
    internalInstanceHandle: any,
  ): boolean {
    throw new Error("hydrateTextInstance() Function not implemented.");
  },

  hydrateSuspenseInstance(
    suspenseInstance: SuspenseInstance,
    internalInstanceHandle: any,
  ): void {
    throw new Error("hydrateSuspenseInstance() Function not implemented.");
  },

  getNextHydratableInstanceAfterSuspenseInstance(
    suspenseInstance: SuspenseInstance,
  ): null | HydratableInstance {
    throw new Error(
      "getNextHydratableInstanceAfterSuspenseInstance() Function not implemented.",
    );
  },

  // Returns the SuspenseInstance if this node is a direct child of a
  // SuspenseInstance. I.e. if its previous sibling is a Comment with
  // SUSPENSE_x_START_DATA. Otherwise, null.
  getParentSuspenseInstance(targetInstance: any): null | SuspenseInstance {
    throw new Error("getParentSuspenseInstance() Function not implemented.");
  },

  commitHydratedContainer(container: Container): void {
    throw new Error("commitHydratedContainer() Function not implemented.");
  },

  commitHydratedSuspenseInstance(suspenseInstance: SuspenseInstance): void {
    throw new Error(
      "commitHydratedSuspenseInstance() Function not implemented.",
    );
  },

  didNotMatchHydratedContainerTextInstance(
    parentContainer: Container,
    textInstance: TextInstance,
    text: string,
  ): void {
    throw new Error(
      "didNotMatchHydratedContainerTextInstance() Function not implemented.",
    );
  },

  didNotMatchHydratedTextInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    textInstance: TextInstance,
    text: string,
  ): void {
    throw new Error(
      "didNotMatchHydratedTextInstance() Function not implemented.",
    );
  },

  didNotHydrateContainerInstance(
    parentContainer: Container,
    instance: HydratableInstance,
  ): void {
    throw new Error(
      "didNotHydrateContainerInstance() Function not implemented.",
    );
  },

  didNotHydrateInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    instance: HydratableInstance,
  ): void {
    throw new Error("didNotHydrateInstance() Function not implemented.");
  },

  didNotFindHydratableContainerInstance(
    parentContainer: Container,
    type: Type,
    props: Props,
  ): void {
    throw new Error(
      "didNotFindHydratableContainerInstance() Function not implemented.",
    );
  },

  didNotFindHydratableContainerTextInstance(
    parentContainer: Container,
    text: string,
  ): void {
    throw new Error(
      "didNotFindHydratableContainerTextInstance() Function not implemented.",
    );
  },

  didNotFindHydratableContainerSuspenseInstance(
    parentContainer: Container,
  ): void {
    throw new Error(
      "didNotFindHydratableContainerSuspenseInstance() Function not implemented.",
    );
  },

  didNotFindHydratableInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    type: Type,
    props: Props,
  ): void {
    throw new Error("didNotFindHydratableInstance() Function not implemented.");
  },

  didNotFindHydratableTextInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
    text: string,
  ): void {
    throw new Error(
      "didNotFindHydratableTextInstance() Function not implemented.",
    );
  },

  didNotFindHydratableSuspenseInstance(
    parentType: Type,
    parentProps: Props,
    parentInstance: Instance,
  ): void {
    throw new Error(
      "didNotFindHydratableSuspenseInstance() Function not implemented.",
    );
  },

  errorHydratingContainer(parentContainer: Container): void {
    throw new Error("errorHydratingContainer() Function not implemented.");
  },
};

const render = Reconciler(config);
