import styles from "./styles.module.scss";

const VoteCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Cast your vote</div>

      <div className={styles.voteList}>
        <div className={styles.yes}>Yes</div>
        <div className={styles.no}>No</div>
        <div className={styles.abstain}>Abstain</div>
      </div>
    </div>
  );
};

export default VoteCard;
