import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { Theme, ThemeContext } from "../../contexts/ThemeContext";
import { default as back } from "../../public/assets/svgicons/backArrow.svg";
import edit from "../../public/assets/svgicons/edit.svg";
import publish from "../../public/assets/svgicons/publish.svg";
import share from "../../public/assets/svgicons/share.svg";
import { ellipseAddress } from "../../utils";
import Status, { StatusType } from "../reusable/Status";
import Contract from "./components/Contract";
import Results from "./components/Results";
import VoteCard from "./components/VoteCard";
import VotersList from "./components/VotersList";
import styles from "./styles.module.scss";
import { ProposalsContext } from "../../contexts/ProposalsContext";
import { ExplorerUrl } from "../../blockchain/constants";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";

interface Votes {
  yes: number;
  no: number;
  abstain: number;
}

const ProposalComponent = () => {
  const route = useRouter();

  const { theme } = useContext(ThemeContext);

  const [data, setData] = useState<any>({});
  const [status, setStatus] = useState<StatusType>(StatusType.ACTIVE);
  const [votes, setVotes] = useState<Votes>({
    yes: 14,
    no: 9,
    abstain: 10,
  });
  const [postedOn, setPostedOn] = useState<string>("");
  const [closingTime, setClosingTime] = useState<number>(0);

  const { current, byId } = useContext(ProposalsContext);
  const { chainId } = useContext(Web3ModalContext);

  const id = parseInt(route.asPath.split("/")[2]);

  useEffect(() => {

    if (id && current?.proposal !== id) {
      const getData = async () => {
        await byId(id)
      }
      getData();
    }
    setData(current);

  }, [id, current]);

  useEffect(() => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(data.created * 1000);

    setPostedOn(
      date.getDate() +
      " - " +
      months[date.getMonth()] +
      " " +
      date.getFullYear()
    );

    setClosingTime(parseInt(data.closes) * 1000)

  }, [data]);

  useEffect(() => {
    if (Date.now() / 1000 > data.opens && Date.now() / 1000 < data.closes) {
      setStatus(StatusType.ACTIVE);
    } else if (Date.now() / 1000 > data.closes) {
      if (votes.yes > (votes.yes + votes.no + votes.abstain) / 2) {
        setStatus(StatusType.PASSED);
      } else if (votes.yes < (votes.yes + votes.no + votes.abstain) / 2) {
        setStatus(StatusType.FAILED);
      }
    }

  }, []);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.centerColumn}>
          <div className={styles.userOptions}>
            <div
              className={styles.backContainer}
              onClick={() => route.push("/")}
            >
              <Image src={back} alt="Back" width={17} />
              <div className={styles.text}>Back</div>
            </div>
            {route.pathname === "/preview" ? (
              <div className={styles.rightContainer}>
                <div
                  className={styles.edit}
                  onClick={() => route.push("/editor")}
                >
                  <div className={styles.image}>
                    <Image src={edit} alt="Edit" />
                  </div>

                  <div className={styles.text}>Edit</div>
                </div>

                <div className={styles.publish}>
                  <div className={styles.image}>
                    <Image src={publish} alt="Publish" width={16} />
                  </div>

                  <div className={styles.text}>Publish</div>
                </div >
              </div >
            ) : (
              <></>
            )}
          </div >
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.top}>
                
                  <div className={styles.left}>
                  
                    <div className={styles.icon} />
                    <div className={styles.walletId}>
                      {ellipseAddress(data.creator)}
                    </div>
                    <div className={styles.postDate}>Posted on {postedOn}</div>
                  </div>

                  

                  <div className={styles.title}>{data.title}</div>

                  <div className={styles.footer}>
                    <div className={styles.left}>
                      <Status status={status} />

                      <div className={styles.tagList}>
                        {data.tags &&
                          data.tags.slice(0, 4).map((value, index) => {
                            return (
                              <div className={styles.tag} key={index}>
                                {data.tags[index]}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.share}>
                        <span>Share</span>
                        <img src={share.src} alt="Search" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.infos}>
                  <div className={styles.text}>{data.description}</div>
                </div>
              </div>

              <div className={styles.sides}>
                <VoteCard />
                <Results votes={votes} />
                <VotersList />
                <Contract
                  contractAddress={data.contract}
                  link={`${ExplorerUrl.Networks[chainId ? chainId : 50]}xdc${String(data.contract).slice(2, String(data.contract).length)}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalComponent;
