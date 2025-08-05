import { useIntlNumbers } from "@mkboard/intl";
import { type Language } from "@mkboard/keyboard";
import { type CustomTextLesson, lessonProps } from "@mkboard/lesson";
import { useSettings } from "@mkboard/settings";
import { textStatsOf } from "@mkboard/unicode";
import {
  CheckBox,
  Description,
  Explainer,
  Field,
  FieldList,
  FieldSet,
  LinkButton,
  NameValue,
  Para,
  TextField,
} from "@mkboard/widget";
import { type ReactNode, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { exampleTexts } from "./example-texts.ts";
import { LessonLengthProp } from "./LessonLengthProp.tsx";
import { TargetSpeedProp } from "./TargetSpeedProp.tsx";

export function CustomTextLessonSettings({
  lesson,
}: {
  readonly lesson: CustomTextLesson;
}): ReactNode {
  const { formatMessage } = useIntl();
  const { settings } = useSettings();
  return (
    <>
      <Explainer>
        <Description>
          <FormattedMessage
            id="lessonType.customText.description"
            defaultMessage="Generate typing lessons from the words of your own custom text. All keys are included by default. This mode is for the pros."
          />
        </Description>
      </Explainer>

      <FieldSet
        legend={formatMessage({
          id: "t_Lesson_options",
          defaultMessage: "Lesson options",
        })}
      >
        <CustomTextInput />
        <CustomTextStats
          language={lesson.model.language}
          customText={settings.get(lessonProps.customText.content)}
        />
        <CustomTextProcessing />
        <TargetSpeedProp />
        <LessonLengthProp />
      </FieldSet>
    </>
  );
}

function CustomTextInput(): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();
  return (
    <>
      <Para>
        <FormattedMessage id="t_Examples:" defaultMessage="Examples:" />{" "}
        {exampleTexts.map(({ title, content }, index) => (
          <span key={index}>
            {index > 0 ? ", " : null}
            <LinkButton
              onClick={() => {
                updateSettings(
                  settings.set(lessonProps.customText.content, content),
                );
              }}
            >
              {title}
            </LinkButton>
          </span>
        ))}
      </Para>
      <Para>
        <TextField
          type="textarea"
          placeholder={formatMessage({
            id: "t_Custom_text",
            defaultMessage: "Custom text",
          })}
          value={settings.get(lessonProps.customText.content)}
          onChange={(value) => {
            updateSettings(settings.set(lessonProps.customText.content, value));
          }}
        />
      </Para>
    </>
  );
}

function CustomTextStats({
  language,
  customText,
}: {
  readonly language: Language;
  readonly customText: string;
}): ReactNode {
  const { formatMessage } = useIntl();
  const { formatNumber } = useIntlNumbers();
  const { numWords, numUniqueWords, avgWordLength } = useMemo(
    () => textStatsOf(language.locale, customText),
    [language, customText],
  );
  return (
    <FieldList>
      <Field>
        <NameValue
          name={formatMessage({
            id: "t_num_All_words",
            defaultMessage: "All words",
          })}
          value={formatNumber(numWords)}
        />
      </Field>
      <Field>
        <NameValue
          name={formatMessage({
            id: "t_num_Unique_words",
            defaultMessage: "Unique words",
          })}
          value={formatNumber(numUniqueWords)}
        />
      </Field>
      <Field>
        <NameValue
          name={formatMessage({
            id: "t_Average_word_length",
            defaultMessage: "Average word length",
          })}
          value={formatNumber(avgWordLength, 2)}
        />
      </Field>
    </FieldList>
  );
}

function CustomTextProcessing(): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();
  return (
    <FieldList>
      <Field>
        <CheckBox
          checked={settings.get(lessonProps.customText.lettersOnly)}
          label={formatMessage({
            id: "t_Remove_punctuation_characters",
            defaultMessage: "Remove punctuation characters",
          })}
          title={formatMessage({
            id: "settings.customTextLettersOnly.description",
            defaultMessage:
              "Remove punctuation from the text to make it simpler to type.",
          })}
          onChange={(value) => {
            updateSettings(
              settings.set(lessonProps.customText.lettersOnly, value),
            );
          }}
        />
      </Field>
      <Field>
        <CheckBox
          checked={settings.get(lessonProps.customText.lowercase)}
          label={formatMessage({
            id: "t_Transform_to_lowercase",
            defaultMessage: "Transform to lowercase",
          })}
          title={formatMessage({
            id: "settings.customTextLowercase.description",
            defaultMessage:
              "Transform all text to lower case to make it simpler to type.",
          })}
          onChange={(value) => {
            updateSettings(
              settings.set(lessonProps.customText.lowercase, value),
            );
          }}
        />
      </Field>
      <Field>
        <CheckBox
          checked={settings.get(lessonProps.customText.randomize)}
          label={formatMessage({
            id: "t_Shuffle_words",
            defaultMessage: "Shuffle words",
          })}
          title={formatMessage({
            id: "settings.customTextRandomize.description",
            defaultMessage: "Put words from the custom text in a random order.",
          })}
          onChange={(value) => {
            updateSettings(
              settings.set(lessonProps.customText.randomize, value),
            );
          }}
        />
      </Field>
    </FieldList>
  );
}
