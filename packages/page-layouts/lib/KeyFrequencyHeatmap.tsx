import {
  computeStats,
  type Keyboard,
  useFormattedNames,
} from "@mkboard/keyboard";
import {
  HeatmapLayer,
  KeyboardStats,
  KeyLayer,
  TransitionsLayer,
  VirtualKeyboard,
} from "@mkboard/keyboard-ui";
import { type PhoneticModel } from "@mkboard/phonetic-model";
import { Header, Para } from "@mkboard/widget";
import { type ReactNode } from "react";

export function KeyFrequencyHeatmap({
  keyboard,
  model,
}: {
  readonly keyboard: Keyboard;
  readonly model: PhoneticModel;
}): ReactNode {
  const { formatLayoutName } = useFormattedNames();
  const ngram1 = model.ngram1();
  const ngram2 = model.ngram2();
  const stats = computeStats(keyboard, ngram1, ngram2);
  return (
    <>
      <Header level={2}>{formatLayoutName(keyboard.layout)}</Header>

      <KeyboardStats stats={stats} />

      <Para>
        <VirtualKeyboard keyboard={keyboard}>
          <KeyLayer />
          <HeatmapLayer histogram={ngram1} modifier="f" />
          <TransitionsLayer histogram={ngram2} modifier="f" />
        </VirtualKeyboard>
      </Para>
    </>
  );
}
