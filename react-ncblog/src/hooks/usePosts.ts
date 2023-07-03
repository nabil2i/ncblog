import { PostQuery } from './../App';
import useData from "./useData";

export interface Post {
  _id: number;
  title: string;
  body: string;
  createdAt: Date;
}

const usePosts = (postQuery: PostQuery) => useData<Post>(
  '/posts',
  {
    params: {
      search: postQuery.searchText
    },
  },
  [ postQuery ]
);

export default usePosts;
