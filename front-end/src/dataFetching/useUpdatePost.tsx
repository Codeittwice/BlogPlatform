import { PostType } from "@/utils/types";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useUpdatePost(
  _id: string | string[] | undefined,
  updates: any
) {
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const url = `http://localhost:8000/posts/${_id}`;
    async function fetchData() {
      try {
        const res = await axios.put(url, {
          responseType: "json",
          title: updates.title,
          description: updates.title,
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
  }, [_id, updates]);

  return post;
}
