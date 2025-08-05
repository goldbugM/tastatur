import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { type PageData, PageDataContext } from "@mkboard/pages-shared";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { PhoneticModelLoader } from "@mkboard/phonetic-model-loader";
import { FakeResultContext, ResultFaker } from "@mkboard/result";
import { FakeSettingsContext } from "@mkboard/settings";
import { fireEvent, render } from "@testing-library/react";
import { PracticePage } from "./PracticePage.tsx";

const faker = new ResultFaker();

test("render", async () => {
  PhoneticModelLoader.loader = FakePhoneticModel.loader;

  const r = render(
    <FakeIntlProvider>
      <PageDataContext.Provider
        value={{ publicUser: { id: "abc" } } as PageData}
      >
        <FakeSettingsContext>
          <FakeResultContext initialResults={faker.nextResultList(100)}>
            <PracticePage />
          </FakeResultContext>
        </FakeSettingsContext>
      </PageDataContext.Provider>
    </FakeIntlProvider>,
  );

  fireEvent.click(
    await r.findByTitle("Change lesson settings", { exact: false }),
  );
  fireEvent.click(await r.findByText("Done"));

  r.unmount();
});
