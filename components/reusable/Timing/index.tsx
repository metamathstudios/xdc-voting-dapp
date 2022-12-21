/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import clock from "../../../public/assets/svgicons/clock.svg";
import clockEndend from "../../../public/assets/svgicons/clockEndend.svg";
import { toHHMMSS } from "../../../utils";
import styles from "./styles.module.scss";

interface Status {
  closes: number;
}

const Timing = (props: Status) => {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    setInterval(() => {
      const time = toHHMMSS(props.closes - (Date.now() / 1000))
      if( time !== undefined && time !== `NaN:NaN:NaN`)
      setTime(time);
    }, 1000);
  }, [time]);

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
