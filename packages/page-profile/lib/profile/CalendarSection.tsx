import { Calendar, EffortLegend, useEffort } from "@mkboard/lesson-ui";
import { type DailyStatsMap } from "@mkboard/result";
import { Explainer, Figure } from "@mkboard/widget";
import { FormattedMessage } from "react-intl";

export function CalendarSection({
  dailyStatsMap,
}: {
  dailyStatsMap: DailyStatsMap;
}) {
  const effort = useEffort();

  return (
    <Figure>
      <Figure.Caption>
        <FormattedMessage
          id="profile.chart.calendar.caption"
          defaultMessage="Practice Calendar"
        />
      </Figure.Caption>

      <Explainer>
        <Figure.Description>
          <FormattedMessage
            id="profile.chart.calendar.description"
            defaultMessage="This calendar shows the dates of active learning."
          />
        </Figure.Description>
      </Explainer>

      <Calendar dailyStatsMap={dailyStatsMap} effort={effort} />

      <Figure.Legend>
        <EffortLegend effort={effort} />
      </Figure.Legend>
    </Figure>
  );
}
