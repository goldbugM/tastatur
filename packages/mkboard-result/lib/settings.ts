import { itemProp } from "@mkboard/settings";
import { SpeedUnit } from "./speedunit.ts";

export const uiProps = {
  speedUnit: itemProp("ui.speedUnit", SpeedUnit.ALL, SpeedUnit.WPM),
} as const;
