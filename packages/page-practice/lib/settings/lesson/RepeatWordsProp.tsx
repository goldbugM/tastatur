import { useIntlNumbers } from "@mkboard/intl";
import { lessonProps } from "@mkboard/lesson";
import { useSettings } from "@mkboard/settings";
import {
  Description,
  Explainer,
  Field,
  FieldList,
  Range,
  Value,
} from "@mkboard/widget";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

export function RepeatWordsProp(): ReactNode {
  const { formatPercents } = useIntlNumbers();
  const { settings, updateSettings } = useSettings();
  return (
    <>
      <FieldList>
        <Field>
          <FormattedMessage
            id="t_Repeat_each_word:"
            defaultMessage="Repeat each word:"
          />
        </Field>
        <Field>
          <Range
            min={lessonProps.repeatWords.min}
            max={lessonProps.repeatWords.max}
            step={1}
            value={settings.get(lessonProps.repeatWords)}
            onChange={(value) => {
              updateSettings(settings.set(lessonProps.repeatWords, value));
            }}
          />
        </Field>
        <Field>
          <Value value={settings.get(lessonProps.repeatWords)} />
        </Field>
      </FieldList>
      <Explainer>
        <Description>
          <FormattedMessage
            id="settings.repeatWords.description"
            defaultMessage="Repeat each word a number of times. Type a word for the first time to develop your muscle memory. Typing the same word consecutively should be easier."
          />
        </Description>
      </Explainer>
    </>
  );
}
