import clock from "../../../../public/assets/svgicons/clock.svg";
import styles from "./styles.module.scss";

const Card = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.icon} />
          <div className={styles.walletId}>wallet id</div>
        </div>
        <div className={styles.right}>
          <img src={clock.src} alt="Timing" />
          <div className={styles.timing}>04:32:18</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.title}>What is Lorem Ipsum</div>
        <div className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </div>
      </div>

      <div className={styles.tagList}>
        <div className={styles.tag}>Core</div>
        <div className={styles.tag}>XDC Community</div>
        <div className={styles.tag}>Urgent</div>
      </div>

      <div className={styles.footer}>
        <div className={styles.left}>
          <div className={styles.status}>wallet id</div>
          <div className={styles.icon} />
        </div>
        <div className={styles.middle}>
          <img src={clock.src} alt="Timing" />
          <div className={styles.timing}>04:32:18</div>
        </div>
        <div className={styles.right}>
          <img src={clock.src} alt="Timing" />
          <div className={styles.timing}>04:32:18</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
