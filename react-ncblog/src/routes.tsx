import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { index: true, element: <HomePage/>},
      { path: 'blog', element: <BlogPage/>},
      { path: 'blog/:id', element: <PostPage/>},
    ]
  }
]);

export default router;
