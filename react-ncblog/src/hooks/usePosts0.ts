import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Post {
  _id: number;
  title: string;
  body: string;
  createdAt: Date;
}

// export interface Local {
//   title: string;
//   description: string
// }

// export interface PostResults {
//   locals: Local;
//   posts: Post[]
// }

const usePosts = () => {
  const [ posts, setPosts ] = useState<Post[]>([]);
  const [error, setError ] = useState('');
  const [ isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    apiClient
      .get('/posts', { signal: controller.signal })
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
 }, []);

 return { posts, error, isLoading };
}

export default usePosts;