import { useContext, useState } from "react";
import { Theme, ThemeContext } from "../../../../contexts/themeContext";
import UserRow from "./components/UserRow";
import VotersPopup from "./components/VotersPopup";
import styles from "./styles.module.scss";

let usersTotal = 70;

const VotersList = () => {
  const { theme } = useContext(ThemeContext);

  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState(0);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.votersContainer}>
          <div className={styles.label}>Voters</div>

          <div className={styles.totalVotes}>{30} Votes</div>
        </div>

        <div className={styles.userListContainer}>
          <UserRow date="03 hours" name="thaurinos.eth" />
          <UserRow date="05 hours" name="jaumzin.xdc" />
          <UserRow date="08 hours" name="commeta.xdc" />
          <UserRow date="12 hours" name="koroshy.xdc" />
          <UserRow date="15 hours" name="alienstorm.xdc" />
          <UserRow date="18 hours" name="igorjcqs.xdc" />
          <UserRow date="22 hours" name="joker.xdc" />
        </div>

        <div className={styles.line} />

        <div
          className={styles.seeMoreContainer}
          onClick={() => setActive(!active)}
        >
          See more
        </div>
      </div>

      {active && (
        <VotersPopup
          limit={12}
          total={usersTotal}
          offset={offset}
          setOffset={setOffset}
          activePopup={active}
          setActivePopup={setActive}
        />
      )}
    </div>
  );
};

export default VotersList;
