import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Theme, ThemeContext } from "../../contexts/themeContext";
import backArrow from "../../public/assets/svgicons/backArrow.svg";
import share from "../../public/assets/svgicons/share.svg";
import { ellipseAddress } from "../../utils";
import Status, { StatusType } from "../reusable/Status";
import Timing from "../reusable/Timing";
import Contract from "./components/Contract";
import Results from "./components/Results";
import VoteCard from "./components/VoteCard";
import VotersList from "./components/VotersList";
import styles from "./styles.module.scss";

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

  useEffect(() => {
    const date = new Date(1670896086 * 1000);

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

    setData({
      title: "The title of the page",
      tags: ["Core", "Treasury", "Urgent", "XDC Community"],
      description:
        "The description of the page \n\n This is a new line \n\n This is another new line",
      contract: "0x514910771af9ca656af840dff83e8264ecf986ca",
      id: 1,
      creator: "0x514910771af9ca656af840dff83e8264ecf986ca",
      created: 1670896086,
      opens: 1670896086,
      closes: 1670889353,
      toll: 10,
      urls: ["www.link.com", "www.link.com", "www.link.com"],
      files: ["www.link.com", "www.link.com", "www.link.com"],
      options: ["Yes", "No", "Abstain"],
      burnPercentage: 0.5,
      burnAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
      communityPercentage: 0.5,
      communityAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
      postedOn:
        date.getDate() +
        " - " +
        months[date.getMonth()] +
        " " +
        date.getFullYear(),
    });
  }, []);

  useEffect(() => {
    if (Date.now() > data.opens && Date.now() < data.closes) {
      setStatus(StatusType.ACTIVE);
    } else if (Date.now() > data.closes) {
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
          <div className={styles.actions}>
            <div
              className={styles.back}
              onClick={() => {
                route.push("/");
              }}
            >
              <img src={backArrow.src} alt="Timing" />
              <span>Back</span>
            </div>
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
                    <div className={styles.postDate}>
                      Posted on {data.postedOn}
                    </div>
                  </div>
                  <div className={styles.right}>
                    <Timing closes={data.closes} />
                  </div>
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
                link="https://google.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalComponent;
