import { test } from "node:test";
import { LessonKey, LessonKeys } from "@mkboard/lesson";
import { FakePhoneticModel } from "@mkboard/phonetic-model";
import { ResultFaker } from "@mkboard/result";
import { deepEqual } from "rich-assert";
import { LetterEvents } from "./event-source-letter.ts";
import { type LessonEvent } from "./event-types.ts";

const keyArgs = {
  samples: [],
  timeToType: null,
  bestTimeToType: null,
  confidence: null,
  bestConfidence: null,
};
const { letter1, letter2, letter3, letter4 } = FakePhoneticModel;
const key1 = new LessonKey({ ...keyArgs, letter: letter1 });
const key2 = new LessonKey({ ...keyArgs, letter: letter2 });
const key3 = new LessonKey({ ...keyArgs, letter: letter3 });
const key4 = new LessonKey({ ...keyArgs, letter: letter4 });

test("generate events", () => {
  // Arrange.

  const lesson = {
    lessonKeys: new LessonKeys([
      key1.asIncluded(),
      key2.asIncluded(),
      key3.asExcluded(),
      key4.asExcluded(),
    ]),
    update() {
      return lesson.lessonKeys;
    },
  };
  const keyStatsMap = {};

  const faker = new ResultFaker();
  const source = new LetterEvents(lesson as any, keyStatsMap as any);
  const events = new Set<LessonEvent>();
  const listener = events.add.bind(events);

  // Act.

  source.append(faker.nextResult(), listener);

  // Assert.

  deepEqual([...events], []);
  events.clear();

  // Act.

  lesson.lessonKeys = new LessonKeys([
    key1.asIncluded(),
    key2.asIncluded(),
    key3.asIncluded(),
    key4.asExcluded(),
  ]);
  source.append(faker.nextResult(), listener);

  // Assert.

  deepEqual(
    [...events],
    [{ type: "new-letter", lessonKey: key3.asIncluded() }],
  );
  events.clear();

  // Act.

  source.append(faker.nextResult(), listener);

  // Assert.

  deepEqual([...events], []);
  events.clear();

  // Act.

  lesson.lessonKeys = new LessonKeys([
    key1.asIncluded(),
    key2.asIncluded(),
    key3.asIncluded(),
    key4.asIncluded(),
  ]);
  source.append(faker.nextResult(), listener);

  // Assert.

  deepEqual(
    [...events],
    [{ type: "new-letter", lessonKey: key4.asIncluded() }],
  );
  events.clear();
});
