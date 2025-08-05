import { KeyboardProvider } from "@mkboard/keyboard";
import { TypingTestPage } from "@mkboard/page-typing-test";
import { ResultLoader } from "@mkboard/result-loader";

export default function Page() {
  return (
    <ResultLoader>
      <KeyboardProvider>
        <TypingTestPage />
      </KeyboardProvider>
    </ResultLoader>
  );
}
