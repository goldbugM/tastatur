import { catchError } from "@mkboard/debug";
import { KeyboardProvider } from "@mkboard/keyboard";
import { schedule } from "@mkboard/lang";
import { type Lesson } from "@mkboard/lesson";
import { LessonLoader } from "@mkboard/lesson-loader";
import { LoadingProgress } from "@mkboard/pages-shared";
import { type Result, useResults } from "@mkboard/result";
import { useSettings } from "@mkboard/settings";
import { useEffect, useMemo, useState } from "react";
import { Controller } from "./Controller.tsx";
import { displayEvent, Progress } from "./state/index.ts";

export function PracticeScreen() {
  return (
    <KeyboardProvider>
      <LessonLoader>
        {(lesson) => <ProgressUpdater lesson={lesson} />}
      </LessonLoader>
    </KeyboardProvider>
  );
}

function ProgressUpdater({ lesson }: { readonly lesson: Lesson }) {
  const { results, appendResults } = useResults();
  const [progress, { total, current }] = useProgress(lesson, results);
  if (progress == null) {
    return <LoadingProgress total={total} current={current} />;
  } else {
    return (
      <Controller
        progress={progress}
        onResult={(result) => {
          if (result.validate()) {
            progress.append(result, displayEvent);
            appendResults([result]);
          }
        }}
      />
    );
  }
}

function useProgress(lesson: Lesson, results: readonly Result[]) {
  const { settings } = useSettings();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState({ total: 0, current: 0 });
  const progress = useMemo(
    () => new Progress(settings, lesson),
    [settings, lesson],
  );
  useEffect(() => {
    // Populating the progress object can take a long time, so we do this
    // asynchronously, interleaved with the browser event loop to avoid
    // freezing of the UI.
    const controller = new AbortController();
    const { signal } = controller;
    schedule(progress.seedAsync(lesson.filter(results), setLoading), { signal })
      .then(() => setDone(true))
      .catch(catchError);
    return () => {
      controller.abort();
    };
  }, [progress, lesson, results]);
  return [done ? progress : null, loading] as const;
}
