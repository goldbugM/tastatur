import {
  type Keyboard,
  KeyboardOptions,
  type WeightedCodePointSet,
} from "@mkboard/keyboard";
import { type Letter, PhoneticModel } from "@mkboard/phonetic-model";
import { LCG, type RNGStream } from "@mkboard/rand";
import { type KeyStatsMap, type Result, ResultGroups } from "@mkboard/result";
import { type Settings } from "@mkboard/settings";
import { type StyledText } from "@mkboard/textinput";
import { type LessonKeys } from "./key.ts";

export abstract class Lesson {
  static rng: RNGStream = LCG(Date.now());

  readonly settings: Settings;
  readonly keyboard: Keyboard;
  readonly codePoints: WeightedCodePointSet;
  readonly model: PhoneticModel;

  protected constructor(
    settings: Settings,
    keyboard: Keyboard,
    model: PhoneticModel,
  ) {
    this.settings = settings;
    this.keyboard = keyboard;
    this.codePoints = keyboard.getCodePoints();
    this.model = PhoneticModel.restrict(model, this.codePoints);
  }

  filter(results: readonly Result[]): readonly Result[] {
    return ResultGroups.byLayoutFamily(results).get(
      KeyboardOptions.from(this.settings).layout.family,
    );
  }

  abstract get letters(): readonly Letter[];

  abstract update(keyStatsMap: KeyStatsMap): LessonKeys;

  abstract generate(lessonKeys: LessonKeys, rng: RNGStream): StyledText;
}
