import { useRouter } from "next/router";
import PostForm from "./PostForm";
import useReadPostSingle from "@/dataFetching/useReadPostSingle";
import useUpdatePost from "@/dataFetching/useUpdatePost";
import { PostType } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pathnames } from "@/utils/enums";

const EditPost = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostType>();
  const _id = router.query._id;
  const url = `http://localhost:8000/posts/${_id}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url, {
          responseType: "json",
        });
        const postData = res.data;
        const postsArr: PostType = {
          _id: postData._id,
          key: postData._id.toString(),
          title: postData.title,
          description: postData.description,
        };

        setPost(postsArr);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [_id]);

  const onSubmit = async (updates: any) => {
    try {
      await axios.patch(
        url,
        {
          title: updates.title,
          description: updates.description,
        },
        {
          responseType: "json",
        }
      );
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
