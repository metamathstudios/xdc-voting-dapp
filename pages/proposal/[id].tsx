import Navbar from "../../components/Navbar";
import ProposalComponent from "../../components/Proposal";
import TermsPopup from "../../components/TermsPopup";

export default function Home() {
  return (
    <>
      <Navbar />
      <TermsPopup />
      <ProposalComponent />
    </>
  );
}
