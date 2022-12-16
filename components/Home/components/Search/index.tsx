import { useRouter } from "next/router";
import { useContext } from "react";
import Image from "next/image";
import search from "../../../../public/assets/svgicons/search.svg";
import Button from "../../../reusable/Button";
import newicon from "../../../../public/assets/svgicons/new.svg";
import styles from "./styles.module.scss";
import { Web3ModalContext } from "../../../../contexts/web3modal";

const Search = () => {
  const route = useRouter();

  const { account } = useContext(Web3ModalContext); 

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bordered}>
          <div className={styles.search}>
            <div className={styles.limitWidth}>
              <Image src={search} alt="Search" width={25} height={25} />
            </div>
          </div>


          <div className={styles.input}>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        { account ? (
          <div style={{ width: "260px" }} onClick={() => {
            route.push("/editor");
          }}>
        <Button icon={newicon} text="New Proposal"/>
      </div>
        ) : (<></>) }
      </div>
    </>
  );
};

export default Search;
