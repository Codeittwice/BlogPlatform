import { PostType } from "@/utils/types";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useCreatePost(
  shouldExec: boolean,
  newPost: PostType | undefined
) {
  const [post, setPost] = useState<PostType | undefined>();
  useEffect(() => {
    if (!shouldExec) return;
    const url = `http://localhost:8000/posts`;
    async function fetchData() {
      try {
        const res = await axios.post(url, {
          responseType: "json",
          key: newPost?.id,
          id: newPost?.id,
          title: newPost?.title,
          description: newPost?.description,
          createdAt: newPost?.createdAt,
          updatedAt: newPost?.updatedAt,
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

        setPost(postsArr);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  console.log(post);

  return post;
}
