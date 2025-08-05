import { HighScoresPage } from "@mkboard/page-highscores";
import { HighScoresLoader } from "../loader/HighScoresLoader.tsx";

export default function Page() {
  return (
    <HighScoresLoader>
      {(entries) => <HighScoresPage entries={entries} />}
    </HighScoresLoader>
  );
}
