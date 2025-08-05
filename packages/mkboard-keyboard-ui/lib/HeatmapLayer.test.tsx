import { test } from "node:test";
import { KeyboardContext, Layout, loadKeyboard } from "@mkboard/keyboard";
import { render } from "@testing-library/react";
import { equal } from "rich-assert";
import { HeatmapLayer } from "./HeatmapLayer.tsx";

test("empty", () => {
  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <HeatmapLayer histogram={[]} modifier="f" />
    </KeyboardContext.Provider>,
  );

  equal(r.container.querySelectorAll(".spot_f").length, 0);

  r.unmount();
});

test("equal counts", () => {
  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <HeatmapLayer
        histogram={[
          [/* "a" */ 0x0061, 1],
          [/* "b" */ 0x0062, 1],
          [/* "c" */ 0x0063, 1],
        ]}
        modifier="f"
      />
    </KeyboardContext.Provider>,
  );

  equal(r.container.querySelectorAll(".spot_f").length, 3);

  r.unmount();
});

test("different counts", () => {
  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <HeatmapLayer
        histogram={[
          [/* "a" */ 0x0061, 1],
          [/* "b" */ 0x0062, 2],
          [/* "c" */ 0x0063, 3],
        ]}
        modifier="f"
      />
    </KeyboardContext.Provider>,
  );

  equal(r.container.querySelectorAll(".spot_f").length, 3);

  r.unmount();
});

test("combine counts for the same key", () => {
  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <HeatmapLayer
        histogram={[
          [/* "a" */ 0x0061, 1],
          [/* "A" */ 0x0041, 1],
          [/* "b" */ 0x0062, 1],
        ]}
        modifier="f"
      />
    </KeyboardContext.Provider>,
  );

  equal(r.container.querySelectorAll(".spot_f").length, 2);

  r.unmount();
});
