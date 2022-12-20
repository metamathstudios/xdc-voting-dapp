import { useEffect, useState } from "react";
import Card from "../Card";
import styles from "./styles.module.scss";

const List = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        title: "The title of the page",
        tags: ["Core", "Treasury", "Urgent", "XDC Community"],
        description:
          "The description of the page \n\n This is a new line \n\n This is another new line",
        contract: "0x514910771af9ca656af840dff83e8264ecf986ca",
        id: 1,
        creator: "0x514910771af9ca656af840dff83e8264ecf986ca",
        created: 1670888393,
        opens: 1670888393,
        closes: 1670889353,
        toll: 10,
        urls: ["www.link.com", "www.link.com", "www.link.com"],
        files: ["www.link.com", "www.link.com", "www.link.com"],
        options: ["Yes", "No", "Abstain"],
      },
    ]);
  }, []);

  return (
    <div className={styles.listContainer}>
      {data.map((value, index) => {
        if (index !== 0) {
          return (
            <>
              <div style={{ marginTop: "2px", width: "100%" }}>
                <Card key={index} data={data[index]} />
              </div>
            </>
          );
        } else {
          return (
            <>
              <div style={{ marginTop: "2px", width: "100%" }}>
                <Card key={index} data={data[index]} />
              </div>
            </>
          );
        }
      })}
    </div>
  );
};

export default List;
