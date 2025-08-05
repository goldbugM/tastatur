import { type NumbersLesson } from "@mkboard/lesson";
import { Description, Explainer, FieldSet } from "@mkboard/widget";
import { type ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { BenfordProp } from "./BenfordProp.tsx";

export function NumbersLessonSettings({
  lesson,
}: {
  readonly lesson: NumbersLesson;
}): ReactNode {
  const { formatMessage } = useIntl();
  return (
    <>
      <Explainer>
        <Description>
          <FormattedMessage
            id="lessonType.numbers.description"
            defaultMessage="Practice numbers only."
          />
        </Description>
      </Explainer>
      <FieldSet
        legend={formatMessage({
          id: "t_Lesson_options",
          defaultMessage: "Lesson options",
        })}
      >
        <BenfordProp />
      </FieldSet>
    </>
  );
}
