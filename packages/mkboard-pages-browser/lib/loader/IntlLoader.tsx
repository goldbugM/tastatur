import { catchError } from "@mkboard/debug";
import { loadIntl } from "@mkboard/intl";
import { LoadingProgress, usePageData } from "@mkboard/pages-shared";
import { type ReactNode, useEffect, useState } from "react";
import { type IntlShape, RawIntlProvider } from "react-intl";

export function IntlLoader({
  children,
  fallback = <LoadingProgress />,
}: {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}) {
  const result = useIntlLoader();
  if (result == null) {
    return fallback;
  } else {
    return <RawIntlProvider value={result}>{children}</RawIntlProvider>;
  }
}

export function useIntlLoader(): IntlShape | null {
  const { locale } = usePageData();
  const [intl, setIntl] = useState<IntlShape | null>(null);

  useEffect(() => {
    let didCancel = false;

    console.log("IntlLoader: Starting to load intl for locale:", locale);
    loadIntl(locale)
      .then((intl) => {
        console.log("IntlLoader: Successfully loaded intl:", intl);
        if (!didCancel) {
          setIntl(intl);
          console.log("IntlLoader: Set intl state");
        }
      })
      .catch((error) => {
        console.error("IntlLoader: Failed to load intl:", error);
        catchError(error);
      });

    return () => {
      didCancel = true;
    };
  }, [locale]);

  console.log("IntlLoader: Current intl state:", intl);
  return intl;
}
