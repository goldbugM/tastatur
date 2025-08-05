import { type WordList, wordListStats } from "@mkboard/content";
import { WordListLoader } from "@mkboard/content-words";
import { useIntlDisplayNames, useIntlNumbers } from "@mkboard/intl";
import { Language } from "@mkboard/keyboard";
import { useSettings } from "@mkboard/settings";
import {
  Field,
  FieldList,
  FieldSet,
  NameValue,
  OptionList,
  Para,
  Range,
  TextField,
} from "@mkboard/widget";
import { useIntl } from "react-intl";
import { typingTestProps } from "../../../settings.ts";

export function CommonWordsSettings() {
  const { settings } = useSettings();
  return (
    <WordListLoader language={settings.get(typingTestProps.language)}>
      {(wordList) => (
        <Content
          wordList={wordList.slice(
            0,
            settings.get(typingTestProps.wordList.wordListSize),
          )}
        />
      )}
    </WordListLoader>
  );
}

function Content({ wordList }: { wordList: WordList }) {
  const { settings, updateSettings } = useSettings();
  const { formatMessage } = useIntl();
  const { formatLanguageName } = useIntlDisplayNames();
  const { formatNumber } = useIntlNumbers();
  const { wordCount, avgWordLength } = wordListStats(wordList);
  return (
    <FieldSet legend="Common words">
      <Para>Type the common words.</Para>

      <FieldList>
        <Field>
          {formatMessage({
            id: "t_Language:",
            defaultMessage: "Language:",
          })}
        </Field>

        <Field>
          <OptionList
            options={Language.ALL.map((item) => ({
              value: item.id,
              name: formatLanguageName(item.id),
            }))}
            value={String(settings.get(typingTestProps.language))}
            onSelect={(id) => {
              updateSettings(
                settings.set(typingTestProps.language, Language.ALL.get(id)),
              );
            }}
          />
        </Field>
      </FieldList>

      <FieldList>
        <Field>
          {formatMessage({
            id: "t_Word_list_size:",
            defaultMessage: "Word list size:",
          })}
        </Field>
        <Field>
          <Range
            size={16}
            min={typingTestProps.wordList.wordListSize.min}
            max={typingTestProps.wordList.wordListSize.max}
            step={1}
            value={settings.get(typingTestProps.wordList.wordListSize)}
            onChange={(value) => {
              updateSettings(
                settings.set(typingTestProps.wordList.wordListSize, value),
              );
            }}
          />
        </Field>
      </FieldList>

      <Para>
        <TextField
          type="textarea"
          value={wordList.join(", ")}
          readOnly={true}
        />
      </Para>

      <FieldList>
        <Field>
          <NameValue
            name={formatMessage({
              id: "t_num_Unique_words",
              defaultMessage: "Unique words",
            })}
            value={formatNumber(wordCount)}
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
    </FieldSet>
  );
}
