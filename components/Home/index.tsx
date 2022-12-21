import { useContext } from "react";
import { Theme, ThemeContext } from "../../contexts/themeContext";
import About from "./components/About";
import List from "./components/List";
import Search from "./components/Search";
import styles from "./styles.module.scss";

const HomeComponent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.centerColumn}>
          <Search />
          <div className={styles.contentGrid}>
            <div className={styles.left}>
              <List />
            </div>

            <div className={styles.right}>
              <About />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
