import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BlogPage from "./pages/BlogPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AdminLayout from "./pages/Layouts/AdminLayout";
import Layout from "./pages/Layouts/Layout";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import SignUpPage from "./pages/SignUpPage";
import AdminErrorPage from "./pages/admin/AdminErrorPage";
import AdminPostPage from "./pages/admin/AdminPostPage";
import Dashboard from "./pages/admin/Dashboard";
import PostsPage from "./pages/admin/PostsPage";
import Profile from "./pages/admin/Profile";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
            <HomePage />
          // <PrivateRoute>
          //   <HomePage />
          // </PrivateRoute>
        ),
      },
      {
        path: "blog",
        element: (
            <BlogPage />
          // <PrivateRoute>
          //   <BlogPage />
          // </PrivateRoute>
        ),
      },
      { path: "blog/:id", element: <PostPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: 'search/:query', element: <SearchPage/>},
    ],
  },
  {
    path: "/admin/",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    errorElement: <AdminErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "posts", element: <PostsPage /> },
      { path: "posts/:id", element: <AdminPostPage /> },
      // { path: "resources", element: <Profile/>},
    ],
  },
]);

export default router;
