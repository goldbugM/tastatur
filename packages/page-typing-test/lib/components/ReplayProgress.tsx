import { useIntlNumbers } from "@mkboard/intl";
import { useFormatter } from "@mkboard/lesson-ui";
import {
  AnimationFrames,
  formatDuration,
  NameValue,
  Para,
} from "@mkboard/widget";
import { useEffect, useState } from "react";
import { type ReplayState } from "../session/index.ts";

export function ReplayProgress({ stepper }: { stepper: ReplayState }) {
  const { formatInteger } = useIntlNumbers();
  const { formatSpeed } = useFormatter();
  const {
    progress: { progress, length, speed },
    time,
  } = useReplayProgress(stepper);
  return (
    <Para align="center">
      <NameValue
        name="Progress"
        value={`${formatInteger(progress)}/${formatInteger(length)}`}
      />
      <NameValue
        name="Time"
        value={formatDuration(time, { showMillis: true })}
      />
      <NameValue name="Speed" value={formatSpeed(speed)} />
    </Para>
  );
}

function useReplayProgress(stepper: ReplayState) {
  const { state, progress } = stepper;
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTime(0);
    const frames = new AnimationFrames();
    frames.start(() => {
      if (state === "running" || state === "finished") {
        setTime(progress.time);
      }
    });
    return () => {
      frames.cancel();
    };
  }, [state, progress]);
  return { progress, time };
}
