/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import clock from "../../../public/assets/svgicons/clock.svg";
import clockEndend from "../../../public/assets/svgicons/clockEndend.svg";
import { toHHMMSS } from "../../../utils";
import styles from "./styles.module.scss";
import { Theme, ThemeContext } from "../../../contexts/ThemeContext";

interface Status {
  closes: number;
}

const Timing = (props: Status) => {
  const [time, setTime] = useState("00:00:00");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setInterval(() => {
      if(props.closes - Number((Date.now() / 1000).toFixed()) <= 0) return;
      const time = toHHMMSS(props.closes - Number((Date.now() / 1000).toFixed()))
      if( time && time !== `NaN:NaN:NaN`)
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
          <div className={theme == Theme.DARK ? styles.timingDark : styles.timing}>{time}</div>
        </>
      )}
    </div>
  );
};

export default Timing;
