import Card from "../Card";
import styles from "./Post.module.css";

const Post = (props: any) => {
  return (
    <Card>
      <div className={styles.details}>
        <h1>{props.title}</h1>
      </div>
      <div className={styles.buttons}>
        <button onClick={props.onClick} className={styles["details-button"]}>
          Details
        </button>
      </div>
    </Card>
  );
};

export default Post;
