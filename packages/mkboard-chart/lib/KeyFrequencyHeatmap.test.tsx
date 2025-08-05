import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { Layout, loadKeyboard } from "@mkboard/keyboard";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { makeKeyStatsMap, ResultFaker } from "@mkboard/result";
import { FakeSettingsContext } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { KeyFrequencyHeatmap } from "./KeyFrequencyHeatmap.tsx";

test("render empty", () => {
  const letters = FakePhoneticModel.letters;
  const faker = new ResultFaker({ letters });
  const results = faker.nextResultList(0);
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyFrequencyHeatmap
          keyStatsMap={makeKeyStatsMap(letters, results)}
          keyboard={loadKeyboard(Layout.EN_US)}
        />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );
  r.unmount();
});

test("render non-empty", () => {
  const letters = FakePhoneticModel.letters;
  const faker = new ResultFaker({ letters });
  const results = faker.nextResultList(100);
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyFrequencyHeatmap
          keyStatsMap={makeKeyStatsMap(letters, results)}
          keyboard={loadKeyboard(Layout.EN_US)}
        />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );
  r.unmount();
});
