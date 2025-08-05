import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { PageDataContext } from "@mkboard/pages-shared";
import { render } from "@testing-library/react";
import { isNotNull, isNull } from "rich-assert";
import { AccountPage } from "./AccountPage.tsx";

test("render sign-in fragment", () => {
  const r = render(
    <PageDataContext.Provider
      value={{
        base: "https://www.mkboard.com/",
        locale: "en",
        user: null,
        publicUser: {
          id: "xyz",
          name: "name",
          imageUrl: null,
          premium: false,
        },
        settings: null,
      }}
    >
      <FakeIntlProvider>
        <AccountPage />
      </FakeIntlProvider>
    </PageDataContext.Provider>,
  );

  isNotNull(r.queryByText("Anonymous User", { exact: false }));
  isNull(r.queryByText("You are using an account", { exact: false }));

  r.unmount();
});

test("render account fragment", () => {
  const r = render(
    <PageDataContext.Provider
      value={{
        base: "https://www.mkboard.com/",
        locale: "en",
        user: {
          id: "xzy",
          email: "name@mkboard.com",
          name: "name",
          anonymized: false,
          externalId: [
            {
              provider: "custom",
              id: "externalId",
              name: "externalName",
              url: "externalUrl",
              imageUrl: "externalImageUrl",
              createdAt: "2001-02-03T04:05:06.789Z",
            },
          ],
          order: null,
          createdAt: "2001-02-03T04:05:06.789Z",
        },
        publicUser: {
          id: "xyz",
          name: "name",
          imageUrl: null,
          premium: false,
        },
        settings: null,
      }}
    >
      <FakeIntlProvider>
        <AccountPage />
      </FakeIntlProvider>
    </PageDataContext.Provider>,
  );

  isNull(r.queryByText("Anonymous User", { exact: false }));
  isNotNull(r.queryByText("You are using an account", { exact: false }));

  r.unmount();
});
