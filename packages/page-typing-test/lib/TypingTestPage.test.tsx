import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { KeyboardProvider } from "@mkboard/keyboard";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { PhoneticModelLoader } from "@mkboard/phonetic-model-loader";
import { FakeSettingsContext } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { TypingTestPage } from "./TypingTestPage.tsx";

test("render", () => {
  PhoneticModelLoader.loader = FakePhoneticModel.loader;

  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyboardProvider>
          <TypingTestPage />
        </KeyboardProvider>
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  r.unmount();
});
