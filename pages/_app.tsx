import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import BlockchainProvider from "../contexts/BlockchainProvider";
import { PopupContext } from "../contexts/PopupContext";
import ProposalsProvider from "../contexts/ProposalsContext";
import StatusUpdater from "../contexts/StatusUpdater";
import { Theme, ThemeContext } from "../contexts/ThemeContext";
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import Web3ModalProvider from "../contexts/Web3ModalProvider";
import "../styles/globals.scss";
import PreviewProvider, { PreviewContext } from "../contexts/PreviewContext";

export default function App({ Component, pageProps }: AppProps) {
  const [popup, setPopup] = useState(false);
  const [theme, setTheme] = useState(Theme.LIGHT);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.body.style.backgroundColor = "#242424";
    } else {
      document.body.style.backgroundColor = "#fff";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Web3ModalProvider>
        <BlockchainProvider>
          <PopupContext.Provider value={{ popup, setPopup }}>
            <ProposalsProvider>
              <StatusUpdater>
                <PreviewProvider>
                  <Component {...pageProps} />
                </PreviewProvider>
                <NotificationContainer />
              </StatusUpdater>
            </ProposalsProvider>
          </PopupContext.Provider>
        </BlockchainProvider>
      </Web3ModalProvider>
    </ThemeContext.Provider>
  );
}
