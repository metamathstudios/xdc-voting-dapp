import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Theme, ThemeContext } from "../../contexts/themeContext";
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

  useEffect(() => {
    setData({
      title: "The title of the page",
      tags: ["CORE", "TREASURY", "URGENT", "XDC_COMMUNITY"],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur. Excepteur sint occaecat cupidatat non proident,
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        \n \n
        \n \n
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
        quae ab illo inventore veritatis et quasi architecto beatae vitae
        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
        eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
        est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
        velit, sed quia non numquam eius modi tempora incidunt ut labore
        et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
        veniam, quis nostrum exercitationem ullam corporis suscipit
        laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
        vel eum iure reprehenderit qui in ea voluptate velit esse quam
        nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur? Sed ut perspiciatis unde omnis iste natus
        error sit voluptatem accusantium doloremque laudantium, totam rem
        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
        voluptatem quia voluptas sit aspernatur aut odit aut fugit
        \n \n
        \n \n
        sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
        dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam
        quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
        ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
        qui in ea voluptate velit esse quam nihil molestiae consequatur,
        vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
      contract: "0x514910771af9ca656af840dff83e8264ecf986ca",
      id: 1,
      creator: "0x514910771af9ca656af840dff83e8264ecf986ca",
      created: 1670896086,
      opens: 1670896086,
      closes: 1670889353,
      toll: 10,
      urls: ["www.link.com", "www.link.com", "www.link.com"],
      files: ["www.link.com", "www.link.com", "www.link.com"],
      options: ["YES", "NO", "ABSTAIN"],
      burnPercentage: 0.5,
      burnAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
      communityPercentage: 0.5,
      communityAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
    });
  }, []);

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
    </div>
  );
};

export default ProposalComponent;
