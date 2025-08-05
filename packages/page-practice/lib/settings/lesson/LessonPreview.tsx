import { type Lesson } from "@mkboard/lesson";
import { CurrentKeyRow, KeySetRow } from "@mkboard/lesson-ui";
import { LCG } from "@mkboard/rand";
import { makeKeyStatsMap, useResults } from "@mkboard/result";
import { useSettings } from "@mkboard/settings";
import {
  TextInput,
  toTextDisplaySettings,
  toTextInputSettings,
} from "@mkboard/textinput";
import { StaticText } from "@mkboard/textinput-ui";
import { FieldSet } from "@mkboard/widget";
import { type ReactNode, useMemo } from "react";
import { useIntl } from "react-intl";
import * as styles from "./LessonPreview.module.less";

export function LessonPreview({
  lesson,
}: {
  readonly lesson: Lesson;
}): ReactNode {
  const { formatMessage } = useIntl();
  const { settings } = useSettings();
  const { results } = useResults();
  const { lessonKeys, textInput } = useMemo(() => {
    const lessonKeys = lesson.update(
      makeKeyStatsMap(lesson.letters, lesson.filter(results)),
    );
    const textInput = new TextInput(
      lesson.generate(lessonKeys, LCG(123)),
      toTextInputSettings(settings),
    );
    return { lessonKeys, textInput };
  }, [settings, lesson, results]);
  return (
    <FieldSet
      legend={formatMessage({
        id: "t_Lesson_preview:",
        defaultMessage: "Lesson preview",
      })}
    >
      <div className={styles.root}>
        <KeySetRow lessonKeys={lessonKeys} />
        <CurrentKeyRow lessonKeys={lessonKeys} />
        <div className={styles.text}>
          <StaticText
            settings={toTextDisplaySettings(settings)}
            lines={textInput.lines}
          />
        </div>
      </div>
    </FieldSet>
  );
}
