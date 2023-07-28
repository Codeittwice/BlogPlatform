import { Priorities } from "@/utils/enums";
import { PostType } from "@/utils/types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import NewPost from "./NewPost";
import Post from "./Post";
import styles from "./PostsList.module.css";
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

  const deletePost = (index: number) => async (id: string) => {
    await fetch("127.0.0.1:27017" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const addTask = async (
    title: string,
    description: string,
    dueDate: string,
    priority: Priorities
  ) => {
    const id = "post" + Math.random() * 100; //(tasks.length + 1);
    const newTask = {
      id,
      title,
      description,
      dueDate,
      priority,
      completedStatus: false,
    };
    await fetch("localhost:27017", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  };

  const editPost = (index: number) => async (id: string) => {
    await fetch("127.0.0.1:27017" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const linkToPost = (index: number) => () => {
    if (posts) router.push(router.pathname + "/" + posts[index].id);
  };
  return (
    <>
      {posts &&
        posts.map((post: any, index: number) => {
          return (
            <Post
              key={post.id}
              postData={post}
              onDelete={deletePost(index)}
              onComplete={editPost(index)}
              onClick={linkToPost(index)}
            ></Post>
          );
        })}
    </>
  );
};

export default PostsList;
