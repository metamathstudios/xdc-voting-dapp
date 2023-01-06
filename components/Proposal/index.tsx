/* eslint-disable react/no-children-prop */
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState, useCallback } from "react";
import { ExplorerUrl } from "../../blockchain/constants";
import { ProposalsContext } from "../../contexts/ProposalsContext";
import { Theme, ThemeContext } from "../../contexts/ThemeContext";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import { BlockchainContext } from "../../contexts/BlockchainProvider";
import { StatusContext } from "../../contexts/StatusUpdater";
import { PreviewContext } from "../../contexts/PreviewContext";
import { default as back } from "../../public/assets/svgicons/backArrow.svg";
import edit from "../../public/assets/svgicons/edit.svg";
import publish from "../../public/assets/svgicons/publish.svg";
import share from "../../public/assets/svgicons/share.svg";
import { ellipseAddress } from "../../utils";
import Button from "../reusable/Button";
import Status, { StatusType } from "../reusable/Status";
import { VotingHubAddress } from "../../blockchain/constants";
import Contract from "./components/Contract";
import Results from "./components/Results";
import VoteCard from "./components/VoteCard";
import VotersList from "./components/VotersList";
import styles from "./styles.module.scss";
import { NotificationManager } from "react-notifications";
import ReactMarkdown from "react-markdown";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you

interface Votes {
  yes: number;
  no: number;
  abstain: number;
}

const ProposalComponent = () => {
  const route = useRouter();

  const { theme } = useContext(ThemeContext);
  const { value, title, startDate, endDate, tags } = useContext(PreviewContext);

  const [data, setData] = useState<any>({});
  const [status, setStatus] = useState<StatusType>(StatusType.ACTIVE);
  const [votes, setVotes] = useState<Votes>({
    yes: 0,
    no: 0,
    abstain: 0,
  });
  const [ postedOn, setPostedOn ] = useState<string>("");
  const { current, byId } = useContext(ProposalsContext);

  const { votingHub } = useContext(BlockchainContext);
  const { statusUpdated, setStatusUpdated } = useContext(StatusContext);
  const { account, chainId } = useContext(Web3ModalContext);
  const [ receipt, setReceipt ] = useState<any>([]);
  const [ inChainData, setInChainData ] = useState<any>([]);

  const id = parseInt(route.asPath.split("/")[2]);
  const isPreview = route.pathname === "/preview";

  useEffect(() => {
    if (id && current?.proposal !== id) {
      const getData = async () => {
        await byId(id);
      };
      getData();
    }
    if (isPreview && account && chainId) {
      setData({
        created: Date.now() / 1000,
        opens: Math.floor(new Date(startDate).getSeconds()),
        closes: Math.floor(new Date(endDate).getSeconds()),
        creator: account,
        title: title,
        tags: tags,
        description: value,
        contract: VotingHubAddress.Networks[chainId],
      })
      return
    }
    setData(current);
  }, [id, current]);

  useEffect(() => {
    if (!account) return;
    if (receipt.length === 0 && id.toString() !== 'NaN') {
      votingHub?.votingReceipt(id, account).then(
        (receipts) => {
          setReceipt(receipts);
          votingHub?.getProposal(id).then(
            (res) => {
              setInChainData(res)
            }
          ).catch((err) => {
            console.log(err);
          });
          setStatusUpdated(!statusUpdated);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [statusUpdated, id, account]);

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
                <div onClick={() => route.push("/editor")}>
                  <Button icon={edit} text="Edit" />
                </div>

                <div onClick={() => NotificationManager.error("Beta Test Notification: This feature is not available yet!")}>
                  <Button icon={publish} text="Publish" />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
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
                  <div className={styles.text}>
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, '')}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {data.description}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              <div className={styles.sides}>
                <VoteCard voterChoice={receipt.voterChoice} hasVoted={receipt.hasVoted} data={inChainData} />
                <Results data={inChainData} />
                <VotersList id={id}/>
                <Contract
                  contractAddress={data.contract}
                  link={`${ExplorerUrl.Networks[chainId ? chainId : 50]
                    }xdc${String(data.contract).slice(
                      2,
                      String(data.contract).length
                    )}`}
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
