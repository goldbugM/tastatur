import { useKeyboard } from "@mkboard/keyboard";
import { KeyLayer, VirtualKeyboard } from "@mkboard/keyboard-ui";
import { useSettings } from "@mkboard/settings";
import { ModifierState, useDepressedKeys } from "@mkboard/textinput-events";
import { Box } from "@mkboard/widget";

export function KeyboardPreview() {
  const { settings } = useSettings();
  const keyboard = useKeyboard();
  const depressedKeys = useDepressedKeys(settings, keyboard);
  return (
    <Box alignItems="center" justifyContent="center">
      <VirtualKeyboard keyboard={keyboard}>
        <KeyLayer
          depressedKeys={depressedKeys}
          toggledKeys={ModifierState.modifiers}
          showColors={true}
        />
      </VirtualKeyboard>
    </Box>
  );
}
