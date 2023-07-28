import styles from "./Info.module.css";
import logo from "../../img/logo.jpg";
import Card from "../Card";

const Info = () => {
  return (
    <div className={styles.info}>
      <Card>
        <div>
          <h1>Welcome to the</h1>
        </div>

        <div>
          <img src={logo.src}></img>
        </div>

        <div>
          <h1>Task App</h1>
        </div>
      </Card>
    </div>
  );
};
export default Info;
