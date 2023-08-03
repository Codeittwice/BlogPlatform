import Card from "../Card";
import styles from "./PostDetails.module.css";
import { useRouter } from "next/router";
import { Pathnames } from "@/utils/enums";
import { PostType, PostTypeWithTimestamps } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const PostDetails = (props: any) => {
  const router = useRouter();
  const [post, setPost] = useState<PostTypeWithTimestamps>();
  const _id = props._id;
  const url = `http://localhost:8000/posts/${_id}`;

  useEffect(() => {
    async function fetchData() {
      console.log(_id);
      try {
        console.log(url);
        const res = await axios.get(url, {
          responseType: "json",
        });
        const postData = res.data;
        const postsArr: PostTypeWithTimestamps = {
          _id: postData._id,
          key: postData._id.toString(),
          title: postData.title,
          description: postData.description,
          createdAt: postData.createdAt,
          updatedAt: postData.updatedAt,
        };

        setPost(postsArr);
        console.log(postsArr);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [_id]);

  if (!post) return;
  const { title, description } = post;
  const createdAt = new Date(post.createdAt).toUTCString();
  const updatedAt = new Date(post.updatedAt).toUTCString();
  const backButtonHandler = () => {
    router.push(Pathnames.home);
  };
  return (
    <>
      <Card>
        <div className={styles.details}>
          <h1>{title}</h1>
          <h4>{description}</h4>
          <div className={styles.timestamps}>
            <p>Created at: {createdAt}</p>
            <p>Updated at: {updatedAt}</p>
          </div>
        </div>
      </Card>
      {!props.isInDelete && (
        <button className={styles.back} onClick={backButtonHandler}>
          {"<"}
        </button>
      )}
    </>
  );
};

export default PostDetails;
