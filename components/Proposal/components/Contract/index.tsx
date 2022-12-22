import { useContext } from "react";
import { Theme, ThemeContext } from "../../../../contexts/ThemeContext";
import invertedShare from "../../../../public/assets/svgicons/invertedShare.svg";
import { ellipseAddress } from "../../../../utils";

import styles from "./styles.module.scss";

interface ContractType {
  contractAddress: string;
  link: string;
}

const Contract: React.FC<ContractType> = (props: ContractType) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container} onClick={() => window.open(props.link)}>
        <div className={styles.left}>
          <span>Polling Contract</span>
        </div>
        <div className={styles.right}>
          <span>{ellipseAddress(props.contractAddress)}</span>
          <img src={invertedShare.src} alt="Inverted Share" />
        </div>
      </div>
    </div>
  );
};

export default Contract;
