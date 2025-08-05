import { type Keyboard } from "@mkboard/keyboard";
import { Letter, type PhoneticModel } from "@mkboard/phonetic-model";
import {
  randomSample,
  type RNGStream,
  weightedRandomSample,
} from "@mkboard/rand";
import { type KeyStatsMap } from "@mkboard/result";
import { type Settings } from "@mkboard/settings";
import { LessonKeys } from "./key.ts";
import { Lesson } from "./lesson.ts";
import { lessonProps } from "./settings.ts";
import { Target } from "./target.ts";

export class NumbersLesson extends Lesson {
  constructor(settings: Settings, keyboard: Keyboard, model: PhoneticModel) {
    super(settings, keyboard, model);
  }

  override get letters() {
    return Letter.digits;
  }

  override update(keyStatsMap: KeyStatsMap) {
    return LessonKeys.includeAll(keyStatsMap, new Target(this.settings));
  }

  override generate(lessonKeys: LessonKeys, rng: RNGStream) {
    const words = [];
    let wordsLength = 0;
    while (true) {
      const word = this.nextWord(rng);
      words.push(word);
      wordsLength += word.length;
      if (wordsLength >= 50) {
        break;
      }
    }
    return words.join(" ");
  }

  nextWord(rng: RNGStream) {
    const benford = this.settings.get(lessonProps.numbers.benford);
    const [zeroDigit, ...nonZeroDigits] = Letter.digits;
    const allDigits = [zeroDigit, ...nonZeroDigits];
    const length = Math.floor(3 + rng() * 4);
    const word = [];
    let last = null;
    for (let i = 0; i < length; i++) {
      while (true) {
        const digit =
          i === 0
            ? benford
              ? weightedRandomSample(nonZeroDigits, ({ f }) => f, rng)
              : randomSample(nonZeroDigits, rng)
            : randomSample(allDigits, rng);
        if (digit !== last) {
          word.push(digit);
          last = digit;
          break;
        }
      }
    }
    return String.fromCodePoint(...word.map(({ codePoint }) => codePoint));
  }
}
