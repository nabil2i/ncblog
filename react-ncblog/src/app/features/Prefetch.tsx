import { ReactNode, useEffect } from "react";
import { store } from "../store";
import { extendedPostsApiSlice } from "./posts/postsApiSlice";
import { Outlet } from "react-router-dom";
// import { Outlet } from 'react-router-dom';
// { children }: { children: ReactNode }

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const posts = store.dispatch(
      extendedPostsApiSlice.endpoints.getPosts.initiate({})
    );

    return () => {
      console.log("unsubscribing");
      posts.unsubscribe();
    };
  }, []);

  // return children;
  return (<Outlet />)
};

export default Prefetch;
