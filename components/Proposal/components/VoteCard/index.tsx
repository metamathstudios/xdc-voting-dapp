import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Theme, ThemeContext } from "../../../../contexts/ThemeContext";
import { BlockchainContext } from "../../../../contexts/BlockchainProvider";
import styles from "./styles.module.scss";

interface IData {
  voterChoice: number;
  hasVoted: boolean;
  data: any;
}

const VoteCard: React.FC<IData> = (props: IData) => {

  const route = useRouter();
  const { theme } = useContext(ThemeContext);
  const { votingHub } = useContext(BlockchainContext);
  const [ justVoted, setJustVoted ] = useState(false);


  const getColorByVote = (vote: number) => {
    var color = "";

    switch (vote) {
      case 0:
        color = "rgba(120, 214, 129, 1)";
        break;

      case 1:
        color = "rgba(255, 105, 105, 1)";
        break;

      case 2:
        color = "rgba(92, 130, 232, 1)";
        break;
    }

    return color;
  };

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.header}>Cast your vote</div>

        {!props.hasVoted || justVoted ? (
          <div className={styles.voteList}>
            <div className={styles.yes}
              onClick={() => {
                votingHub?.castVote(route.query.id as string, 1, props.data.toll);
              }}>Yes</div>
            <div className={styles.no}
              onClick={() => {
                votingHub?.castVote(route.query.id as string, 0, props.data.toll);
              }}>No</div>
            <div className={styles.abstain}
              onClick={() => {
                votingHub?.abstainVote(route.query.id as string, props.data.toll);
              }}>Abstain</div>
          </div>
        ) : (
          <div
            className={styles.alreadyVoted}
            style={{ color: getColorByVote(Number(props.voterChoice)) }}
          >
            You have already voted!
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteCard;