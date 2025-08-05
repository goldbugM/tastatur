import { MultiplayerPage } from "@mkboard/page-multiplayer";
import { ResultLoader } from "@mkboard/result-loader";

export default function Page() {
  return (
    <ResultLoader>
      <MultiplayerPage />
    </ResultLoader>
  );
}
