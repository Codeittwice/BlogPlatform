import { PostType } from "@/utils/types";
import axios from "axios";
import { useState, useEffect } from "react";

function useReadPostSingle(_id: string | string[] | undefined) {
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    const url = `http://localhost:8000/posts/${_id}`;
    async function fetchData() {
      try {
        const res = await axios.get(url, {
          responseType: "json",
        });
        const postData = res.data;
        const postsArr: PostType = {
          _id: postData._id,
          key: postData._id,
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

  return post;
}

export default useReadPostSingle;
