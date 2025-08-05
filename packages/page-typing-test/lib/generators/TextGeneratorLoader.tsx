import { BookContentLoader } from "@mkboard/content-books";
import { WordListLoader } from "@mkboard/content-words";
import { PhoneticModelLoader } from "@mkboard/phonetic-model-loader";
import { LCG } from "@mkboard/rand";
import { type ReactNode } from "react";
import { TextSourceType, useCompositeSettings } from "../settings.ts";
import { BookParagraphsGenerator } from "./book.ts";
import { CommonWordsGenerator } from "./commonwords.ts";
import { PseudoWordsGenerator } from "./pseudowords.ts";
import { type TextGenerator } from "./types.ts";

export function TextGeneratorLoader({
  children,
}: {
  children: (generator: TextGenerator) => ReactNode;
}) {
  const { textSource } = useCompositeSettings();
  switch (textSource.type) {
    case TextSourceType.CommonWords:
      return (
        <WordListLoader language={textSource.language}>
          {(wordList) =>
            children(new CommonWordsGenerator(textSource, wordList, rng()))
          }
        </WordListLoader>
      );
    case TextSourceType.PseudoWords:
      return (
        <PhoneticModelLoader language={textSource.language}>
          {(model) => children(new PseudoWordsGenerator(model, rng()))}
        </PhoneticModelLoader>
      );
    case TextSourceType.Book:
      return (
        <BookContentLoader book={textSource.book}>
          {(bookContent) =>
            children(new BookParagraphsGenerator(textSource, bookContent))
          }
        </BookContentLoader>
      );
  }
}

function rng() {
  return LCG(Date.now());
}
