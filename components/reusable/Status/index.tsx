import React from "react";
import styles from "./styles.module.scss";

export enum StatusType {
  ACTIVE,
  FAILED,
  PASSED,
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
      case StatusType.FAILED:
        bg = "#FF6969";
        break;
      case StatusType.PASSED:
        bg = "#78D681";
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
      {props.status === StatusType.FAILED && <span>Failed</span>}
      {props.status === StatusType.PASSED && <span>Passed</span>}
    </div>
  );
};

export default Status;
