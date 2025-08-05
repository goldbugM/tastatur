import { KeySpeedChart, Marker } from "@mkboard/chart";
import { LessonKey, Target } from "@mkboard/lesson";
import { KeyDetails, KeySelector } from "@mkboard/lesson-ui";
import { hasData } from "@mkboard/math";
import { type KeyStatsMap } from "@mkboard/result";
import { useSettings } from "@mkboard/settings";
import { Explainer, Figure, Para } from "@mkboard/widget";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ChartWrapper } from "./ChartWrapper.tsx";
import { SmoothnessRange } from "./SmoothnessRange.tsx";

export function KeySpeedChartSection({
  keyStatsMap,
}: {
  keyStatsMap: KeyStatsMap;
}) {
  const { settings } = useSettings();
  const { letters } = keyStatsMap;
  const [current, setCurrent] = useState(letters[0]);
  const [smoothness, setSmoothness] = useState(0.5);
  const target = new Target(settings);

  if (!letters.includes(current)) {
    setCurrent(letters[0]);
    return null;
  }

  const keyStats = keyStatsMap.get(current);
  const { samples } = keyStats;

  return (
    <Figure>
      <Figure.Caption>
        <FormattedMessage
          id="profile.chart.keySpeed.caption"
          defaultMessage="Key Typing Speed"
        />
      </Figure.Caption>

      <Explainer>
        <Figure.Description>
          <FormattedMessage
            id="profile.chart.keySpeed.description"
            defaultMessage="This chart shows the typing speed change for each individual key."
          />
        </Figure.Description>
      </Explainer>

      <Para align="center">
        <KeySelector
          keyStatsMap={keyStatsMap}
          current={current}
          onSelect={(current) => {
            setCurrent(current);
          }}
        />
      </Para>

      <Para align="center">
        <KeyDetails lessonKey={LessonKey.from(keyStats, target)} />
      </Para>

      <ChartWrapper>
        <KeySpeedChart
          samples={samples}
          smoothness={smoothness}
          width="100%"
          height="25rem"
        />
      </ChartWrapper>

      <SmoothnessRange
        disabled={!hasData(samples)}
        value={smoothness}
        onChange={setSmoothness}
      />

      <Figure.Legend>
        <FormattedMessage
          id="profile.chart.keySpeed.legend"
          defaultMessage="Horizontal axis: lesson number. Vertical axis: {label1} – typing speed for the currently selected key, {label2} – target typing speed."
          values={{
            label1: <Marker type="speed" />,
            label2: <Marker type="threshold" />,
          }}
        />
      </Figure.Legend>
    </Figure>
  );
}
