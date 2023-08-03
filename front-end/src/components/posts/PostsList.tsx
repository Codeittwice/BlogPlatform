import { PostType } from "@/utils/types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Post from "./Post";
import axios from "axios";

const PostsList = () => {
  const router = useRouter();
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
            _id: postData._id,
            key: postData._id,
            title: postData.title,
            description: postData.description,
          };
        });
        setPosts(postsArr);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const linkToPost = (index: number) => () => {
    if (posts)
      router.push(router.pathname + "/" + posts[index]._id?.toString());
  };
  return (
    <>
      {posts &&
        posts.map((post: PostType, index: number) => {
          return (
            <Post
              key={post._id?.toString()}
              title={post.title}
              onClick={linkToPost(index)}
            ></Post>
          );
        })}
    </>
  );
};

export default PostsList;
