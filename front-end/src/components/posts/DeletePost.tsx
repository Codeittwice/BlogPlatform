import { useRouter } from "next/router";
import Card from "../Card";
import axios from "axios";
import styles from "./DeletePost.module.css";
import PostDetails from "./PostDetails";
import { Pathnames } from "@/utils/enums";

const DeletePost = () => {
  const router = useRouter();
  const _id = router.query._id;

  const onConfirm = async () => {
    const url = `http://localhost:8000/posts/${_id}`;
    try {
      const res = await axios.delete(url, {
        responseType: "json",
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    router.push(Pathnames.home);
  };
  const onClose = () => {
    router.push(Pathnames.home + _id);
  };
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

//<input type="text" placeholder="Priority" ref={priority} />
