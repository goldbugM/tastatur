import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { PhoneticModelLoader } from "@mkboard/phonetic-model-loader";
import { FakeResultContext, ResultFaker } from "@mkboard/result";
import { FakeSettingsContext } from "@mkboard/settings";
import { fireEvent, render } from "@testing-library/react";
import { isNotNull } from "rich-assert";
import { SettingsScreen } from "./SettingsScreen.tsx";

const faker = new ResultFaker();

test("render", async () => {
  PhoneticModelLoader.loader = FakePhoneticModel.loader;

  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <FakeResultContext initialResults={faker.nextResultList(100)}>
          <SettingsScreen />
        </FakeResultContext>
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  isNotNull(await r.findByText("Lessons"));
  isNotNull(await r.findByText("Typing"));
  isNotNull(await r.findByText("Keyboard"));
  isNotNull(await r.findByText("Miscellaneous"));

  fireEvent.click(r.getByText("Lessons"));

  isNotNull(r.queryByText("Lesson options"));
  isNotNull(r.queryByText("Lesson preview"));

  fireEvent.click(r.getByText("Typing"));

  isNotNull(r.queryByText("Typing options"));

  fireEvent.click(r.getByText("Keyboard"));

  isNotNull(r.queryByText("Options"));
  isNotNull(r.queryByText("Preview"));

  fireEvent.click(r.getByText("Miscellaneous"));

  isNotNull(r.queryByText("Interface options"));

  r.unmount();
});
