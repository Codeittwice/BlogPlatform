import { useRouter } from "next/router";
import axios from "axios";
import styles from "./DeletePost.module.css";
import PostDetails from "./PostDetails";
import { PathNames } from "@/utils/enums";

const DeletePost = () => {
  const router = useRouter();
  const _id = router.query._id;

  const onConfirm = async () => {
    try {
      ///Id validity
      const res = await axios.delete(`http://localhost:8000/posts/${_id}`, {
        responseType: "json",
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    router.push(PathNames.Home);
  };

  const onClose = () => router.push(PathNames.Home + _id);

  return (
    <>
      <div className={styles.new}>
        <h1>Delete this post?</h1>
        <PostDetails _id={_id} isInDelete={true} />
        <button onClick={onConfirm} className={styles.delete}>
          Confirm Delete
        </button>
        <button className={styles.abort} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export default DeletePost;
