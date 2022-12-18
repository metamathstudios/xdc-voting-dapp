import { useState } from "react";
import styles from "./styles.module.scss";
import { generateHexString } from "../../../../utils";

const VoteCard = () => {
  const [votedWith, setVotedWith] = useState("");

  const getColorByVote = (vote: string) => {
    var color = "";

    switch (vote) {
      case "yes":
        color = "rgba(120, 214, 129, 1)";
        break;

      case "no":
        color = "rgba(255, 105, 105, 1)";
        break;

      case "abstain":
        color = "rgba(92, 130, 232, 1)";
        break;
    }

    return color;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Cast your vote</div>

      {votedWith === "" ? (
        <div className={styles.voteList}>
          <div className={styles.yes}>Yes</div>
          <div className={styles.no}>No</div>
          <div className={styles.abstain}>Abstain</div>
        </div>
      ) : (
        <div
          className={styles.alreadyVoted}
          style={{ color: getColorByVote(votedWith) }}
        >
          You have already voted!
        </div>
      )}
    </div>
  );
};

export default VoteCard;
