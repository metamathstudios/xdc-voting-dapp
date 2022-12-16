import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useContext, useState } from "react";
import moon from "../../public/assets/darkmode/moon.svg";
import sun from "../../public/assets/lightmode/sun.svg";
import logo from "../../public/assets/logo/votinglogo.svg";
import styles from "./styles.module.scss";

import { PopupContext } from "../../contexts/PopupContext";
import { Web3ModalContext } from "../../contexts/web3modal";
import { ellipseAddress } from "../../utils";

const Navbar = () => {
  //false == light | true == dark
  const [light, setLight] = useState(false);
  const route = useRouter();

  const { connect, disconnect, account } = useContext(Web3ModalContext);
  const { setPopup } = useContext(PopupContext);

  const handleConnect = useCallback(() => {
    connect();
  }, [connect]);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.limitedContainer}>
          <div className={styles.logo} onClick={() => route.push('/')}>
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
              className={light == false ? styles.lightMode : styles.darkMode}
              onClick={() => setLight(!light)}
            >
              <div className={styles.limitWidth}>
                <Image src={light == false ? moon : sun} alt="Switch" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.line} />
    </>
  );
};

export default Navbar;
