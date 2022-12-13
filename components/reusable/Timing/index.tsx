/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import clock from "../../../public/assets/svgicons/clock.svg";
import clockEndend from "../../../public/assets/svgicons/clockEndend.svg";
import { toHHMMSS } from "../../../utils";
import styles from "./styles.module.scss";

interface Status {
  closes: number;
}

const Timing: React.FC<Status> = (props: Status) => {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    setInterval(() => {
      setTime(toHHMMSS(props.closes - Date.now() / 1000));
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      {props.closes - Date.now() / 1000 <= 0 ? (
        <>
          <img src={clockEndend.src} alt="Timing" />
          <div className={styles.ended}>Poll ended</div>
        </>
      ) : (
        <>
          <img src={clock.src} alt="Timing" />
          <div className={styles.timing}>{time}</div>
        </>
      )}
    </div>
  );
};

export default Timing;
