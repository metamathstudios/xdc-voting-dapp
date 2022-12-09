import Card from "../Card";
import styles from "./styles.module.scss";

const List = () => {
  return (
    <div className={styles.container}>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default List;
