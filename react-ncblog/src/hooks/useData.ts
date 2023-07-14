import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

// export interface Post {
//   _id: number;
//   title: string;
//   body: string;
//   createdAt: Date;
// }

export interface Locals {
  title: string;
  description: string
}

// export interface PostResults {
//   locals: Local;
//   posts: Post[]
// }

// If fetching different data in the response
interface FetchResponse<T> {
  locals: Locals;
  count: number;
  current: number;
  prev: number;
  next: number;
  posts: T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  // use generic type parameter <T>
  const [ data, setData ] = useState<T[]>([]);
  const [error, setError ] = useState("");
  const [ isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    apiClient
      // .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
      .get<FetchResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then(res => {
        // setData(res.data.data);
        setData(res.data.posts);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
 }, deps ? [...deps] : []);

 return { data, error, isLoading };
}

export default useData;
