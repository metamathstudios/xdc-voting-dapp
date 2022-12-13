import Navbar from "../components/Navbar";
import PreviewComponent from "../components/Preview";
import TermsPopup from "../components/TermsPopup";
import ProposalComponent from "../components/Proposal";

export default function Home() {
  return (
    <>
      <Navbar />
      <TermsPopup />
      <PreviewComponent />
      <ProposalComponent />
    </>
  );
}
