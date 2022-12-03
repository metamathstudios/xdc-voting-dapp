import HomeComponent from "../components/Home";
import Navbar from "../components/Navbar";
import Web3ModalProvider from "../contexts/web3modal";

export default function Home() {
  return (
    <>
      <Web3ModalProvider>
        <Navbar />
        <HomeComponent />
      </Web3ModalProvider>
    </>
  );
}
