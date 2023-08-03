import { useRouter } from "next/router";
import PostDetails from "../../components/posts/PostDetails";

export default function PostDetailsPage() {
  const router = useRouter();
  const id = router.query._id;
  console.log(id);
  return <PostDetails _id={router.query?._id} />;
}
