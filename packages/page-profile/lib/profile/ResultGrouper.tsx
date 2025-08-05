import { useCollator } from "@mkboard/intl";
import {
  KeyboardContext,
  keyboardProps,
  Layout,
  loadKeyboard,
  useFormattedNames,
} from "@mkboard/keyboard";
import { Letter } from "@mkboard/phonetic-model";
import { PhoneticModelLoader } from "@mkboard/phonetic-model-loader";
import {
  type KeyStatsMap,
  makeKeyStatsMap,
  ResultGroups,
  useResults,
} from "@mkboard/result";
import { useSettings } from "@mkboard/settings";
import { Field, FieldList, OptionList } from "@mkboard/widget";
import { type ReactNode, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export function ResultGrouper({
  children,
}: {
  children: (keyStatsMap: KeyStatsMap) => ReactNode;
}) {
  const { formatMessage } = useIntl();
  const { settings } = useSettings();
  const { results } = useResults();
  const groups = ResultGroups.byLayout(results);
  const resultsLayouts = new Set(groups.keys());
  const configuredLayout = settings.get(keyboardProps.layout);
  if (resultsLayouts.size === 0) {
    resultsLayouts.add(configuredLayout);
  }
  const defaultLayout = () =>
    resultsLayouts.has(configuredLayout)
      ? configuredLayout
      : [...resultsLayouts][0];
  const [selectedLayout, setSelectedLayout] = useState(defaultLayout);
  const [characterClass, setCharacterClass] = useState("letters");
  if (!resultsLayouts.has(selectedLayout)) {
    setSelectedLayout(defaultLayout());
  }
  const layoutOptions = useLayoutOptions(resultsLayouts);
  const keyboard = loadKeyboard(selectedLayout);
  const group = groups.get(selectedLayout);

  return (
    <>
      <FieldList>
        <Field>
          <FormattedMessage
            id="t_Show_statistics_for:"
            defaultMessage="Show statistics for:"
          />
        </Field>
        <Field>
          <OptionList
            options={layoutOptions}
            value={selectedLayout.id}
            onSelect={(value) => {
              setSelectedLayout(Layout.ALL.get(value));
            }}
          />
        </Field>
        <Field>
          <OptionList
            options={[
              {
                name: formatMessage({
                  id: "t_cc_Letters",
                  defaultMessage: "Letters",
                }),
                value: "letters",
              },
              {
                name: formatMessage({
                  id: "t_cc_Digits",
                  defaultMessage: "Digits",
                }),
                value: "digits",
              },
              {
                name: formatMessage({
                  id: "t_cc_Punctuation_characters",
                  defaultMessage: "Punctuation characters",
                }),
                value: "punctuators",
              },
              {
                name: formatMessage({
                  id: "t_cc_Special_characters",
                  defaultMessage: "Special characters",
                }),
                value: "specials",
              },
            ]}
            value={characterClass}
            onSelect={(value) => {
              setCharacterClass(value);
            }}
          />
        </Field>
      </FieldList>

      <KeyboardContext.Provider value={keyboard}>
        <PhoneticModelLoader language={selectedLayout.language}>
          {({ letters }) => {
            switch (characterClass) {
              case "letters":
                return children(
                  makeKeyStatsMap(
                    Letter.restrict(letters, keyboard.getCodePoints()),
                    group,
                  ),
                );
              case "digits":
                return children(makeKeyStatsMap(Letter.digits, group));
              case "punctuators":
                return children(makeKeyStatsMap(Letter.punctuators, group));
              case "specials":
                return children(makeKeyStatsMap(Letter.specials, group));
              default:
                throw new Error();
            }
          }}
        </PhoneticModelLoader>
      </KeyboardContext.Provider>
    </>
  );
}

function useLayoutOptions(layouts: Iterable<Layout>) {
  const { formatFullLayoutName } = useFormattedNames();
  const { compare } = useCollator();
  return [...layouts]
    .map((item) => ({
      value: item.id,
      name: formatFullLayoutName(item),
    }))
    .sort((a, b) => compare(a.name, b.name));
}
