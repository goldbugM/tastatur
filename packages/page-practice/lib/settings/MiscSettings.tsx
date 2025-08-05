import { SpeedUnit, uiProps } from "@mkboard/result";
import { useSettings } from "@mkboard/settings";
import {
  Description,
  Explainer,
  Field,
  FieldList,
  FieldSet,
  OptionList,
} from "@mkboard/widget";
import { type ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export function MiscSettings(): ReactNode {
  const { formatMessage } = useIntl();
  return (
    <>
      <FieldSet
        legend={formatMessage({
          id: "t_Interface_options",
          defaultMessage: "Interface options",
        })}
      >
        <SpeedUnitProp />
      </FieldSet>
    </>
  );
}

function SpeedUnitProp(): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();
  return (
    <>
      <FieldList>
        <Field>
          <FormattedMessage
            id="t_Measure_typing_speed_in:"
            defaultMessage="Measure typing speed in:"
          />
        </Field>
        <Field>
          <OptionList
            options={SpeedUnit.ALL.map((item) => ({
              value: item.id,
              name: formatMessage(item.name),
            }))}
            value={settings.get(uiProps.speedUnit).id}
            onSelect={(id) => {
              updateSettings(
                settings.set(uiProps.speedUnit, SpeedUnit.ALL.get(id)),
              );
            }}
          />
        </Field>
      </FieldList>
      <Explainer>
        <Description>
          <FormattedMessage
            id="settings.typingSpeedUnit.description"
            defaultMessage="For the purpose of typing measurement, each word is standardized to be five characters or keystrokes in English, including spaces and punctuation."
          />
        </Description>
      </Explainer>
    </>
  );
}
