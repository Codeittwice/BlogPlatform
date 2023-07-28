import Card from "../Card";
import styles from "./Post.module.css";
import { Priorities } from "@/utils/enums";

const Post = (props: any) => {
  const { id, title } = props.postData;

  const taskCompleteHandler = (event: any) => {
    event.preventDefault();
    props.onComplete(id);
  };

  const taskDeleteHandler = (event: any) => {
    event.preventDefault();
    props.onDelete(id);
  };

  return (
    <Card>
      <div className={styles.details}>
        <h1>{title}</h1>
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
