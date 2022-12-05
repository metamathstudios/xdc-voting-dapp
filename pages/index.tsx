<<<<<<< HEAD
import Head from 'next/head'

import HomeComponent from '../components/Home'
import Navbar from '../components/Navbar'
=======
import HomeComponent from "../components/Home";
import Navbar from "../components/Navbar";
import Web3ModalProvider from "../contexts/web3modal";
>>>>>>> b57f102af9b93faa5f33c4751ba192449e5fdda9

export default function Home() {
  return (
    <>
<<<<<<< HEAD
      <Head>
        <title>XDC Voting DAPP</title>
        <meta charSet="utf-8" />
      </Head>

      <Navbar />
      <HomeComponent />
=======
      <Web3ModalProvider>
        <Navbar />
        <HomeComponent />
      </Web3ModalProvider>
>>>>>>> b57f102af9b93faa5f33c4751ba192449e5fdda9
    </>
  );
}
