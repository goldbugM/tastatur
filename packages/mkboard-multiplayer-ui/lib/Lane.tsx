import { useIntlNumbers } from "@mkboard/intl";
import { type Player, positionName } from "@mkboard/multiplayer-shared";
import { UserName } from "@mkboard/pages-shared";
import { NameValue, Value } from "@mkboard/widget";
import { clsx } from "clsx";
import { memo, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { CarImage } from "./image/car.tsx";
import * as styles from "./Lane.module.less";

export const Lane = memo(function Lane({
  player,
  me,
}: {
  player: Player;
  me: Player;
}) {
  const { speed, errors, position, progress } = player;
  const { formatMessage } = useIntl();
  const { formatNumber, formatPercents } = useIntlNumbers();
  const refLane = useRef<HTMLDivElement>(null);
  const refCar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lane = refLane.current;
    const car = refCar.current;
    if (lane != null && car != null) {
      const laneWidth = lane.offsetWidth;
      const carWidth = car.offsetWidth;
      car.style.insetInlineStart = `${(laneWidth - carWidth) * progress}px`;
    }
  }, [progress]);
  return (
    <div
      className={clsx(
        styles.player,
        player.finished && styles.isFinished,
        player.spectator && styles.isSpectator,
        player === me && styles.isMe,
      )}
    >
      <div className={styles.name}>
        <UserName user={player.user} />
      </div>
      <div ref={refLane} className={styles.lane}>
        <div ref={refCar} className={styles.car}>
          <CarImage className={styles.carImage} seed={player.id} />
        </div>
      </div>
      <div className={styles.details}>
        <NameValue
          name={formatMessage({
            id: "multiplayer.track.position.label",
            defaultMessage: "Position",
          })}
          value={
            <Value //
              className={styles.wideValue}
              value={positionName(position)}
            />
          }
        />
        <NameValue
          name={formatMessage({
            id: "multiplayer.track.distance.label",
            defaultMessage: "Progress",
          })}
          value={
            <Value //
              className={styles.wideValue}
              value={formatPercents(progress, 1)}
            />
          }
        />
        <NameValue
          name={formatMessage({
            id: "multiplayer.track.speed.label",
            defaultMessage: "Speed",
          })}
          value={
            <Value //
              className={styles.wideValue}
              value={formatNumber(speed)}
            />
          }
        />
        <NameValue
          name={formatMessage({
            id: "multiplayer.track.errors.label",
            defaultMessage: "Errors",
          })}
          value={
            <Value //
              className={styles.wideValue}
              value={formatNumber(errors)}
            />
          }
        />
      </div>
    </div>
  );
});

export const FillerLane = memo(function FillerLane() {
  return <div className={clsx(styles.player, styles.isFiller)} />;
});
