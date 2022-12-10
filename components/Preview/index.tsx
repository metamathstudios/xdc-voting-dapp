import Image from "next/image";
import clock from "../../public/assets/svgicons/clock.svg";
import edit from "../../public/assets/svgicons/edit.svg";
import publish from "../../public/assets/svgicons/publish.svg";
import share from "../../public/assets/svgicons/share.svg";
import Button from "../reusable/Button";
import File from "../reusable/File";
import styles from "./styles.module.scss";

const PreviewComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centerColumn}>
        <div className={styles.actions}>
          <Button icon={edit} text="Edit" />
          <Button icon={publish} text="Publish" />
        </div>
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
              <div className={styles.status}>Preview</div>
              <div className={styles.share}>
                <span>Share</span>
                <Image src={share} alt="Search" width={13} height={13} />
              </div>
            </div>
          </div>

          <div className={styles.infos}>
            <div className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              <br />
              <br />
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
              <br />
              <br />
              sed quia consequuntur magni dolores eos qui ratione voluptatem
              sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
              dolor sit amet, consectetur, adipisci velit, sed quia non numquam
              eius modi tempora incidunt ut labore et dolore magnam aliquam
              quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
              ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
              qui in ea voluptate velit esse quam nihil molestiae consequatur,
              vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>

            <div className={styles.links}>
              <span className={styles.linksTitle}>Links:</span>
              <a className={styles.link} href="https://www.google.com">
                https://www.google.com
              </a>
            </div>

            <div className={styles.files}>
              <File name="file.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;
