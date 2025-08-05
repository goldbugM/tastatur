import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { Layout, loadKeyboard } from "@mkboard/keyboard";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { render } from "@testing-library/react";
import { KeyFrequencyHeatmap } from "./KeyFrequencyHeatmap.tsx";

test("render", () => {
  const keyboard = loadKeyboard(Layout.EN_US);
  const model = new FakePhoneticModel();

  const r = render(
    <FakeIntlProvider>
      <KeyFrequencyHeatmap keyboard={keyboard} model={model} />
    </FakeIntlProvider>,
  );

  r.unmount();
});
