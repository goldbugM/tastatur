import { Key } from "@mkboard/lesson-ui";
import { Award, toast } from "@mkboard/widget";
import { FormattedMessage } from "react-intl";
import { DailyGoalIcon, TrophyIcon } from "./event-icons.tsx";
import { type LessonEvent } from "./event-types.ts";

export function EventAlert({ event }: { readonly event: LessonEvent }) {
  switch (event.type) {
    case "new-letter":
      return (
        <Award icon={<Key lessonKey={event.lessonKey} size="announcement" />}>
          <FormattedMessage
            id="t_ev_New_letter_unlocked"
            defaultMessage="New letter unlocked!"
          />
        </Award>
      );
    case "top-speed":
      return (
        <Award icon={<TrophyIcon />}>
          <FormattedMessage id="t_ev_Top_speed" defaultMessage="Top speed!" />
        </Award>
      );
    case "top-score":
      return (
        <Award icon={<TrophyIcon />}>
          <FormattedMessage id="t_ev_Top_score" defaultMessage="Top score!" />
        </Award>
      );
    case "daily-goal":
      return (
        <Award icon={<DailyGoalIcon />}>
          <FormattedMessage
            id="t_ev_Daily_goal_reached"
            defaultMessage="Daily goal reached!"
          />
        </Award>
      );
  }
}

export function displayEvent(event: LessonEvent): void {
  toast(<EventAlert event={event} />, {
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
  });
}
