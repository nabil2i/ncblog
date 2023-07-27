import { createBrowserRouter } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layouts/Layout";
import PostPage from "./pages/PostPage";
import AdminLayout from "./pages/Layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/admin/Profile";
import AdminErrorPage from "./pages/admin/AdminErrorPage";
import PostsPage from "./pages/admin/PostsPage";
import AdminPostPage from "./pages/admin/AdminPostPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:id", element: <PostPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      // { path: 'search/:query', element: <SearchPage/>},
    ],
  },
  {
    path: "/admin/",
    element: <AdminLayout />,
    errorElement: <AdminErrorPage/>,
    children: [
      { index: true, element: <Dashboard/>},
      { path: "profile", element: <Profile/>},
      { path: "posts", element: <PostsPage/>},
      { path: "posts/:id", element: <AdminPostPage/>},
      // { path: "resources", element: <Profile/>},
    ],
  }
]);

export default router;
