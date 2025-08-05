import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { type PageData, PageDataContext } from "@mkboard/pages-shared";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { PhoneticModelLoader } from "@mkboard/phonetic-model-loader";
import { FakeResultContext, ResultFaker } from "@mkboard/result";
import { FakeSettingsContext } from "@mkboard/settings";
import { render } from "@testing-library/react";
import { isNotNull } from "rich-assert";
import { PublicProfilePage } from "./PublicProfilePage.tsx";

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
            <PublicProfilePage
              user={{
                id: "abc",
                name: "somebody",
                imageUrl: null,
                premium: false,
              }}
            />
          </FakeResultContext>
        </FakeSettingsContext>
      </PageDataContext.Provider>
    </FakeIntlProvider>,
  );

  isNotNull(await r.findByText("Typing Speed"));
  isNotNull(await r.findByText("Key Typing Speed"));

  r.unmount();
});
