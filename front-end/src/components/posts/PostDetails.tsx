import Card from "../Card";
import styles from "./PostDetails.module.css";
import { useRouter } from "next/router";
import { PathNames } from "@/utils/enums";
import { PostTypeWithTimestamps } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { getPrettyDate } from "@/utils/dateFormating";

const PostDetails = (props: any) => {
  const router = useRouter();
  const [post, setPost] = useState<PostTypeWithTimestamps>();
  const [errorMsg, setErrorMsg] = useState("");
  const _id = props._id;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get<PostTypeWithTimestamps>(
          `http://localhost:8000/posts/${_id}`,
          {
            responseType: "json",
          }
        );
        setPost(res.data);
        console.log(res.status);
        setErrorMsg(res.status + " " + res.statusText);
        throw res.status + " " + res.statusText;
      } catch (e) {
        if (e instanceof Error) {
          // e is narrowed to Error!
          console.log(errorMsg);
          setErrorMsg(e.message);
          //console.log(e);
        }
      }
    }
    fetchData();
  }, [_id]);

  if (!post)
    return (
      <div>
        <h1>{errorMsg}</h1>
        <h2>Couldn't find post!</h2>
        <p>Please, try again later or with a different address.</p>
        <Spinner />
      </div>
    );
  const { title, description } = post;
  const createdAt = getPrettyDate(new Date(post.createdAt));
  const updatedAt = getPrettyDate(new Date(post.updatedAt));
  const backButtonHandler = () => {
    router.push(PathNames.Home);
  };
  return (
    <>
      <Card>
        <div className={styles.details}>
          <h1>{title}</h1>
          <h4>{description}</h4>
          <div className={styles.timestamps}>
            <p>Created at {createdAt}.</p>
            <p>Updated at {updatedAt}.</p>
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
