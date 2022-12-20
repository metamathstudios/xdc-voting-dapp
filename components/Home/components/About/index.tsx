import { useContext } from "react";
import { Theme, ThemeContext } from "../../../../contexts/themeContext";
import lightLogo from "../../../../public/assets/logo/smallLightLogo.svg";
import Logo from "../../../../public/assets/logo/xdc-community.png";
import Discord from "../../../../public/assets/socialmedia/discord.svg";
import Instagram from "../../../../public/assets/socialmedia/instagram.svg";
import Twitter from "../../../../public/assets/socialmedia/twitter.svg";
import WhiteDiscord from "../../../../public/assets/socialmedia/whiteDiscord.svg";
import WhiteInstagram from "../../../../public/assets/socialmedia/whiteInstagram.svg";
import WhiteTwitter from "../../../../public/assets/socialmedia/whiteTwitter.svg";
import styles from "./styles.module.scss";

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.header}>About this dApp</div>

        <div className={styles.infos}>
          <div className={styles.row}>
            <div className={styles.left}>Total XDC toll paid:</div>
            <div className={styles.right}>00000</div>
          </div>

          <div className={styles.row}>
            <div className={styles.left}>Total XDC spent:</div>
            <div className={styles.right}>00000</div>
          </div>

          <div className={styles.row}>
            <div className={styles.left}>Total XDC burned:</div>
            <div className={styles.right}>00000</div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.social}>
            <img
              src={theme == Theme.DARK ? WhiteInstagram.src : Instagram.src}
              alt="Icon"
              width={25}
              height={25}
            />
            <img
              src={theme == Theme.DARK ? WhiteDiscord.src : Discord.src}
              alt="Icon"
              width={25}
              height={25}
            />
            <img
              src={theme == Theme.DARK ? WhiteTwitter.src : Twitter.src}
              alt="Icon"
              width={25}
              height={25}
            />
          </div>
          <div className={styles.logo}>
            <img
              src={theme == Theme.DARK ? lightLogo.src : Logo.src}
              alt="Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
