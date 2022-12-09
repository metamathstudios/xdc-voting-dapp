import React from "react";
import styles from "./styles.module.scss";

export enum StatusType {
  ACTIVE,
}

interface Status {
  status: StatusType;
}

const Status: React.FC<Status> = (props: Status) => {
  const getStatusBackground = (status: StatusType) => {
    var bg = "";

    switch (status) {
      case StatusType.ACTIVE:
        bg = "#2049b9";
        break;
    }

    return bg;
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: getStatusBackground(props.status) }}
    >
      {props.status === StatusType.ACTIVE && <span>Active</span>}
    </div>
  );
};

export default Status;
