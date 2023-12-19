import { ComponentChildren } from "preact";

type use_to_prop_instead = Record<any, never>;
type ensure_external_link_format = Record<any, never>;

type NotLocalRoute<ExternalPath extends string> =
  ExternalPath extends `/${string}`
    ? ExternalPath extends Routes.Path
      ? use_to_prop_instead
      : never
    : ExternalPath extends `${string}://${string}`
      ? ExternalPath
      : ensure_external_link_format;

export type LinkProps<ExternalPath extends string> = (
  | {
      to: Routes.Path;
    }
  | {
      toExternal: NotLocalRoute<ExternalPath> & ExternalPath;
    }
) & {
  children?: ComponentChildren;
};

export function Link<ExternalPath extends string>(
  props: LinkProps<ExternalPath>,
) {
  return (
    <a href={"to" in props ? props.to : props.toExternal}>{props.children}</a>
  );
}
