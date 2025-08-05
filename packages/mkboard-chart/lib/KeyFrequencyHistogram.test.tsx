import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { makeKeyStatsMap, ResultFaker } from "@mkboard/result";
import { FakeSettingsContext } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { KeyFrequencyHistogram } from "./KeyFrequencyHistogram.tsx";

test("render empty", () => {
  const letters = FakePhoneticModel.letters;
  const faker = new ResultFaker({ letters });
  const results = faker.nextResultList(0);
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyFrequencyHistogram
          keyStatsMap={makeKeyStatsMap(letters, results)}
          width="100px"
          height="100px"
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
        <KeyFrequencyHistogram
          keyStatsMap={makeKeyStatsMap(letters, results)}
          width="100px"
          height="100px"
        />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );
  r.unmount();
});
