import { useSettings } from "@mkboard/settings";
import { splitStyledText, toTextDisplaySettings } from "@mkboard/textinput";
import { StaticText } from "@mkboard/textinput-ui";
import { Box } from "@mkboard/widget";

export function SyntaxPreview() {
  const { settings } = useSettings();
  return (
    <Box alignItems="center" justifyContent="center">
      <StaticText
        settings={toTextDisplaySettings(settings)}
        lines={{
          text: "abc",
          lines: [
            {
              text: "a",
              chars: splitStyledText([
                { text: `/** Comment */`, cls: "comment" },
              ]),
            },
            {
              text: "b",
              chars: splitStyledText([
                "println(",
                { text: `"String"`, cls: "string" },
                ");",
              ]),
            },
            {
              text: "c",
              chars: splitStyledText([
                { text: `return`, cls: "keyword" },
                " ",
                { text: `3.14159`, cls: "number" },
                ";",
              ]),
            },
          ],
        }}
        cursor={true}
        size="X0"
      />
    </Box>
  );
}
