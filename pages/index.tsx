import Head from "next/head";

import HomeComponent from "../components/Home";
import Navbar from "../components/Navbar";
import Web3ModalProvider from "../contexts/web3modal";

export default function Home() {
  return (
    <>
      <Head>
        <title>XDC Voting DAPP</title>
        <meta charSet="utf-8" />
      </Head>

      <Web3ModalProvider>
        <Navbar />
        <HomeComponent />
      </Web3ModalProvider>
    </>
  );
}
