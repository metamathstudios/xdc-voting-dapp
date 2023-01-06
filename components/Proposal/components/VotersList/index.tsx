import { useContext, useState, useEffect } from "react";
import { Theme, ThemeContext } from "../../../../contexts/ThemeContext";
import UserRow from "./components/UserRow";
import VotersPopup from "./components/VotersPopup";
import styles from "./styles.module.scss";
import { Web3ModalContext } from "../../../../contexts/Web3ModalProvider";
import { StatusContext } from "../../../../contexts/StatusUpdater";
import { VotingHubAddress, DeploymentBlock } from "../../../../blockchain/constants";
import { RpcEndpoint } from "../../../../blockchain/constants";
import { fetchVotes } from "../../../../utils";

const VotersList = (id : any) => {
  const { account, chainId } = useContext(Web3ModalContext);
  const { statusUpdated, setStatusUpdated } = useContext(StatusContext);
  const { theme } = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState(0);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    if (!chainId || !account) return;
    setStatusUpdated(!statusUpdated);
  }, [chainId, account])

  useEffect(() => {
    if (!chainId || !account) return;
    try {
      fetchVotes(id.id, VotingHubAddress.Networks[chainId], RpcEndpoint.Networks[chainId], DeploymentBlock.Networks[chainId]).then(setUsers)
    } catch (e) {
      console.log(e)
    }
  }, [statusUpdated])

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.votersContainer}>
          <div className={styles.label}>Voters</div>

          <div className={styles.totalVotes}>{users?.length} Votes</div>
        </div>

        <div className={styles.userListContainer}>
          {users?.slice(0, 7).map((user, index) => {
            return <UserRow key={user} date={users[index].voterChoice ? "No" : "Yes"} name={`${users[index].voter.slice(0 , 25)}...`} />
          })}
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
          total={users?.length}
          offset={offset}
          setOffset={setOffset}
          activePopup={active}
          setActivePopup={setActive}
          users={users}
        />
      )}
    </div>
  );
};

export default VotersList;
