import { KeyboardProvider } from "@mkboard/keyboard";
import { TypingTestPage } from "@mkboard/page-typing-test";

export default function Page() {
  return (
    <KeyboardProvider>
      <TypingTestPage />
    </KeyboardProvider>
  );
}
