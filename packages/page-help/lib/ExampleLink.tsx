import { type ReactNode } from "react";

export function ExampleLink({
  index,
  children,
}: {
  readonly index: 1 | 2 | 3 | 4 | 5;
  readonly children: ReactNode;
}): ReactNode {
  return (
    <span>
      {children}
    </span>
  );
}
