import React from "react";
import styles from "./styles.module.scss";

export enum StatusType {
  ACTIVE,
  FAILED,
  PASSED,
  INACTIVE,
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
      case StatusType.INACTIVE:
        bg = "rgb(100 100 100)";
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
      {props.status === StatusType.INACTIVE && <span>Inactive</span>}
    </div>
  );
};

export default Status;
