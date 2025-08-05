import { type KeyId, useKeyboard } from "@mkboard/keyboard";
import { KeyLayer, VirtualKeyboard } from "@mkboard/keyboard-ui";
import { Tasks } from "@mkboard/lang";
import {
  type LineList,
  type Step,
  type TextInputSettings,
} from "@mkboard/textinput";
import { type AnyEvent } from "@mkboard/textinput-events";
import { StaticText } from "@mkboard/textinput-ui";
import { Box, useDocumentVisibility } from "@mkboard/widget";
import { useEffect, useMemo, useState } from "react";
import { ReplayState, Session, type TestResult } from "../session/index.ts";
import { useCompositeSettings } from "../settings.ts";
import * as styles from "./Replay.module.less";
import { ReplayProgress } from "./ReplayProgress.tsx";

export function Replay({ result: { steps, events } }: { result: TestResult }) {
  const keyboard = useKeyboard();
  const { textInput, textDisplay } = useCompositeSettings();
  const { stepper, lines, depressedKeys } = useReplayState(
    textInput,
    steps,
    events,
  );
  return (
    <div className={styles.root}>
      <ReplayProgress stepper={stepper} />
      <Box className={styles.text} alignItems="center" justifyContent="center">
        <StaticText settings={textDisplay} lines={lines} cursor={true} />
      </Box>
      <VirtualKeyboard keyboard={keyboard} height="16rem">
        <KeyLayer depressedKeys={depressedKeys} />
      </VirtualKeyboard>
    </div>
  );
}

function useReplayState(
  settings: TextInputSettings,
  steps: readonly Step[],
  events: readonly AnyEvent[],
) {
  const stepper = useMemo(
    () => new ReplayState(settings, steps, events),
    [settings, steps, events],
  );
  const visible = useDocumentVisibility();
  const [lines, setLines] = useState<LineList>(Session.emptyLines);
  const [depressedKeys, setDepressedKeys] = useState<KeyId[]>([]);
  useEffect(() => {
    const tasks = new Tasks();
    const step = () => {
      stepper.step();
      setLines(stepper.lines);
      setDepressedKeys(stepper.depressedKeys);
      tasks.delayed(stepper.delay, step);
    };
    if (visible) {
      stepper.reset();
      setLines(stepper.lines);
      setDepressedKeys(stepper.depressedKeys);
      tasks.delayed(stepper.delay, step);
    }
    return () => {
      tasks.cancelAll();
    };
  }, [stepper, visible]);
  return { stepper, lines, depressedKeys };
}
