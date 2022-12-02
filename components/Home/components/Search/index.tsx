import Image from "next/image";
import search from "../../../../public/assets/svgicons/search.svg";
import styles from "./styles.module.scss";

const Search = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div className={styles.limitWidth}>
          <Image src={search} alt="Search" width={25} height={25} />
        </div>
      </div>

      <div className={styles.input}>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default Search;
