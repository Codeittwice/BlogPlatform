import { PostType } from "@/utils/types";
import axios from "axios";
import { useState, useEffect } from "react";

function useReadPosts() {
  const [posts, setPosts] = useState<PostType[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:8000/posts", {
          responseType: "json",
        });
        const postsA = Object.values(res.data);
        const postsArr: PostType[] = postsA.map((postData: any) => {
          return {
            key: postData.id,
            id: postData.id,
            title: postData.title,
            description: postData.description,
            createdAt: postData.createdAt,
            updatedAt: postData.updatedAt,
          };
        });
        setPosts(postsArr);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  console.log(posts);
  return posts;
}

export default useReadPosts;
