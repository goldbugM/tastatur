import { test } from "node:test";
import { KeyboardContext, Layout, loadKeyboard } from "@mkboard/keyboard";
import { FakePhoneticModel, type PhoneticModel } from "@mkboard/phonetic-model";
import { PhoneticModelLoader } from "@mkboard/phonetic-model-loader";
import { FakeSettingsContext, Settings } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { includes } from "rich-assert";
import { LessonLoader } from "./LessonLoader.tsx";

test("load", async () => {
  PhoneticModelLoader.loader = FakePhoneticModel.loader;
  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <FakeSettingsContext initialSettings={new Settings()}>
      <KeyboardContext.Provider value={keyboard}>
        <LessonLoader>
          {({ model }) => <TestChild model={model} />}
        </LessonLoader>
      </KeyboardContext.Provider>
    </FakeSettingsContext>,
  );

  includes((await r.findByTitle("letters")).textContent!, "ABCDEFGHIJ");

  r.unmount();
});

function TestChild({ model }: { model: PhoneticModel }) {
  return <span title="letters">{model.letters.map(String).join("")}</span>;
}
