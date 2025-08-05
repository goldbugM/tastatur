import { test } from "node:test";
import { FakeIntlProvider } from "@mkboard/intl";
import { KeyboardProvider } from "@mkboard/keyboard";
import { FakeSettingsContext } from "@mkboard/settings";
import { fireEvent, render } from "@testing-library/react";
import { TypingSettings } from "./TypingSettings.tsx";

test("render", () => {
  const r = render(
    <FakeIntlProvider>
      <FakeSettingsContext>
        <KeyboardProvider>
          <TypingSettings />
        </KeyboardProvider>
      </FakeSettingsContext>
    </FakeIntlProvider>,
  );

  fireEvent.click(r.getByText("Stop cursor on error"));
  fireEvent.click(r.getByText("Forgive errors"));

  fireEvent.click(r.getByText("No whitespace"));
  fireEvent.click(r.getByText("Bar whitespace"));
  fireEvent.click(r.getByText("Bullet whitespace"));

  fireEvent.click(r.getByText("Block cursor"));
  fireEvent.click(r.getByText("Box cursor"));
  fireEvent.click(r.getByText("Line cursor"));
  fireEvent.click(r.getByText("Underline cursor"));

  fireEvent.click(r.getByText("Jumping cursor"));
  fireEvent.click(r.getByText("Smooth cursor"));

  r.unmount();
});
