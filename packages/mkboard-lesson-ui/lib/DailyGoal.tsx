import { useIntlDurations, useIntlNumbers } from "@mkboard/intl";
import { type DailyGoal as DailyGoalType } from "@mkboard/lesson";
import { type ClassName, Value } from "@mkboard/widget";
import { clsx } from "clsx";
import * as styles from "./DailyGoal.module.less";

export const DailyGoal = ({
  id,
  className,
  dailyGoal,
}: {
  id?: string;
  className?: ClassName;
  dailyGoal: DailyGoalType;
}) => {
  return (
    <span id={id} className={clsx(styles.root, className)}>
      <DailyGoalLabel value={dailyGoal.value} goal={dailyGoal.goal} />
      <DailyGoalGauge value={dailyGoal.value} />
    </span>
  );
};

const DailyGoalLabel = ({ value, goal }: { value: number; goal: number }) => {
  const { formatPercents } = useIntlNumbers();
  const { formatDuration } = useIntlDurations();
  return (
    <Value
      value={`${formatPercents(value, 0)}/${formatDuration({ minutes: goal })}`}
    />
  );
};

const DailyGoalGauge = ({ value }: { value: number }) => {
  value = Math.max(0, value);
  const barWidth = value > 1 ? 100 : Math.round(value * 100);
  const frameWidth = value > 1 ? Math.round((1 / value) * 100) : 100;
  return (
    <div className={styles.gauge}>
      <div className={styles.bar} style={{ inlineSize: `${barWidth}%` }} />
      <div className={styles.frame} style={{ inlineSize: `${frameWidth}%` }} />
    </div>
  );
};
