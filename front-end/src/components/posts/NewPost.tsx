import { Pathnames } from "@/utils/enums";
import PostForm from "./PostForm";
import { PostType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";

const NewPost = () => {
  const router = useRouter();

  const onSubmit = async (_newPost: PostType) => {
    const url = `http://localhost:8000/posts`;
    try {
      const _id = "p" + Math.random() * 10000;
      await axios.post(
        url,
        {
          key: _id,
          title: _newPost?.title,
          description: _newPost?.description,
          createdAt: new Date(),
          updatedAt: new Date(),
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
    router.push(Pathnames.home);
  };
  return <PostForm onSubmit={onSubmit} onClose={onClose} />;
};

export default NewPost;
