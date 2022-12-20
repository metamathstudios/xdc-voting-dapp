import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Theme, ThemeContext } from "../../../../contexts/themeContext";
import dropdownLight from "../../../../public/assets/svgicons/dropdownLight.svg";
import newDark from "../../../../public/assets/svgicons/newDark.svg";
import newLight from "../../../../public/assets/svgicons/newLight.svg";
import searchDark from "../../../../public/assets/svgicons/searchDark.svg";
import searchLight from "../../../../public/assets/svgicons/searchLight.svg";
import styles from "./styles.module.scss";

const Search = () => {
  const route = useRouter();

  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.search}>
          <div className={styles.limitWidth}>
            <Image
              src={theme == Theme.DARK ? searchDark : searchLight}
              alt="Search"
              width={25}
              height={25}
            />
          </div>

          <div className={styles.input}>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div
          className={styles.newProposal}
          onClick={() => route.push("/proposaleditor")}
        >
          <Image
            src={theme == Theme.DARK ? newDark : newLight}
            alt="New"
            width={16}
            height={16}
          />
          <span>New Proposal</span>
        </div>

        <div className={styles.dropdown}>
          <span>All</span>
          <Image src={dropdownLight} alt="New" width={13} height={13} />
        </div>
      </div>
    </div>
  );
};

export default Search;
