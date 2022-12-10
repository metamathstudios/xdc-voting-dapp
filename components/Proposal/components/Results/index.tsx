import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./styles.module.scss";

const Results = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Current results</div>

      <div className={styles.results}>
        <div className={styles.result}>
          <div className={styles.text}>
            <div className={styles.left}>Yes</div>
            <div className={styles.right}>20 - 90%</div>
          </div>
          <ProgressBar
            completed={90}
            className={styles.loading}
            bgColor="#2049B9"
            height="8px"
            isLabelVisible={false}
          />
        </div>

        <div className={styles.result}>
          <div className={styles.text}>
            <div className={styles.left}>No</div>
            <div className={styles.right}>8 - 8%</div>
          </div>
          <ProgressBar
            completed={8}
            className={styles.loading}
            bgColor="#2049B9"
            height="8px"
            isLabelVisible={false}
          />
        </div>

        <div className={styles.result}>
          <div className={styles.text}>
            <div className={styles.left}>Abstain</div>
            <div className={styles.right}>2 - 2%</div>
          </div>
          <ProgressBar
            completed={2}
            className={styles.loading}
            bgColor="#2049B9"
            height="8px"
            isLabelVisible={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
