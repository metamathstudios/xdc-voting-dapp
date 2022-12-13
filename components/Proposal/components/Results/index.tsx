import ProgressBar from "@ramonak/react-progress-bar";
import { getPercentage } from "../../../../utils";
import styles from "./styles.module.scss";

interface ResultsType {
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
}

const Results: React.FC<ResultsType> = (props: ResultsType) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Current results</div>

      <div className={styles.results}>
        <div className={styles.result}>
          <div className={styles.text}>
            <div className={styles.left}>Yes</div>
            <div className={styles.right}>
              {props.votes.yes} -{" "}
              {getPercentage(
                props.votes.yes,
                props.votes.yes + props.votes.no + props.votes.abstain
              ) + "%"}
            </div>
          </div>
          <ProgressBar
            completed={getPercentage(
              props.votes.yes,
              props.votes.yes + props.votes.no + props.votes.abstain
            )}
            className={styles.loading}
            bgColor="#78D681"
            height="8px"
            isLabelVisible={false}
          />
        </div>

        <div className={styles.result}>
          <div className={styles.text}>
            <div className={styles.left}>No</div>
            <div className={styles.right}>
              {props.votes.no} -{" "}
              {getPercentage(
                props.votes.no,
                props.votes.yes + props.votes.no + props.votes.abstain
              ) + "%"}
            </div>
          </div>
          <ProgressBar
            completed={getPercentage(
              props.votes.no,
              props.votes.yes + props.votes.no + props.votes.abstain
            )}
            className={styles.loading}
            bgColor="#FF6969"
            height="8px"
            isLabelVisible={false}
          />
        </div>

        <div className={styles.result}>
          <div className={styles.text}>
            <div className={styles.left}>Abstain</div>
            <div className={styles.right}>
              {props.votes.abstain} -{" "}
              {getPercentage(
                props.votes.abstain,
                props.votes.yes + props.votes.no + props.votes.abstain
              ) + "%"}
            </div>
          </div>
          <ProgressBar
            completed={getPercentage(
              props.votes.abstain,
              props.votes.yes + props.votes.no + props.votes.abstain
            )}
            className={styles.loading}
            bgColor="#5C82E8"
            height="8px"
            isLabelVisible={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
