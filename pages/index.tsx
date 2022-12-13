import Head from "next/head";

import HomeComponent from "../components/Home";
import Navbar from "../components/Navbar";
import TermsPopup from "../components/TermsPopup";

export default function Home() {
  return (
    <>
      <Head>
        <title>XDC Voting DAPP</title>
        <meta charSet="utf-8" />
      </Head>

      <Navbar />
      <TermsPopup />
      <HomeComponent />
    </>
  );
}
