import {
  type DailyGoal as DailyGoalType,
  type LessonKey,
  type LessonKeys,
} from "@mkboard/lesson";
import {
  type StreakList as StreakListType,
  type SummaryStats,
} from "@mkboard/result";
import { Name } from "@mkboard/widget";
import { memo } from "react";
import { useIntl } from "react-intl";
import { CurrentKey } from "./CurrentKey.tsx";
import { DailyGoal } from "./DailyGoal.tsx";
import { GaugeList } from "./gauges.tsx";
import * as styles from "./indicators.module.less";
import { KeySet } from "./KeySet.tsx";
import { type Names } from "./names.ts";
import { StreakList } from "./StreakList.tsx";

export const GaugeRow = memo(function GaugeRow({
  summaryStats,
  names,
}: {
  summaryStats: SummaryStats;
  names?: Names;
}) {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.row}>
      <Name
        className={styles.name}
        name={formatMessage({
          id: "t_Metrics",
          defaultMessage: "Metrics",
        })}
      />
      <GaugeList summaryStats={summaryStats} names={names} />
    </div>
  );
});

export const KeySetRow = memo(function KeySetRow({
  lessonKeys,
  names,
  onKeyHoverIn,
  onKeyHoverOut,
  onKeyClick,
}: {
  lessonKeys: LessonKeys;
  names?: Names;
  onKeyHoverIn?: (key: LessonKey, elem: Element) => void;
  onKeyHoverOut?: (key: LessonKey, elem: Element) => void;
  onKeyClick?: (key: LessonKey, elem: Element) => void;
}) {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.row}>
      <Name
        className={styles.name}
        name={formatMessage({
          id: "t_All_keys",
          defaultMessage: "All keys",
        })}
      />
      <KeySet
        id={names?.keySet}
        className={styles.value}
        lessonKeys={lessonKeys}
        onKeyHoverIn={onKeyHoverIn}
        onKeyHoverOut={onKeyHoverOut}
        onKeyClick={onKeyClick}
      />
    </div>
  );
});

export const CurrentKeyRow = memo(function CurrentKeyRow({
  lessonKeys,
  names,
}: {
  lessonKeys: LessonKeys;
  names?: Names;
}) {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.row}>
      <Name
        className={styles.name}
        name={formatMessage({
          id: "t_Current_key",
          defaultMessage: "Current key",
        })}
      />
      <CurrentKey
        id={names?.currentKey}
        className={styles.value}
        lessonKeys={lessonKeys}
      />
    </div>
  );
});

export const StreakListRow = memo(function StreakListRow({
  streakList,
  names,
}: {
  streakList: StreakListType;
  names?: Names;
}) {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.row}>
      <Name
        className={styles.name}
        name={formatMessage({
          id: "t_Accuracy",
          defaultMessage: "Accuracy",
        })}
      />
      <StreakList
        id={names?.streakList}
        className={styles.value}
        streakList={streakList}
      />
    </div>
  );
});

export const DailyGoalRow = memo(function DailyGoalRow({
  dailyGoal,
  names,
}: {
  dailyGoal: DailyGoalType;
  names?: Names;
}) {
  const { formatMessage } = useIntl();
  return (
    <div className={styles.row}>
      <Name
        className={styles.name}
        name={formatMessage({
          id: "t_Daily_goal",
          defaultMessage: "Daily goal",
        })}
      />
      <DailyGoal
        id={names?.dailyGoal}
        className={styles.value}
        dailyGoal={dailyGoal}
      />
    </div>
  );
});
