import {
  type BookContent,
  BookPreview,
  BookSelector,
  flattenContent,
  ParagraphPreview,
  ParagraphSelector,
} from "@mkboard/content";
import { BookContentLoader } from "@mkboard/content-books";
import { useSettings } from "@mkboard/settings";
import { FieldSet, Para } from "@mkboard/widget";
import { useMemo } from "react";
import { typingTestProps } from "../../../settings.ts";

export function BookSettings() {
  const { settings } = useSettings();
  return (
    <BookContentLoader book={settings.get(typingTestProps.book)}>
      {(bookContent) => <Content bookContent={bookContent} />}
    </BookContentLoader>
  );
}

function Content({ bookContent }: { bookContent: BookContent }) {
  const { settings, updateSettings } = useSettings();
  const paragraphs = useMemo(
    () => flattenContent(bookContent.content),
    [bookContent],
  );
  const book = settings.get(typingTestProps.book);
  const paragraphIndex = settings.get(typingTestProps.bookParagraphIndex);
  return (
    <FieldSet legend="Book paragraphs">
      <Para>Type the content of a book.</Para>

      <BookSelector
        book={book}
        onChange={(book) => {
          updateSettings(
            settings
              .set(typingTestProps.book, book)
              .set(typingTestProps.bookParagraphIndex, 0),
          );
        }}
      />

      <BookPreview {...bookContent} />

      <ParagraphSelector
        paragraphs={paragraphs}
        paragraphIndex={paragraphIndex}
        onChange={(paragraphIndex) => {
          updateSettings(
            settings.set(typingTestProps.bookParagraphIndex, paragraphIndex),
          );
        }}
      />

      <ParagraphPreview
        paragraphs={paragraphs}
        paragraphIndex={paragraphIndex}
      />
    </FieldSet>
  );
}
