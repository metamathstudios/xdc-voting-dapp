import Image from "next/image";
import { useCallback, useContext, useState } from "react";
import { PopupContext } from "../../contexts/popupContext";
import { Web3ModalContext } from "../../contexts/web3modal";
import close from "../../public/assets/svgicons/close.svg";
import styles from "./styles.module.scss";

const TermsPopup = () => {
  const [canConnect, setCanConnect] = useState(false);

  const { popup, setPopup } = useContext(PopupContext);
  const { connect } = useContext(Web3ModalContext);

  const handleConnect = useCallback(() => {
    connect();
  }, [connect]);

  const changeTerms = () => {
    const button = document.getElementById("button");
    const checkbox = document.getElementById("termsCheck") as HTMLInputElement;

    if (button) {
      if (checkbox.checked) {
        button.style.cursor = "pointer";
        button.style.backgroundColor = "rgba(120, 214, 129, 1)";
        setCanConnect(true);
      } else {
        button.style.cursor = "auto";
        button.style.backgroundColor = "rgb(202, 202, 202)";
        setCanConnect(false);
      }
    }
  };

  return (
    <>
      {popup && (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <Image
                src={close.src}
                alt="close"
                width={13}
                height={13}
                style={{ cursor: "pointer" }}
                onClick={() => setPopup(false)}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.title}>Terms and Conditions</div>
              <div className={styles.subTitle}>Update Abril 2020</div>
              <div className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec
                feugiat nisl pretium fusce id velit. Purus faucibus ornare
                suspendisse sed nisi lacus. Aliquam sem fringilla ut morbi
                tincidunt augue interdum.
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.left}>
                <input
                  type="checkbox"
                  name="termsCheck"
                  id="termsCheck"
                  onChange={() => changeTerms()}
                />
                <span>I agree to terms and conditions.</span>
              </div>
              <div className={styles.right}>
                <div
                  className={styles.button}
                  id="button"
                  onClick={() => {
                    if (canConnect) {
                      setPopup(false);
                      handleConnect();
                    }
                  }}
                >
                  Connect
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsPopup;
