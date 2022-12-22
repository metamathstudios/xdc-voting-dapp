import Image from "next/image";

import styles from "./styles.module.scss";

import { useContext } from "react";
import { Theme, ThemeContext } from "../../../../contexts/ThemeContext";
import more from "./assets/more.svg";

const LinkInput = ({ handleRenderNumber }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.label}>Link (Optional)</div>

        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <input type="text" />
          </div>

          <div className={styles.button} onClick={handleRenderNumber}>
            <Image src={more} alt="Add" className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkInput;
