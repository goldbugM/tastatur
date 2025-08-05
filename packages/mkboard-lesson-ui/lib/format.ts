import { useIntlNumbers } from "@mkboard/intl";
import { SpeedUnit, uiProps } from "@mkboard/result";
import { useSettings } from "@mkboard/settings";
import { useMemo } from "react";
import { useIntl } from "react-intl";

export type FormatterOptions = {
  readonly unit?: boolean;
};

export type Formatter = {
  readonly speedUnit: SpeedUnit;
  readonly speedUnitName: string;
  readonly formatSpeed: (value: number, options?: FormatterOptions) => string;
  readonly formatConfidence: (value: number | null) => string;
  readonly formatLearningRate: (lr: number | null) => string;
};

export const useFormatter = (): Formatter => {
  const { formatMessage } = useIntl();
  const { formatNumber, formatPercents } = useIntlNumbers();
  const { settings } = useSettings();
  return useMemo(() => {
    const speedUnit = settings.get(uiProps.speedUnit);
    const speedUnitName = formatMessage(speedUnit.name);
    const f1 = { minimumFractionDigits: 1, maximumFractionDigits: 1 };
    const f2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    const formatSpeed = (
      value: number,
      { unit = true }: FormatterOptions = {},
    ): string => {
      let opts;
      switch (speedUnit) {
        case SpeedUnit.WPM:
          opts = f1;
          break;
        case SpeedUnit.WPS:
          opts = f2;
          break;
        case SpeedUnit.CPM:
          opts = f1;
          break;
        case SpeedUnit.CPS:
          opts = f2;
          break;
      }
      const s = formatNumber(speedUnit.measure(value), opts);
      if (unit) {
        return s + speedUnit.id;
      } else {
        return s;
      }
    };
    const formatConfidence = (confidence: number | null): string => {
      if (confidence != null) {
        return formatPercents(confidence, 0);
      } else {
        return formatMessage({
          id: "t_Uncertain",
          defaultMessage: "Uncertain",
        });
      }
    };
    const formatLearningRate = (lr: number | null): string => {
      if (lr != null && lr === lr) {
        return signed(
          formatMessage(
            {
              id: "t_Value_per_lesson",
              defaultMessage: "{value}/lesson",
            },
            {
              value: formatSpeed(lr),
            },
          ),
          lr,
        );
      } else {
        return formatMessage({
          id: "t_Uncertain",
          defaultMessage: "Uncertain",
        });
      }
    };
    return {
      speedUnit,
      speedUnitName,
      formatSpeed,
      formatConfidence,
      formatLearningRate,
    };
  }, [formatMessage, formatNumber, formatPercents, settings]);
};

function signed(value: any, learningRate: number) {
  return learningRate > 0 ? `+${value}` : `${value}`;
}
