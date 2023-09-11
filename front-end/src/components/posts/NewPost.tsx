import { PathNames } from "@/utils/enums";
import PostForm from "./PostForm";
import { PostCreate, PostType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";

const NewPost = () => {
  const router = useRouter();

  const onSubmit = async (_newPost: PostType) => {
    const body: PostCreate = {
      title: _newPost?.title,
      description: _newPost?.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await axios.post(`http://localhost:8000/posts`, body, {
        responseType: "json",
      });
    } catch (e) {
      console.log(e);
    }
    router.push(PathNames.Home);
  };
  const onClose = () => {
    router.push(PathNames.Home);
  };
  return <PostForm onSubmit={onSubmit} onClose={onClose} />;
};

export default NewPost;
