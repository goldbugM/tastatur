import { memo, type ReactNode } from "react";
import * as styles from "./styles.ts";

export const slot1 = "mkboard_728x90_970x90_ATF";
export const slot2 = "mkboard_160x600_Left";

export type AdDetails = {
  readonly id: string;
  readonly width: number;
  readonly height: number;
};

export const inventory: Record<string, AdDetails> = {
  BANNER_970X90_1: { id: slot1, width: 970, height: 90 },
  BANNER_160X600_1: { id: slot2, width: 160, height: 600 },
};

export function SetupAds({
  children,
}: {
  readonly children: ReactNode;
}): ReactNode {
  // Disabled - external advertising service removed
  return null;
}

export const AdBanner = memo(function AdBanner({
  name,
}: {
  readonly name: "BANNER_160X600_1" | "BANNER_970X90_1";
}): ReactNode {
  // Disabled - external advertising service removed
  return null;
});
