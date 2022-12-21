import { useEffect, useState, useContext } from "react";
import Card from "../Card";
import styles from "./styles.module.scss";
import { ProposalsContext } from "../../../../contexts/ProposalsContext";

const List = () => {
  const [data, setData] = useState<any>([]);
  const { proposals, all, byId } = useContext(ProposalsContext);

  useEffect(() => {
    if(proposals && proposals.length === 0) {
      const getData = async () => {
        await all();
      };
      getData();
    }
    
    setData(proposals);
    
    if(proposals?.length > 0) {
      byId(proposals.length);
    }
  }, [proposals]);

  return (
    <div className={styles.listContainer}>
      {data?.map((value, index) => {
        return <Card key={index} data={data[index]} />;
      })}
    </div>
  );
};

export default List;
