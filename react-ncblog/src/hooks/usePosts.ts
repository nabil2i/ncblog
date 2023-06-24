import useData from "./useData";

export interface Post {
  _id: number;
  title: string;
  body: string;
  createdAt: Date;
}

const usePosts = () => useData<Post>('/posts');

export default usePosts;
