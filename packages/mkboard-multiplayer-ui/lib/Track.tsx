import { type Player, type PlayerList } from "@mkboard/multiplayer-shared";
import { withDeferred } from "@mkboard/widget";
import { memo } from "react";
import { FlagImage } from "./image/flag.tsx";
import { FillerLane, Lane } from "./Lane.tsx";
import * as styles from "./Track.module.less";

export const Track = memo(function Track({
  ticker,
  players: { all, me },
}: {
  ticker: string;
  players: PlayerList;
}) {
  return (
    <div className={styles.track}>
      <div className={styles.ticker}>{ticker}</div>
      {fillerLanes(all).map((id) => (
        <FillerLane key={id} />
      ))}
      {sortLanes(all, me).map((player) => (
        <Lane key={player.id} player={player} me={me} />
      ))}
      {me.finished && (
        <div className={styles.center}>
          <FlagImage className={styles.flagImage} />
        </div>
      )}
    </div>
  );
});

export const DeferredTrack = withDeferred(Track);

function sortLanes(all: readonly Player[], me: Player): Player[] {
  return [...all].sort((a, b) => {
    // Put me on the last lane.
    if (a === me) {
      return +1;
    }
    if (b === me) {
      return -1;
    }
    // Keep older players closer to me.
    return b.id - a.id;
  });
}

function fillerLanes(players: readonly Player[]): string[] {
  const keys = [];
  while (keys.length + players.length < 5) {
    keys.push(`filler-${keys.length}`);
  }
  return keys;
}
