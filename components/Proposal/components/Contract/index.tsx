import invertedShare from "../../../../public/assets/svgicons/invertedShare.svg";
import styles from "./styles.module.scss";

const Contract = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span>Polling Contract</span>
      </div>
      <div className={styles.right}>
        <span>OxF9u3...325f</span>
        <img src={invertedShare.src} alt="Inverted Share" />
      </div>
    </div>
  );
};

export default Contract;
