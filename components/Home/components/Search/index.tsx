import Image from "next/image";
import { useRouter } from "next/router";
import { KeyboardEvent, useContext, useState } from "react";
import { Theme, ThemeContext } from "../../../../contexts/ThemeContext";

import { ProposalsContext } from "../../../../contexts/ProposalsContext";
import { Web3ModalContext } from "../../../../contexts/Web3ModalProvider";
import Button from "../../../reusable/Button";

import styles from "./styles.module.scss";

import newicon from "../../../../public/assets/svgicons/new.svg";
import search from "../../../../public/assets/svgicons/search.svg";
import dropdownsvg from "./assets/dropdown.svg";

const Search = () => {
  const route = useRouter();

  const { query, all, byTag } = useContext(ProposalsContext);
  const { account } = useContext(Web3ModalContext);
  const { theme } = useContext(ThemeContext);

  const [dropdown, setDropdown] = useState(false);
  const [tag, setTag] = useState("All");
  const [searchText, setSearchText] = useState("");

  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      if (searchText === "") {
        all();
        return;
      }
      query(searchText);
    }
  };

  const handleClick = () => {
    if (searchText === "") {
      all();
      return;
    }
    query(searchText);
  };

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <div className={styles.bordered}>
          <div className={styles.search}>
            <Image
              src={search}
              alt="Search"
              width={25}
              height={25}
              onClick={handleClick}
            />
          </div>

          <div className={styles.input}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleEnterPress}
            />
          </div>
        </div>
        {account && (
        <div
          style={
            tag == "XDC Community"
              ? { width: "260px", margin: "0px 0px 0px -10px" }
              : { width: "240px", margin: "0px 0px 0px -10px" }
          }
          onClick={() => {
            route.push("/editor");
          }}
        >
          <Button icon={newicon} text="New Proposal" />
        </div>
        )}

        <div
          className={styles.dropdownContainer}
          onClick={() => setDropdown(!dropdown)}
        >
          <div className={styles.label}>
            <span>{tag}</span>
          </div>

          <div className={styles.icon}>
            <Image src={dropdownsvg} alt="Drop" />
          </div>

          {dropdown && (
            <div className={styles.dropdown}>
              <div className={styles.optionsColumn}>
                <div
                  className={styles.option}
                  onClick={() => {
                    setTag("All");
                    all();
                  }}
                >
                  <span>All</span>
                </div>

                <div
                  className={styles.option}
                  onClick={() => {
                    byTag("CORE").then(setTag("Core"));
                  }}
                >
                  <span>Core</span>
                </div>

                <div
                  className={styles.option}
                  onClick={() => {
                    setTag("Treasury");
                    byTag("TREASURY");
                  }}
                >
                  <span>Treasury</span>
                </div>

                <div
                  className={styles.option}
                  onClick={() => {
                    setTag("XDC Community");
                    byTag("XDC_COMMUNITY");
                  }}
                >
                  <span>XDC Community</span>
                </div>

                <div
                  className={styles.option}
                  onClick={() => {
                    setTag("Urgent");
                    byTag("URGENT");
                  }}
                >
                  <span>Urgent</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
