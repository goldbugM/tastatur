import { type Lesson } from "@mkboard/lesson";
import { type Letter } from "@mkboard/phonetic-model";
import { type KeyStatsMap, type Result } from "@mkboard/result";
import {
  type LessonEventListener,
  type LessonEventSource,
} from "./event-types.ts";

export class LetterEvents implements LessonEventSource {
  readonly #lesson: Lesson;
  readonly #keyStatsMap: KeyStatsMap;
  readonly #included: Set<Letter>;

  constructor(lesson: Lesson, keyStatsMap: KeyStatsMap) {
    this.#lesson = lesson;
    this.#keyStatsMap = keyStatsMap;
    this.#included = new Set();
    const lessonKeys = this.#lesson.update(this.#keyStatsMap);
    for (const lessonKey of lessonKeys.findIncludedKeys()) {
      if (!this.#included.has(lessonKey.letter)) {
        this.#included.add(lessonKey.letter);
      }
    }
  }

  append(result: Result, listener: LessonEventListener): void {
    const lessonKeys = this.#lesson.update(this.#keyStatsMap);
    for (const lessonKey of lessonKeys.findIncludedKeys()) {
      if (!this.#included.has(lessonKey.letter)) {
        this.#included.add(lessonKey.letter);
        listener({ type: "new-letter", lessonKey });
      }
    }
  }
}
