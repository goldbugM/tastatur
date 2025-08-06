import { usePageData } from "@mkboard/pages-shared";
import { PortalContainer, Toaster } from "@mkboard/widget";
import { type ReactNode } from "react";
import { NavMenu } from "./NavMenu.tsx";
import * as styles from "./Template.module.less";

export function Template({
  path,
  children,
}: {
  readonly path: string;
  readonly children: ReactNode;
}) {
  const { publicUser } = usePageData();
  return (
    <div className={styles.bodyAlt}>
      <main className={styles.mainAlt}>
        {children}
        <PortalContainer />
        <Toaster />
      </main>
      <nav className={styles.navAlt}>
        <NavMenu currentPath={path} />
      </nav>
      <EnvName />
    </div>
  );
}

function EnvName() {
  return process.env.NODE_ENV === "production" ? null : (
    <div
      style={{
        position: "fixed",
        zIndex: "1",
        insetInlineEnd: "0px",
        insetBlockEnd: "0px",
        padding: "5px",
        margin: "5px",
        border: "1px solid red",
        color: "red",
      }}
    >
      {`process.env.NODE_ENV=${process.env.NODE_ENV}`}
    </div>
  );
}
