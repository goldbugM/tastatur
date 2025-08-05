import { lessonProps } from "@mkboard/lesson";
import { useSettings } from "@mkboard/settings";
import { Description, Explainer, Field, FieldList, Range } from "@mkboard/widget";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

export function LessonLengthProp(): ReactNode {
  const { settings, updateSettings } = useSettings();
  return (
    <>
      <FieldList>
        <Field>
          <FormattedMessage
            id="t_Add_words_to_lessons:"
            defaultMessage="Add words to lessons:"
          />
        </Field>
        <Field>
          <Range
            size={16}
            min={1}
            max={100}
            step={1}
            value={Math.round(settings.get(lessonProps.length) * 100)}
            onChange={(value) => {
              updateSettings(settings.set(lessonProps.length, value / 100));
            }}
          />
        </Field>
      </FieldList>
      <Explainer>
        <Description>
          <FormattedMessage
            id="settings.lessonLength.description"
            defaultMessage="Adjust the number of words in the lesson text. Making lessons longer can improve your learning."
          />
        </Description>
      </Explainer>
    </>
  );
}
