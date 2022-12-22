import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";

import { Theme, ThemeContext } from "../../contexts/ThemeContext";

import moon from "../../public/assets/darkmode/moon.svg";
import sun from "../../public/assets/lightmode/sun.svg";
import logo from "../../public/assets/logo/votinglogo.svg";

import { PopupContext } from "../../contexts/PopupContext";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import { ellipseAddress } from "../../utils";
import styles from "./styles.module.scss";

const Navbar = () => {
  const router = useRouter();
  const { setPopup } = useContext(PopupContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { disconnect, account } = useContext(Web3ModalContext);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.limitedContainer}>
          <div className={styles.logo} onClick={() => router.push("/")}>
            <Image src={logo} alt="Logo" />
          </div>

          <div className={styles.userOptions}>
            {!account ? (
              <div
                className={styles.connectButton}
                onClick={() => setPopup(true)}
              >
                Connect Wallet
              </div>
            ) : (
              <div className={styles.connectButton} onClick={handleDisconnect}>
                {ellipseAddress(account)}
              </div>
            )}

            <div
              className={
                theme == Theme.DARK ? styles.darkMode : styles.lightMode
              }
              onClick={() => {
                if (theme == Theme.DARK) {
                  setTheme(Theme.LIGHT);
                } else {
                  setTheme(Theme.DARK);
                }
              }}
            >
              <div className={styles.limitWidth}>
                <Image src={theme === Theme.DARK ? sun : moon} alt="Switch" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.line} />
    </div>
  );
};

export default Navbar;
