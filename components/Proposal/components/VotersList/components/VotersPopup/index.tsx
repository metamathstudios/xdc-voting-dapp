import Image from "next/image";

import styles from "./styles.module.scss";

import { useContext } from "react";
import { Theme, ThemeContext } from "../../../../../../contexts/ThemeContext";
import UserRow from "../UserRow";
import close from "./assets/close.svg";

const maxItems = 9;
const maxLeft = (maxItems - 1) / 2;

type pagination = {
  limit: number;
  total: number;
  offset: number;
  setOffset: any;
  activePopup: any;
  setActivePopup: any;
  users: any;
};

const VotersPopup = ({
  limit,
  total,
  offset,
  setOffset,
  activePopup,
  setActivePopup,
  users,
}: pagination) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const first = Math.max(current - maxLeft, 1);

  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.centralizePopup}>
          <div className={styles.popupContainer}>
            <div className={styles.closeContainer}>
              <Image
                src={close}
                alt="Close"
                onClick={() => setActivePopup(false)}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className={styles.votersContainer}>
              <span>Voters</span>

              <div>{users?.length} Votes</div>
            </div>

            <div className={styles.dataContainer}>
              {users?.slice(0, 12).map((user, index) => {
                return <UserRow key={user} date={users[index].voterChoice ? "No" : "Yes"} name={`${users[index].voter}`} />
              })}
              {/* <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" />
              <UserRow date="08 hours" name="jaumdarkz.xdc" /> */}
            </div>

            <div className={styles.list}>
              <ul>
                {Array.from({ length: Math.min(maxItems, pages) })
                  .map((_, index) => index + first)
                  .map((page) => (
                    <li key={page}>
                      <div
                        onClick={() => setOffset((page - 1) * limit)}
                        className={
                          page === current
                            ? styles.activeButton
                            : styles.disabledButton
                        }
                      >
                        {page}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotersPopup;
