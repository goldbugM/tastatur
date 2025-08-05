import { ErrorHandler } from "@mkboard/debug";
import {
  getPageData,
  LoadingProgress,
  PageDataContext,
  Pages,
  Root,
} from "@mkboard/pages-shared";
import { SettingsLoader } from "@mkboard/settings-loader";
import { querySelector } from "@mkboard/widget";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { useIntl } from "react-intl";
import { BrowserRouter, Route, Routes } from "react-router";
import { IntlLoader } from "./loader/IntlLoader.tsx";
import { Template } from "./Template.tsx";
import { ThemeProvider } from "./themes/ThemeProvider.tsx";
import { Title } from "./Title.tsx";

export function main() {
  createRoot(querySelector(Root.selector)).render(<App />);
}

const AccountPage = lazy(() => import("./pages/account.tsx"));
const LayoutsPage = lazy(() => import("./pages/layouts.tsx"));
const PracticePage = lazy(() => import("./pages/practice.tsx"));
const TypingTestPage = lazy(() => import("./pages/typing-test.tsx"));
const TermsOfServicePage = lazy(() => import("./pages/terms-of-service.tsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/privacy-policy.tsx"));

export function App() {
  return (
    <PageDataContext.Provider value={getPageData()}>
      <ErrorHandler>
        <IntlLoader>
          <SettingsLoader>
            <ThemeProvider>
              <PageRoutes />
            </ThemeProvider>
          </SettingsLoader>
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
          path={Pages.account.path}
          element={
            <Template path={Pages.account.path}>
              <Title page={Pages.account} />
              <Suspense fallback={<LoadingProgress />}>
                <AccountPage />
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
          path={Pages.termsOfService.path}
          element={
            <Template path={Pages.termsOfService.path}>
              <Title page={Pages.termsOfService} />
              <Suspense fallback={<LoadingProgress />}>
                <TermsOfServicePage />
              </Suspense>
            </Template>
          }
        />
        <Route
          path={Pages.privacyPolicy.path}
          element={
            <Template path={Pages.privacyPolicy.path}>
              <Title page={Pages.privacyPolicy} />
              <Suspense fallback={<LoadingProgress />}>
                <PrivacyPolicyPage />
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
