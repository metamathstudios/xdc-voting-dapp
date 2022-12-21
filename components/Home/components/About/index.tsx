import Logo from "../../../../public/assets/logo/xdc-community.png";
import Discord from "../../../../public/assets/socialmedia/discord.svg";
import Instagram from "../../../../public/assets/socialmedia/instagram.svg";
import Twitter from "../../../../public/assets/socialmedia/twitter.svg";
import styles from "./styles.module.scss";
import { useContext, useEffect, useState } from "react";
import { BlockchainContext } from "../../../../contexts/BlockchainProvider";
import { Web3ModalContext } from "../../../../contexts/Web3ModalProvider";
import { StatusContext } from "../../../../contexts/StatusUpdater";

const About = () => {

  const { web3 , account } = useContext(Web3ModalContext);
  const { votingHub : VotingHubWrapper } = useContext(BlockchainContext);
  const { statusUpdated, setStatusUpdated } = useContext(StatusContext);

  const [totalTollPaid, setTotalTollPaid] = useState(0);
  const [totalXDCSpent, setTotalXDCSpent] = useState(0);
  const [totalXDCBurned, setTotalXDCBurned] = useState(0);

  useEffect(() => {
    if(!web3 || !account) return;
    setStatusUpdated(!statusUpdated);
  }, [web3, account])

  useEffect(() => {
    if(!web3 || !account) return;

    VotingHubWrapper?.totalTollCollected().then(
      (value) => {
        value ? setTotalTollPaid(Number(value) / 10 ** 18) : setTotalTollPaid(0);
      }
    );

    VotingHubWrapper?.totalTollBurned().then(
      (value) => {
        console.log(value)
        value ? setTotalXDCBurned(Number(value) / 10 ** 18) : setTotalXDCBurned(0);
      }
    );
    
  }, [statusUpdated])

  return (
    <div className={styles.container}>
      <div className={styles.header}>About this dApp</div>

      <div className={styles.infos}>
        <div className={styles.row}>
          <div className={styles.left}>Total XDC toll paid:</div>
          <div className={styles.right}>{totalTollPaid}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.left}>Total XDC burned:</div>
          <div className={styles.right}>{totalXDCBurned}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.left}>Total XDC spent:</div>
          <div className={styles.right}>{totalXDCSpent}</div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.social}>
          {/* <img src={Instagram.src} alt="Icon" width={25} height={25} /> */}
          <span onClick={() => window.open("https://discord.gg/3BhJPFykAg")}><img src={Discord.src} alt="Icon" width={25} height={25} /></span> 
          <span onClick={() => window.open("https://twitter.com/xdc_community")}><img src={Twitter.src} alt="Icon" width={25} height={25} /></span>
        </div>
        <div className={styles.logo}>
          <span onClick={() => window.open("https://docs.xdc.community/")}><img src={Logo.src} alt="Icon" /></span>
        </div>
      </div>
    </div>
  );
};

export default About;
