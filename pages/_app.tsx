import type { AppProps } from "next/app";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { PopupContext } from "../contexts/PopupContext";
import ProposalsProvider from "../contexts/ProposalsContext";
import Web3ModalProvider from "../contexts/Web3ModalProvider";
import BlockchainProvider from "../contexts/BlockchainProvider";
import StatusUpdater from "../contexts/StatusUpdater";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [popup, setPopup] = useState(false);

  return (
    <Web3ModalProvider>
      <BlockchainProvider>
        <PopupContext.Provider value={{ popup, setPopup }}>
          <ProposalsProvider>
            <StatusUpdater>
              <Component {...pageProps} />
            </StatusUpdater>
          </ProposalsProvider>
        </PopupContext.Provider>
      </BlockchainProvider>
    </Web3ModalProvider>
  );
}
