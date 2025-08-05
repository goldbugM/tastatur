import { test } from "node:test";
import { FakeIntlProvider, PreferredLocaleContext } from "@mkboard/intl";
import { PageDataContext } from "@mkboard/pages-shared";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { isNotNull } from "rich-assert";
import { NavMenu } from "./NavMenu.tsx";

test("render", () => {
  const r = render(
    <PageDataContext.Provider
      value={{
        base: "https://www.mkboard.com/",
        locale: "en",
        user: null,
        publicUser: {
          id: "userId",
          name: "userName",
          imageUrl: "imageUrl",
          premium: false,
        },
        settings: null,
      }}
    >
      <PreferredLocaleContext.Provider value="pl">
        <FakeIntlProvider>
          <MemoryRouter>
            <NavMenu currentPath="/page" />
          </MemoryRouter>
        </FakeIntlProvider>
      </PreferredLocaleContext.Provider>
    </PageDataContext.Provider>,
  );

  isNotNull(r.queryByText("userName"));
  isNotNull(r.queryByText("Polski"));
  isNotNull(r.queryByText("English"));

  r.unmount();
});
