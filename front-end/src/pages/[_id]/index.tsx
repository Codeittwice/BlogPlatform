import { useRouter } from "next/router";
import PostDetails from "../../components/posts/PostDetails";
import { useEffect, useState } from "react";
import { UsageState } from "webpack";

export default function PostDetailsPage() {
  const router = useRouter();
  const [id, setId] = useState<string | string[]>();
  const [initial, setInitial] = useState<boolean>(false);
  useEffect(() => {
    setId(router.query._id);
    setInitial(true);
  }, [router.query._id, initial]);
  console.log(router.query._id);
  return <PostDetails id={id} />;
}
