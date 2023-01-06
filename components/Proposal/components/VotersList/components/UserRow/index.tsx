import { useContext } from "react";
import { Theme, ThemeContext } from "../../../../../../contexts/ThemeContext";
import styles from "./styles.module.scss";

type data = {
  name: string;
  date: string;
};

const UserRow = ({ name, date }: data) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.line} />
      <div className={styles.container}>
        <div className={styles.userContainer}>
          <div className={styles.profile}></div>

          <div className={styles.name}>{name}</div>
        </div>

        <div className={styles.dateContainer}>{date}</div>
      </div>
    </div>
  );
};

export default UserRow;
