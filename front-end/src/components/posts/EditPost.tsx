import { useRouter } from "next/router";
import PostForm from "./PostForm";
import { PostType, PostUpdate } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { PathNames } from "@/utils/enums";
import Spinner from "../Spinner";

const EditPost = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostType>();
  const _id = router.query._id;
  const url = `http://localhost:8000/posts/${_id}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get<PostType>(url, {
          responseType: "json",
        });

        setPost(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [_id]);

  const onSubmit = async (updates: any) => {
    try {
      const body: PostUpdate = {
        title: updates.title,
        description: updates.description,
      };
      await axios.patch(url, body, {
        responseType: "json",
      });
    } catch (e) {
      console.log(e);
    }
    router.push(PathNames.Home);
  };

  const onClose = () => router.push(PathNames.Home + _id);

  if (!post)
    return (
      <div>
        <h2>Couldn't find post!</h2>
        <p>Please, try again later or with a different address.</p>
        <Spinner />
      </div>
    );

  return (
    <>
      <h1>Edit Post</h1>
      <PostForm
        title={post?.title}
        description={post?.description}
        buttonType={"edit"}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </>
  );
};

export default EditPost;
