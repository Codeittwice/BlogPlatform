import axios from "axios";
import { useEffect } from "react";

function useDeletePost(_id: string | string[] | undefined) {
  useEffect(() => {
    const url = `http://localhost:8000/posts/${_id}`;
    async function fetchData() {
      try {
        await axios.delete(url, {
          responseType: "json",
        });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [_id]);
}

export default useDeletePost;
