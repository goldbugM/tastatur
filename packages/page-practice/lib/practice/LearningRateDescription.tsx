import { useIntlNumbers } from "@mkboard/intl";
import { type LearningRate, type LessonKey } from "@mkboard/lesson";
import { Name, Para, Value } from "@mkboard/widget";
import { type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

export function LearningRateDescription({
  lessonKey,
  learningRate,
}: {
  readonly lessonKey: LessonKey;
  readonly learningRate: LearningRate | null;
}): ReactNode {
  const { formatNumber, formatPercents } = useIntlNumbers();
  if ((lessonKey.bestConfidence ?? 0) >= 1) {
    return (
      <Para align="center">
        <Name>
          <FormattedMessage
            id="learningRate.alreadyUnlocked"
            defaultMessage="This letter is already unlocked."
          />
        </Name>
      </Para>
    );
  }
  if (
    learningRate != null &&
    learningRate.remainingLessons > 0 &&
    learningRate.certainty > 0
  ) {
    return (
      <Para align="center">
        <Name>
          <FormattedMessage
            id="learningRate.remainingLessons"
            defaultMessage={
              "Approximately {remainingLessons} lessons remaining to " +
              "unlock the next letter ({certainty} certainty)."
            }
            values={{
              remainingLessons: (
                <Value value={formatNumber(learningRate.remainingLessons)} />
              ),
              certainty: (
                <Value value={formatPercents(learningRate.certainty)} />
              ),
            }}
          />
        </Name>
      </Para>
    );
  }
  return (
    <Para align="center">
      <Name>
        <FormattedMessage
          id="learningRate.unknown"
          defaultMessage="Need more data to compute the remaining lessons to unlock this letter."
        />
      </Name>
    </Para>
  );
}
