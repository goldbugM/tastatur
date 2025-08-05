import { makeSpeedDistribution, SpeedHistogram } from "@mkboard/chart";
import { useIntlNumbers } from "@mkboard/intl";
import { type SummaryStats } from "@mkboard/result";
import {
  Explainer,
  Field,
  FieldList,
  Figure,
  Para,
  RadioBox,
  Value,
} from "@mkboard/widget";
import React, { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ChartWrapper } from "./ChartWrapper.tsx";

export function SpeedHistogramSection({ stats }: { stats: SummaryStats }) {
  const distribution = useMemo(() => makeSpeedDistribution(), []);
  const { formatMessage } = useIntl();
  const { formatPercents } = useIntlNumbers();
  const [period, setPeriod] = useState("average");

  const value = period === "top" ? stats.speed.max : stats.speed.avg;
  const cdf = distribution.cdf(value);

  return (
    <Figure>
      <Figure.Caption>
        <FormattedMessage
          id="profile.chart.histogram.caption"
          defaultMessage="Relative Typing Speed"
        />
      </Figure.Caption>

      <Explainer>
        <Figure.Description>
          <FormattedMessage
            id="profile.chart.histogram.description"
            defaultMessage="This is a histogram of the typing speeds of all users, and your position in relation to them."
          />
        </Figure.Description>
      </Explainer>

      <Para align="center">
        {period === "average" ? (
          <FormattedMessage
            id="profile.chart.compareAverageSpeed.description"
            defaultMessage="Your all time average speed beats {value} of all other people."
            values={{
              value: <Value value={value > 0 ? formatPercents(cdf) : "N/A"} />,
            }}
          />
        ) : (
          <FormattedMessage
            id="profile.chart.compareTopSpeed.description"
            defaultMessage="Your all time top speed beats {value} of all other people."
            values={{
              value: <Value value={value > 0 ? formatPercents(cdf) : "N/A"} />,
            }}
          />
        )}
      </Para>

      <ChartWrapper>
        <SpeedHistogram
          distribution={distribution}
          thresholds={[
            period === "average"
              ? {
                  label: formatMessage({
                    id: "t_Average_speed",
                    defaultMessage: "Average speed",
                  }),
                  value,
                }
              : {
                  label: formatMessage({
                    id: "t_Top_speed",
                    defaultMessage: "Top speed",
                  }),
                  value,
                },
          ]}
          width="100%"
          height="25rem"
        />
      </ChartWrapper>

      <FieldList>
        <Field.Filler />
        <Field>
          <RadioBox
            name="period"
            value="average"
            checked={period === "average"}
            label={formatMessage({
              id: "t_Average_speed",
              defaultMessage: "Average speed",
            })}
            onSelect={() => {
              setPeriod("average");
            }}
          />
        </Field>
        <Field>
          <RadioBox
            name="period"
            value="top"
            checked={period === "top"}
            label={formatMessage({
              id: "t_Top_speed",
              defaultMessage: "Top speed",
            })}
            onSelect={() => {
              setPeriod("top");
            }}
          />
        </Field>
        <Field.Filler />
      </FieldList>

      <Explainer>
        <Figure.Legend>
          <FormattedMessage
            id="profile.chart.histogram.legend"
            defaultMessage="See how fast you type relative to other users. The higher the bar is, the more people type at that speed. Your position is marked with the colored vertical lines."
          />
        </Figure.Legend>
      </Explainer>
    </Figure>
  );
}
