import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { ResultFaker } from "@mkboard/result";
import { FakeSettingsContext } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { isNotNull, isNull } from "rich-assert";
import { AccuracyStreaksSection } from "./AccuracyStreaksSection.tsx";

test("no streaks", () => {
  // Act.

  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <AccuracyStreaksSection results={[]} />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  // Assert.

  isNull(r.queryByText("Accuracy Threshold", { exact: false }));

  r.unmount();
});

test("one streak", () => {
  // Arrange.

  const faker = new ResultFaker();
  const r1 = faker.nextResult({ length: 100, errors: 0 });

  // Act.

  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <AccuracyStreaksSection results={[r1]} />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  // Assert.

  isNotNull(r.queryByText("Accuracy Threshold", { exact: false }));

  r.unmount();
});
