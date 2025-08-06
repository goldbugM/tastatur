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
import { staticTheme, ThemeContext, ThemePrefs } from "@mkboard/themes";
import { type IntlShape, RawIntlProvider } from "react-intl";
import { localePattern, pIntl, preferredLocale } from "./intl.ts";

@injectable()
@controller()
@use(CanonicalHandler)
export class Controller {
  constructor(
    @inject("canonicalUrl") readonly canonicalUrl: string,
    readonly view: View,
  ) {}

  @http.GET("/")
  async ["index"](ctx: Context<RouterState>) {
    return this.renderPage(ctx, Pages.practice);
  }

  @http.GET(`/{locale:${localePattern}}`)
  async ["index-i18n"](
    ctx: Context<RouterState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.practice, intl);
  }

  @http.GET("/index")
  async ["legacy-index"](ctx: Context<RouterState>) {
    return this.renderPage(ctx, Pages.practice);
  }

  @http.GET(`/{locale:${localePattern}}/index`)
  async ["legacy-index-i18n"](
    ctx: Context<RouterState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.practice, intl);
  }









  @http.GET(`${Pages.layouts.path}`)
  async ["layouts"](ctx: Context<RouterState>) {
    return this.renderPage(ctx, Pages.layouts);
  }

  @http.GET(`/{locale:${localePattern}}${Pages.layouts.path}`)
  async ["layouts-i18n"](
    ctx: Context<RouterState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.layouts, intl);
  }

  @http.GET(`${Pages.typingTest.path}`)
  async ["typing-test"](ctx: Context<RouterState>) {
    return this.renderPage(ctx, Pages.typingTest);
  }

  @http.GET(`/{locale:${localePattern}}${Pages.typingTest.path}`)
  async ["typing-test-i18n"](
    ctx: Context<RouterState>,
    @pathParam("locale", pIntl) intl: IntlShape,
  ) {
    return this.renderPage(ctx, Pages.typingTest, intl);
  }





  async pageData(
    ctx: Context<RouterState>,
    { locale }: IntlShape,
  ): Promise<PageData> {
    return {
      base: this.canonicalUrl,
      locale,
      user: null,
      publicUser: null,
      settings: null,
    };
  }

  async renderPage(
    ctx: Context<RouterState>,
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

function themePrefs(ctx: Context<RouterState>): ThemePrefs {
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
