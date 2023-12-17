import { ComponentChildren } from "preact";

export type LinkProps = (
  | {
      to: Routes.Path;
    }
  | {
      toExternal: string;
    }
) & {
  children?: ComponentChildren;
};

export function Link(props: LinkProps) {
  return (
    <a href={"to" in props ? props.to : props.toExternal}>{props.children}</a>
  );
}
