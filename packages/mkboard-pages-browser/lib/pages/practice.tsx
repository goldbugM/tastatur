import { PracticePage } from "@mkboard/page-practice";
import { ResultLoader } from "@mkboard/result-loader";

export default function Page() {
  return (
    <ResultLoader>
      <PracticePage />
    </ResultLoader>
  );
}
