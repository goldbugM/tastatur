import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { LearningRate, LessonKey, lessonProps, Target } from "@mkboard/lesson";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { generateKeySamples } from "@mkboard/result";
import { FakeSettingsContext, Settings } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { isNotNull } from "rich-assert";
import { KeyDetailsChart } from "./KeyDetailsChart.tsx";

test("render empty", () => {
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyDetailsChart
          lessonKey={
            new LessonKey({
              letter: FakePhoneticModel.letter1,
              samples: [],
              timeToType: 500,
              bestTimeToType: 500,
              confidence: 0.5,
              bestConfidence: 0.5,
            })
          }
          learningRate={null}
          width="100px"
          height="100px"
        />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );
  r.unmount();
});

test("render non-empty", () => {
  const settings = new Settings().set(lessonProps.targetSpeed, /* 35WPM */ 175);
  const target = new Target(settings);
  const learningRate = LearningRate.from(generateKeySamples(10), target);
  isNotNull(learningRate);
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyDetailsChart
          lessonKey={
            new LessonKey({
              letter: FakePhoneticModel.letter1,
              samples: [],
              timeToType: 500,
              bestTimeToType: 500,
              confidence: 0.5,
              bestConfidence: 0.5,
            })
          }
          learningRate={learningRate}
          width="100px"
          height="100px"
        />
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );
  r.unmount();
});
