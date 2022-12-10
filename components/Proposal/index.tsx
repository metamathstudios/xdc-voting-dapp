import { useRouter } from "next/router";
import backArrow from "../../public/assets/svgicons/backArrow.svg";
import clock from "../../public/assets/svgicons/clock.svg";
import share from "../../public/assets/svgicons/share.svg";
import Status, { StatusType } from "../reusable/Status";
import Contract from "./components/Contract";
import Results from "./components/Results";
import VoteCard from "./components/VoteCard";
import styles from "./styles.module.scss";

const ProposalComponent = () => {
  const route = useRouter();

  return (
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
                  <div className={styles.walletId}>wallet id</div>
                  <div className={styles.postDate}>Posted on 2 - July 2022</div>
                </div>
                <div className={styles.right}>
                  <img src={clock.src} alt="Timing" />
                  <div className={styles.timing}>23:59:59</div>
                </div>
              </div>

              <div className={styles.title}>What is Lorem Ipsum?</div>

              <div className={styles.footer}>
                <div className={styles.left}>
                  <Status status={StatusType.ACTIVE} />

                  <div className={styles.tagList}>
                    <div className={styles.tag}>Core</div>
                    <div className={styles.tag}>XDC Community</div>
                    <div className={styles.tag}>Urgent</div>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br />
                <br />
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur? Sed ut perspiciatis unde omnis iste
                natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
                <br />
                <br />
                sed quia consequuntur magni dolores eos qui ratione voluptatem
                sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                dolor sit amet, consectetur, adipisci velit, sed quia non
                numquam eius modi tempora incidunt ut labore et dolore magnam
                aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                nostrum exercitationem ullam corporis suscipit laboriosam, nisi
                ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
              </div>
            </div>
          </div>

          <div className={styles.sides}>
            <VoteCard />
            <Results />
            <Contract />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalComponent;
