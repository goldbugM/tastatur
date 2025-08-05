import { LoadingProgress, usePageData } from "@mkboard/pages-shared";
import { type SettingsStorage } from "@mkboard/settings";
import { type ReactNode, useMemo } from "react";
import { useLoader } from "./internal/loader.ts";
import { SettingsProvider } from "./internal/SettingsProvider.tsx";
import { openSettingsStorage } from "./internal/storage.ts";

export function SettingsLoader({
  children,
  fallback = <LoadingProgress />,
}: {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}): ReactNode {
  const storage = useSettingsStorage();
  const settings = useLoader(storage);
  if (settings == null) {
    return fallback;
  } else {
    return (
      <SettingsProvider storage={storage} initialSettings={settings}>
        {children}
      </SettingsProvider>
    );
  }
}

function useSettingsStorage(): SettingsStorage {
  const pageData = usePageData();
  return useMemo(() => {
    const { publicUser, settings } = pageData;
    // Use session ID for anonymous users (publicUser.id is now the session ID)
    return openSettingsStorage(publicUser.id, settings);
  }, [pageData]);
}
