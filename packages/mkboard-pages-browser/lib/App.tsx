import { ErrorHandler } from "@mkboard/debug";
import {
  getPageData,
  LoadingProgress,
  PageDataContext,
  Pages,
  Root,
} from "@mkboard/pages-shared";
import { ResultContext } from "@mkboard/result";
import { Settings, SettingsContext } from "@mkboard/settings";
import { querySelector } from "@mkboard/widget";
import { lazy, Suspense, useState } from "react";
import { createRoot } from "react-dom/client";
import { useIntl } from "react-intl";
import { BrowserRouter, Route, Routes } from "react-router";
import { IntlLoader } from "./loader/IntlLoader.tsx";
import { Template } from "./Template.tsx";
import { ThemeProvider } from "./themes/ThemeProvider.tsx";
import { Title } from "./Title.tsx";

export function main() {
  // Try to find the root element, with fallback to a generic root element
  let rootElement;
  try {
    rootElement = querySelector(Root.selector);
  } catch (error) {
    console.warn(
      `Root element with selector ${Root.selector} not found, trying fallback selectors`,
    );
    // Try common fallback selectors
    const fallbackSelectors = [
      "#root",
      "[data-react-root]",
      "body > div:first-child",
    ];
    for (const selector of fallbackSelectors) {
      try {
        rootElement = querySelector(selector);
        console.log(`Using fallback selector: ${selector}`);
        break;
      } catch (e) {
        continue;
      }
    }

    if (!rootElement) {
      // Create a root element if none exists
      rootElement = document.createElement("div");
      rootElement.id = "root";
      document.body.appendChild(rootElement);
      console.log("Created new root element");
    }
  }

  createRoot(rootElement).render(<App />);
}

const LayoutsPage = lazy(() => import("./pages/layouts.tsx"));
const PracticePage = lazy(() => import("./pages/practice.tsx"));
const TypingTestPage = lazy(() => import("./pages/typing-test.tsx"));

export function App() {
  const [settings, setSettings] = useState(() => new Settings());
  const [results, setResults] = useState<readonly any[]>([]);

  return (
    <PageDataContext.Provider value={getPageData()}>
      <ErrorHandler>
        <IntlLoader>
          <ThemeProvider>
            <SettingsContext.Provider
              value={{
                settings,
                updateSettings: setSettings,
              }}
            >
              <ResultContext.Provider
                value={{
                  results,
                  appendResults: (newResults) => {
                    setResults((prev) => [...prev, ...newResults]);
                  },
                  clearResults: () => {
                    setResults([]);
                  },
                }}
              >
                <PageRoutes />
              </ResultContext.Provider>
            </SettingsContext.Provider>
          </ThemeProvider>
        </IntlLoader>
      </ErrorHandler>
    </PageDataContext.Provider>
  );
}

function PageRoutes() {
  const { locale } = useIntl();
  return (
    <BrowserRouter basename={Pages.intlBase(locale)}>
      <Routes>
        <Route
          index={true}
          path={Pages.practice.path}
          element={
            <Template path={Pages.practice.path}>
              <Title page={Pages.practice} />
              <Suspense fallback={<LoadingProgress />}>
                <PracticePage />
              </Suspense>
            </Template>
          }
        />
        <Route
          path={Pages.layouts.path}
          element={
            <Template path={Pages.layouts.path}>
              <Title page={Pages.layouts} />
              <Suspense fallback={<LoadingProgress />}>
                <LayoutsPage />
              </Suspense>
            </Template>
          }
        />
        <Route
          path={Pages.typingTest.path}
          element={
            <Template path={Pages.typingTest.path}>
              <Title page={Pages.typingTest} />
              <Suspense fallback={<LoadingProgress />}>
                <TypingTestPage />
              </Suspense>
            </Template>
          }
        />
        <Route
          path="*"
          element={
            <Template path={Pages.practice.path}>
              <Title page={Pages.practice} />
              <Suspense fallback={<LoadingProgress />}>
                <PracticePage />
              </Suspense>
            </Template>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
