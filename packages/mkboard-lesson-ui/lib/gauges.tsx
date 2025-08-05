import { useIntlNumbers } from "@mkboard/intl";
import { type SummaryStats } from "@mkboard/result";
import { type ClassName, Name, Value } from "@mkboard/widget";
import { clsx } from "clsx";
import { memo, type ReactNode } from "react";
import { useIntl } from "react-intl";
import { useFormatter } from "./format.ts";
import * as styles from "./gauges.module.less";
import { type Names } from "./names.ts";

export const GaugeList = memo(function GaugeRow({
  summaryStats,
  names,
}: {
  summaryStats: SummaryStats;
  names?: Names;
}) {
  return (
    <div className={styles.gaugeList}>
      <SpeedGauge summaryStats={summaryStats} names={names} />
      <AccuracyGauge summaryStats={summaryStats} names={names} />
      <ScoreGauge summaryStats={summaryStats} names={names} />
    </div>
  );
});

export const SpeedGauge = memo(function SpeedGauge({
  summaryStats,
  names,
}: {
  summaryStats: SummaryStats;
  names?: Names;
}) {
  const { formatMessage } = useIntl();
  const { formatSpeed } = useFormatter();
  const { last, delta } = summaryStats.speed;
  return (
    <Gauge
      id={names?.speed}
      name={
        <Name
          name={formatMessage({
            id: "t_Speed",
            defaultMessage: "Speed",
          })}
        />
      }
      value={<Value value={formatSpeed(last)} />}
      delta={
        <Value
          value={signed(formatSpeed(delta), delta)}
          delta={delta}
          title={formatMessage({
            id: "metric.difference.description",
            defaultMessage: "The difference from the average value.",
          })}
        />
      }
      title={formatMessage({
        id: "metric.speed.description",
        defaultMessage: "Typing speed in the last lesson.",
      })}
    />
  );
});

export const AccuracyGauge = memo(function AccuracyGauge({
  summaryStats,
  names,
}: {
  summaryStats: SummaryStats;
  names?: Names;
}) {
  const { formatMessage } = useIntl();
  const { formatPercents } = useIntlNumbers();
  const { last, delta } = summaryStats.accuracy;
  return (
    <Gauge
      id={names?.accuracy}
      name={
        <Name
          name={formatMessage({
            id: "t_Accuracy",
            defaultMessage: "Accuracy",
          })}
        />
      }
      value={<Value value={formatPercents(last)} />}
      delta={
        <Value
          value={signed(formatPercents(delta), delta)}
          delta={delta}
          title={formatMessage({
            id: "metric.difference.description",
            defaultMessage: "The difference from the average value.",
          })}
        />
      }
      title={formatMessage({
        id: "metric.accuracy.description",
        defaultMessage:
          "The percentage of characters typed without errors in the last lesson.",
      })}
    />
  );
});

export const ScoreGauge = memo(function ScoreGauge({
  summaryStats,
  names,
}: {
  summaryStats: SummaryStats;
  names?: Names;
}) {
  const { formatMessage } = useIntl();
  const { formatNumber } = useIntlNumbers();
  const { last, delta } = summaryStats.score;
  return (
    <Gauge
      id={names?.score}
      name={
        <Name
          name={formatMessage({
            id: "t_Score",
            defaultMessage: "Score",
          })}
        />
      }
      value={<Value value={formatNumber(last, 0)} />}
      delta={
        <Value
          value={signed(formatNumber(delta, 0), delta)}
          delta={delta}
          title={formatMessage({
            id: "metric.difference.description",
            defaultMessage: "The difference from the average value.",
          })}
        />
      }
      title={formatMessage({
        id: "metric.score.description",
        defaultMessage:
          "Score of the last lesson in abstract points. " +
          "Scores are greater when you type faster and with fewer errors.",
      })}
    />
  );
});

export const Gauge = memo(function Gauge({
  id,
  className,
  name,
  value,
  delta,
  title,
}: {
  id?: string;
  className?: ClassName;
  name: ReactNode;
  value: ReactNode;
  delta: ReactNode;
  title: string;
}) {
  return (
    <span id={id} className={clsx(styles.gauge, className)} title={title}>
      {name} {value} ({delta})
    </span>
  );
});

function signed(value: any, delta: number): string {
  const s = String(value);
  if (delta > 0) {
    return `\u2191+${s}`;
  }
  if (delta < 0) {
    return `\u2193${s}`;
  }
  return s;
}
