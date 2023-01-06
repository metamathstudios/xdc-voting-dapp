import { useContext } from "react";
import { Theme, ThemeContext } from "../../../../contexts/ThemeContext";
import invertedShare from "../../../../public/assets/svgicons/invertedShare.svg";
import styles from "./styles.module.scss";


const Feedback = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container} onClick={() => window.open("https://www.google.com/")}>
        <div className={styles.left}>
          <span>Give Your Feedback</span>
        </div>
        <div className={styles.right}>
          <span>Google Form</span>
          <img src={invertedShare.src} alt="Inverted Share" />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
