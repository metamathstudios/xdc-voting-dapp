import Head from "next/head";

import Navbar from "../components/Navbar";
import ProposalEditorComponent from "../components/ProposalEditor";
import TermsPopup from "../components/TermsPopup";

export default function ProposalEditor() {
  return (
    <>
      <Head>
        <title>XDC Voting DAPP</title>
        <meta charSet="utf-8" />
      </Head>

      <Navbar />
      <TermsPopup />
      <ProposalEditorComponent />
    </>
  );
}
