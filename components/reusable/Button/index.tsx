import Image from "next/image";
import React, { useContext } from "react";
import { Theme, ThemeContext } from "../../../contexts/ThemeContext";
import styles from "./styles.module.scss";

interface Button {
  text: string;
  icon: any;
}

const Button: React.FC<Button> = (props: Button) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme == Theme.DARK ? styles.dark : styles.light}>
      <div className={styles.container}>
        <Image
          src={props.icon}
          alt="Search"
          width={20}
          height={20}
          className={styles.image}
        />
        <span>{props.text}</span>
      </div>
    </div>
  );
};

export default Button;
