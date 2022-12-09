import Image from "next/image";
import React from "react";
import download from "../../../public/assets/svgicons/download.svg";
import styles from "./styles.module.scss";

interface File {
  name: string;
}

const File: React.FC<File> = (props: File) => {
  return (
    <div className={styles.container}>
      <span>{props.name}</span>
      <Image src={download} alt="Download" width={20} height={20} />
    </div>
  );
};

export default File;
