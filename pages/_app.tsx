import type { AppProps } from "next/app";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { PopupContext } from "../contexts/PopupContext";
import Web3ModalProvider from "../contexts/web3modal";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [popup, setPopup] = useState(false);

  return (
    <Web3ModalProvider>
      <PopupContext.Provider value={{ popup, setPopup }}>
        <Component {...pageProps} />
      </PopupContext.Provider>
    </Web3ModalProvider>
  );
}
