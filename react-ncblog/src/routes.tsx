import { createBrowserRouter } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layouts/Layout";
import PostPage from "./pages/PostPage";
import AdminLayout from "./pages/Layouts/AdminLayout";

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
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <HomePage/>},
    ],
  }
]);

export default router;
