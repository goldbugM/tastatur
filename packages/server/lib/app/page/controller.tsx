import { controller, http, pathParam, use } from "@fastr/controller";
import { Context } from "@fastr/core";
import { inject, injectable } from "@fastr/invert";
import { CanonicalHandler } from "@fastr/middleware-canonical";
import { type RouterState } from "@fastr/middleware-router";
import { defaultLocale, loadIntl, PreferredLocaleContext } from "@mkboard/intl";
import { Shell, View } from "@mkboard/pages-server";
import {
  type PageData,
  PageDataContext,
  PageInfo,
  Pages,
} from "@mkboard/pages-shared";
import { SettingsDatabase } from "@mkboard/settings-database";
import { staticTheme, ThemeContext, ThemePrefs } from "@mkboard/themes";
import { type IntlShape, RawIntlProvider } from "react-intl";
import { type AuthState } from "../auth/index.ts";
import { localePattern, pIntl, preferredLocale } from "./intl.ts";

@injectable()
@controller()
@use(CanonicalHandler)
export class Controller {
  constructor(
    @inject("canonicalUrl") readonly canonicalUrl: string,
    readonly view: View,
    readonly database: SettingsDatabase,
  ) {}

  @http.GET("/")
  async ["index"](ctx: Context<RouterState & AuthState>) {
    return this.renderPage(ctx, Pages.practice);
  }

  @http.GET(`/{locale:${localePattern}}`)
  async ["index-i18n"](
    ctx: Context<RouterState & AuthState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.practice, intl);
  }

  @http.GET("/index")
  async ["legacy-index"](ctx: Context<RouterState & AuthState>) {
    return this.renderPage(ctx, Pages.practice);
  }

  @http.GET(`/{locale:${localePattern}}/index`)
  async ["legacy-index-i18n"](
    ctx: Context<RouterState & AuthState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.practice, intl);
  }

  @http.GET(`${Pages.account.path}`)
  async ["account"](ctx: Context<RouterState & AuthState>) {
    return this.renderPage(ctx, Pages.account);
  }

  @http.GET(`/{locale:${localePattern}}${Pages.account.path}`)
  async ["account-i18n"](
    ctx: Context<RouterState & AuthState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.account, intl);
  }







  @http.GET(`${Pages.layouts.path}`)
  async ["layouts"](ctx: Context<RouterState & AuthState>) {
    return this.renderPage(ctx, Pages.layouts);
  }

  @http.GET(`/{locale:${localePattern}}${Pages.layouts.path}`)
  async ["layouts-i18n"](
    ctx: Context<RouterState & AuthState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.layouts, intl);
  }

  @http.GET(`${Pages.typingTest.path}`)
  async ["typing-test"](ctx: Context<RouterState & AuthState>) {
    return this.renderPage(ctx, Pages.typingTest);
  }

  @http.GET(`/{locale:${localePattern}}${Pages.typingTest.path}`)
  async ["typing-test-i18n"](
    ctx: Context<RouterState & AuthState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.typingTest, intl);
  }



  @http.GET(`${Pages.termsOfService.path}`)
  async ["terms-of-service"](ctx: Context<RouterState & AuthState>) {
    return this.renderPage(ctx, Pages.termsOfService);
  }

  @http.GET(`/{locale:${localePattern}}${Pages.termsOfService.path}`)
  async ["terms-of-service-i18n"](
    ctx: Context<RouterState & AuthState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.termsOfService, intl);
  }

  @http.GET(`${Pages.privacyPolicy.path}`)
  async ["privacy-policy"](ctx: Context<RouterState & AuthState>) {
    return this.renderPage(ctx, Pages.privacyPolicy);
  }

  @http.GET(`/{locale:${localePattern}}${Pages.privacyPolicy.path}`)
  async ["privacy-policy-i18n"](
    ctx: Context<RouterState & AuthState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.privacyPolicy, intl);
  }

  async pageData(
    ctx: Context<RouterState & AuthState>,
    { locale }: IntlShape,
  ): Promise<PageData> {
    const { user, publicUser, sessionId } = ctx.state;
    // Use session ID for settings when there's no user (anonymous users)
    const settingsId = user?.id ?? sessionId;
    const settings = await this.database.get(settingsId);
    return {
      base: this.canonicalUrl,
      locale,
      user: user?.toDetails() ?? null,
      publicUser,
      settings: settings?.toJSON() ?? null,
    };
  }

  async renderPage(
    ctx: Context<RouterState & AuthState>,
    page: PageInfo,
    intl: IntlShape | null = null,
  ): Promise<string> {
    if (intl == null) {
      intl = await loadIntl(defaultLocale);
    }

    const pageData = await this.pageData(ctx, intl);

    ctx.response.type = "text/html";

    ctx.response.headers.append("Link", this.view.preloadHeaders);

    return this.view.renderPage(
      <RawIntlProvider value={intl}>
        <PreferredLocaleContext.Provider value={preferredLocale(ctx)}>
          <PageDataContext.Provider value={pageData}>
            <ThemeContext.Provider value={staticTheme(themePrefs(ctx))}>
              <Shell page={page} headers={ctx.request.headers} />
            </ThemeContext.Provider>
          </PageDataContext.Provider>
        </PreferredLocaleContext.Provider>
      </RawIntlProvider>,
    );
  }
}

function themePrefs(ctx: Context<RouterState & AuthState>): ThemePrefs {
  let cookie = ctx.cookies.get(ThemePrefs.cookieKey) || null;
  if (cookie) {
    try {
      cookie = decodeURIComponent(cookie);
    } catch {
      cookie = null;
    }
  }
  return ThemePrefs.deserialize(cookie);
}
