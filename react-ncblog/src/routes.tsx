import { createBrowserRouter } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import PostPage from "./pages/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:id", element: <PostPage /> },
      // { path: 'search/:query', element: <SearchPage/>},
    ],
  },
]);

export default router;
