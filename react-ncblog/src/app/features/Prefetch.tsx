import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../store";
import { extendedPostsApiSlice } from "./posts/postsApiSlice";
// { children }: { children: ReactNode }

const Prefetch = () => {
  useEffect(() => {
    // console.log("subscribing");
    store.dispatch(
      extendedPostsApiSlice.util.prefetch("getPosts", "postsList", {
        force: true,
      })
      // const posts = store.dispatch(
      //   extendedPostsApiSlice.endpoints.getPosts.initiate({})
    );

    // return () => {
    //   console.log("unsubscribing");
    //   posts.unsubscribe();
    // };
  }, []);

  // return children;
  return <Outlet />;
};

export default Prefetch;
