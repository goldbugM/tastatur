import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { LessonKey, LessonKeys } from "@mkboard/lesson";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { FakeSettingsContext } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { isNotNull, isNull } from "rich-assert";
import { CurrentKey } from "./CurrentKey.tsx";

const { letters } = FakePhoneticModel;

test("render no key", () => {
  const lessonKeys = new LessonKeys([
    new LessonKey({
      letter: letters[0],
      samples: [],
      timeToType: 100,
      bestTimeToType: 100,
      confidence: 1.0,
      bestConfidence: 1.0,
    }).asIncluded(),
  ]);

  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <CurrentKey lessonKeys={lessonKeys} />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  isNotNull(r.queryByText("All keys are unlocked."));
  isNull(r.queryByText("Learning rate:"));

  r.unmount();
});

test("render key", () => {
  const lessonKeys = new LessonKeys([
    new LessonKey({
      letter: letters[0],
      samples: [],
      timeToType: 100,
      bestTimeToType: 100,
      confidence: 1.0,
      bestConfidence: 1.0,
    }).asFocused(),
  ]);

  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <CurrentKey lessonKeys={lessonKeys} />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  isNull(r.queryByText("All keys are unlocked."));
  isNotNull(r.queryByText("Learning rate:"));

  r.unmount();
});
