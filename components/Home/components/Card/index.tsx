import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Theme, ThemeContext } from "../../../../contexts/ThemeContext";
import like from "../../../../public/assets/svgicons/like.svg";
import whiteLike from "../../../../public/assets/svgicons/whiteLike.svg";
import { ellipseAddress, getPercentage } from "../../../../utils";
import Status, { StatusType } from "../../../reusable/Status";
import Timing from "../../../reusable/Timing";
import styles from "./styles.module.scss";

interface CardType {
  data: {
    title: string;
    tags: [string];
    description: string;
    contract: string;
    proposal: number;
    id: number;
    creator: string;
    created: number;
    opens: number;
    closes: number;
    toll: number;
    urls: [string];
    files: [string];
    options: [string];
    burnPercentage: number;
    burnAddress: string;
    communityPercentage: number;
    communityAddress: string;
  };
}

interface Votes {
  yes: number;
  no: number;
  abstain: number;
}

const Card: React.FC<CardType> = (props: CardType) => {
  const route = useRouter();

  const { theme } = useContext(ThemeContext);

  const [status, setStatus] = useState<StatusType>(StatusType.ACTIVE);
  const [votes, setVotes] = useState<Votes>({
    yes: 14,
    no: 9,
    abstain: 0,
  });

  useEffect(() => {
    if (Date.now()/1000 > props.data.opens && Date.now()/1000 < props.data.closes) {
      setStatus(StatusType.ACTIVE);
    } else if (Date.now()/1000 > props.data.closes) {
      if (votes.yes > votes.yes + votes.no + votes.abstain / 2) {
        setStatus(StatusType.PASSED);
      } else if (votes.yes < votes.yes + votes.no + votes.abstain / 2) {
        setStatus(StatusType.FAILED);
      }
    }
  }, []);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div
        className={styles.container}
        onClick={() => route.push("/proposal/" + props.data.proposal)}
      >
        <div className={styles.header}>
          <div className={styles.left}>
            <div className={styles.icon} />
            <div className={styles.walletId}>
              {ellipseAddress(props.data.creator)}
            </div>
          </div>
          <div className={styles.right}>
            <Timing closes={props.data.closes} />
          </div>
        </div>

      <div className={styles.content}>
        <div className={styles.title}>{props.data.title}</div>
        <div className={styles.description}>{`${props.data.description.slice(0, 256)}...`}</div>
      </div>
        <div className={styles.tagList}>
          {props.data.tags.slice(0, 4).map((value, index) => {
            return (
              <div className={styles.tag} key={index}>
                {props.data.tags[index]}
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.left}>
            <div className={styles.text}>Status:</div>
            <Status status={status} />
          </div>
          <div className={styles.middle}>
            <ProgressBar
              completed={getPercentage(
                votes.yes,
                votes.yes + votes.no + votes.abstain
              )}
              className={styles.loading}
              isLabelVisible={false}
              bgColor="#78D681"
              baseBgColor="#FF6969"
              height="8px"
            />
          </div>
          <div className={styles.right}>
            <img
              src={theme == Theme.DARK ? whiteLike.src : like.src}
              alt="Vote"
            />
            <div className={styles.text}>
              Votes: {votes.yes + votes.no + votes.abstain}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
