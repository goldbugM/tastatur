import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { KeyboardProvider } from "@mkboard/keyboard";
import { FakeSettingsContext } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { mockResult } from "../mock.ts";
import { ReportScreen } from "./ReportScreen.tsx";

test("render", () => {
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyboardProvider>
          <ReportScreen result={mockResult()} />
        </KeyboardProvider>
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  r.unmount();
});
