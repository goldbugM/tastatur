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

export function TextManglingProp(): ReactNode {
  const { formatPercents } = useIntlNumbers();
  const { settings, updateSettings } = useSettings();
  return (
    <>
      <FieldList>
        <Field>
          <FormattedMessage
            id="t_Add_capital_letters:"
            defaultMessage="Add capital letters:"
          />
        </Field>
        <Field>
          <Range
            size={16}
            min={0}
            max={100}
            step={1}
            value={Math.round(settings.get(lessonProps.capitals) * 100)}
            onChange={(value) => {
              updateSettings(settings.set(lessonProps.capitals, value / 100));
            }}
          />
        </Field>
        <Field>
          <Value value={formatPercents(settings.get(lessonProps.capitals))} />
        </Field>
      </FieldList>
      <Explainer>
        <Description>
          <FormattedMessage
            id="settings.capitalLetters.description"
            defaultMessage="Adjust the amount of capital letters added to the lesson text. Use this option to practice typing the capital letters. We recommend to increase this value only if you have all letters above the target speed."
          />
        </Description>
      </Explainer>
      <FieldList>
        <Field>
          <FormattedMessage
            id="t_Add_punctuation_characters:"
            defaultMessage="Add punctuation characters:"
          />
        </Field>
        <Field>
          <Range
            size={16}
            min={0}
            max={100}
            step={1}
            value={Math.round(settings.get(lessonProps.punctuators) * 100)}
            onChange={(value) => {
              updateSettings(
                settings.set(lessonProps.punctuators, value / 100),
              );
            }}
          />
        </Field>
        <Field>
          <Value
            value={formatPercents(settings.get(lessonProps.punctuators))}
          />
        </Field>
      </FieldList>
      <Explainer>
        <Description>
          <FormattedMessage
            id="settings.punctuation.description"
            defaultMessage="Adjust the amount of basic punctuation characters added to the lesson text. Use this option to practice typing the punctuation characters. We recommend to increase this value only if you have all letters above the target speed."
          />
        </Description>
      </Explainer>
    </>
  );
}
