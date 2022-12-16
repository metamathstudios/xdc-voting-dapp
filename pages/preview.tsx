import Navbar from "../components/Navbar";
import TermsPopup from "../components/TermsPopup";
import ProposalComponent from "../components/Proposal";

export default function Home() {
  return (
    <>
      <Navbar />
      <TermsPopup />
      <ProposalComponent />
    </>
  );
}
