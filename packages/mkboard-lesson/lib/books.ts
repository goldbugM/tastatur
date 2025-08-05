import {
  type Book,
  type BookContent,
  type Content,
  flattenContent,
  splitParagraph,
} from "@mkboard/content";
import { filterText, type Keyboard } from "@mkboard/keyboard";
import { clamp } from "@mkboard/lang";
import { type PhoneticModel } from "@mkboard/phonetic-model";
import { type KeyStatsMap } from "@mkboard/result";
import { type Settings } from "@mkboard/settings";
import { LessonKeys } from "./key.ts";
import { Lesson } from "./lesson.ts";
import { lessonProps } from "./settings.ts";
import { Target } from "./target.ts";
import { generateFragment } from "./text/fragment.ts";
import { wordSequence } from "./text/words.ts";

export class BooksLesson extends Lesson {
  readonly book: Book;
  readonly content: Content;
  readonly paragraphs: readonly string[];
  readonly paragraphIndex: number;
  readonly wordList: readonly string[];
  wordIndex = 0;

  constructor(
    settings: Settings,
    keyboard: Keyboard,
    model: PhoneticModel,
    { book, content }: BookContent,
  ) {
    super(settings, keyboard, model);
    const paragraphIndex = this.settings.get(lessonProps.books.paragraphIndex);
    this.book = book;
    this.content = content;
    this.paragraphs = this.#flattenContent(content);
    this.paragraphIndex = clamp(paragraphIndex, 0, this.paragraphs.length);
    this.wordList = [
      ...this.paragraphs.slice(this.paragraphIndex),
      ...this.paragraphs.slice(0, this.paragraphIndex),
    ]
      .map(splitParagraph)
      .flat();
  }

  override get letters() {
    return this.model.letters;
  }

  override update(keyStatsMap: KeyStatsMap) {
    return LessonKeys.includeAll(keyStatsMap, new Target(this.settings));
  }

  override generate() {
    return generateFragment(this.settings, wordSequence(this.wordList, this));
  }

  #flattenContent(content: Content) {
    const lettersOnly = this.settings.get(lessonProps.books.lettersOnly);
    const lowercase = this.settings.get(lessonProps.books.lowercase);
    const codePoints = new Set(this.keyboard.getCodePoints());
    if (lettersOnly) {
      for (const codePoint of codePoints) {
        if (!this.model.language.includes(codePoint)) {
          codePoints.delete(codePoint);
        }
      }
    }
    return flattenContent(content).map((paragraph) => {
      let text = filterText(paragraph, codePoints);
      if (lowercase) {
        text = this.model.language.lowerCase(text);
      }
      return text;
    });
  }
}
