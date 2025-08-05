import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { FakeSettingsContext } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { isNotNull } from "rich-assert";
import { HelpPage } from "./HelpPage.tsx";

test("render", () => {
  const r = render(
    <FakeIntlProvider>
      <MemoryRouter>
        <FakeSettingsContext>
          <HelpPage />
        </FakeSettingsContext>
      </MemoryRouter>
    </FakeIntlProvider>,
  );

  isNotNull(r.queryByText("Learn to type faster"));

  r.unmount();
});
