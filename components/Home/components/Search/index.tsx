import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Image from "next/image";
<<<<<<< HEAD
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
=======

import Button from "../../../reusable/Button";
import { Web3ModalContext } from "../../../../contexts/web3modal";

import styles from "./styles.module.scss";

import newicon from "../../../../public/assets/svgicons/new.svg";
import search from "../../../../public/assets/svgicons/search.svg";
import dropdownsvg from './assets/dropdown.svg'

const Search = () => {
  const route = useRouter();

  const { account } = useContext(Web3ModalContext);

  const [dropdown, setDropdown] = useState(false)
  const [text, setText] = useState('All')

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
        {account &&
          <div
            style={text == 'XDC Community' ? { width: "260px", margin: '0px 0px 0px -10px' } : { width: "240px", margin: '0px 0px 0px -10px' }}
            onClick={() => {
              route.push("/editor");
            }}
          >
            <Button icon={newicon} text="New Proposal" />
          </div>
        }
        
        <div className={styles.dropdownContainer} onClick={() => setDropdown(!dropdown)}>
          <div className={styles.label}>
            <span>{text}</span>
          </div>

          <div className={styles.icon}>
            <Image src={dropdownsvg} alt='Drop' />
          </div>

          {dropdown &&
            <div className={styles.dropdown}>
              <div className={styles.optionsColumn}>
                <div className={styles.option} onClick={() => setText('All')}>
                  <span>All</span>
                </div>

                <div className={styles.option} onClick={() => setText('Active')}>
                  <span>Active</span>
                </div>

                <div className={styles.option} onClick={() => setText('Pending')}>
                  <span>Pending</span>
                </div>

                <div className={styles.option} onClick={() => setText('Closed')}>
                  <span>Closed</span>
                </div>

                <div className={styles.option} onClick={() => setText('Core')}>
                  <span>Core</span>
                </div>

                <div className={styles.option} onClick={() => setText('Treasury')}>
                  <span>Treasury</span>
                </div>

                <div className={styles.option} onClick={() => setText('XDC Community')}>
                  <span>XDC Community</span>
                </div>

                <div className={styles.option} onClick={() => setText('Urgent')}>
                  <span>Urgent</span>
                </div>
              </div>
            </div>
          }
        </div>

>>>>>>> main
      </div>
    </>
  );
};

export default Search;
