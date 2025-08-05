import { test } from "node:test";
import { lessonProps, MutableDailyGoal } from "@mkboard/lesson";
import { LocalDate, ResultFaker, Today } from "@mkboard/result";
import { Settings } from "@mkboard/settings";
import { deepEqual } from "rich-assert";
import { DailyGoalEvents } from "./event-source-daily-goal.ts";
import { type LessonEvent } from "./event-types.ts";

test("generate events", () => {
  // Arrange.

  const today = new LocalDate(2001, 2, 3);
  const faker = new ResultFaker({ timeStamp: today.timeStamp });
  const dailyGoal = new MutableDailyGoal(
    new Settings().set(lessonProps.dailyGoal, 1),
    new Today(today),
  );
  const source = new DailyGoalEvents(dailyGoal);
  const events = new Set<LessonEvent>();
  const listener = events.add.bind(events);

  // Act.

  const r1 = faker.nextResult({ time: 30000 });
  dailyGoal.append(r1);
  source.append(r1, listener);

  // Assert.

  deepEqual([...events], []);
  events.clear();

  // Act.

  const r2 = faker.nextResult({ time: 30000 });
  dailyGoal.append(r2);
  source.append(r2, listener);

  // Assert.

  deepEqual([...events], [{ type: "daily-goal" }]);
  events.clear();

  // Act.

  const r3 = faker.nextResult({ time: 30000 });
  dailyGoal.append(r3);
  source.append(r3, listener);

  // Assert.

  deepEqual([...events], []);
  events.clear();
});
