import { lessonProps } from "@mkboard/lesson";
import { useSettings } from "@mkboard/settings";
import {
  CheckBox,
  Description,
  Explainer,
  Field,
  FieldList,
} from "@mkboard/widget";
import { type ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export function RecoverKeysProp(): ReactNode {
  const { formatMessage } = useIntl();
  const { settings, updateSettings } = useSettings();
  return (
    <>
      <FieldList>
        <Field>
          <FormattedMessage
            id="t_Unlock_a_next_key_:"
            defaultMessage="Unlock a next key only when:"
          />
        </Field>
        <Field>
          <CheckBox
            label={formatMessage({
              id: "t_The_previous_keys_are_",
              defaultMessage:
                "The previous keys are also above the target speed",
            })}
            checked={settings.get(lessonProps.guided.recoverKeys)}
            onChange={(value) => {
              updateSettings(
                settings.set(lessonProps.guided.recoverKeys, value),
              );
            }}
          />
        </Field>
      </FieldList>
      <Explainer>
        <Description>
          <FormattedMessage
            id="settings.recoverKeys.description"
            defaultMessage="When you focus on a new key, it is very likely that the speed of previous keys will decrease. If this option is disabled, you unlock a new key by raising only the focused key above the target speed. If this option is enabled, you will have to raise the focused key and all the previous keys above the target speed. This will make unlocking new keys harder. However, this will also make forgetting old keys harder."
          />
        </Description>
      </Explainer>
    </>
  );
}
