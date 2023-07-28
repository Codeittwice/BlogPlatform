import Card from "../Card";
import styles from "./PostDetails.module.css";
import { useRouter } from "next/router";
import { Pathnames, Priorities } from "@/utils/enums";
import { PostType } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";

const PostDetails = (props: any) => {
  const router = useRouter();
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const url = `http://localhost:8000/posts/${props.id}`;
    console.log(props.id);
    console.log(url);
    async function fetchData() {
      try {
        const res = await axios.get(url, {
          responseType: "json",
        });
        const postData = res.data;
        const postsArr: PostType = {
          key: postData.id,
          id: postData.id,
          title: postData.title,
          description: postData.description,
          createdAt: postData.createdAt,
          updatedAt: postData.updatedAt,
        };

        console.log(postData.createdAt);

        setPost(postsArr);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [props.id]);

  if (!post) return;
  const { id, title, description } = post;
  const createdAt = new Date(post.createdAt);
  const updatedAt = new Date(post.updatedAt);

  const backButtonHandler = () => {
    router.push(Pathnames.home);
  };
  return (
    <>
      <Card>
        <div className={styles.details}>
          <h1>{title}</h1>
          <h4>{description}</h4>
          <p>
            <i>Created at: {createdAt.toString()}</i>
          </p>
          <p>
            <i>Updated at: {updatedAt.toString()}</i>
          </p>
        </div>
      </Card>
      <button className={styles.back} onClick={backButtonHandler}>
        {"<"}
      </button>
    </>
  );
};

export default PostDetails;
