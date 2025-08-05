import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { lessonProps, LessonType } from "@mkboard/lesson";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { PhoneticModelLoader } from "@mkboard/phonetic-model-loader";
import { FakeResultContext, ResultFaker } from "@mkboard/result";
import { FakeSettingsContext, Settings } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { includes, isNotNull } from "rich-assert";
import { PracticeScreen } from "./PracticeScreen.tsx";

const faker = new ResultFaker();

test("render", async () => {
  PhoneticModelLoader.loader = FakePhoneticModel.loader;

  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext
        initialSettings={new Settings()
          .set(lessonProps.type, LessonType.CUSTOM)
          .set(lessonProps.customText.content, "abcdefghij")}
      >
        <FakeResultContext initialResults={faker.nextResultList(100)}>
          <PracticeScreen />
        </FakeResultContext>
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  isNotNull(await r.findByTitle("Change lesson settings", { exact: false }));
  includes(r.container.textContent!, "abcdefghij");

  r.unmount();
});
