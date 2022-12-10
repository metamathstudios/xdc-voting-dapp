import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";

interface Button {
  text: string;
  icon: any;
}

const Button: React.FC<Button> = (props: Button) => {
  return (
    <div className={styles.container}>
      <Image src={props.icon} alt="Search" width={20} height={20} />
      <span>{props.text}</span>
    </div>
  );
};

export default Button;
