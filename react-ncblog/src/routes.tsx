import { createBrowserRouter } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import BooksPage from "./pages/BooksPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AdminLayout from "./pages/Layouts/AdminLayout";
import Layout from "./pages/Layouts/Layout";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import AdminErrorPage from "./pages/admin/AdminErrorPage";
import AdminPostPage from "./pages/admin/AdminPostPage";
import Dashboard from "./pages/admin/Dashboard";
import PostsPage from "./pages/admin/PostsPage";
import Profile from "./pages/admin/Profile";

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
        children: [
          { index: true, element: <BlogPage /> },
          { path: ":id", element: <PostPage /> },
        ],
      },
      { path: "login", element: <LoginPage /> },
      { path: "sign-up", element: <SignUpPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "books", element: <BooksPage /> },

      // ADMIN
      // {
      //   path: "/admin/",
      //   element: (
      //     <PrivateRoute>
      //       <AdminLayout />
      //     </PrivateRoute>
      //   ),
      //   errorElement: <AdminErrorPage />,
      //   children: [
      //     { index: true, element: <Dashboard /> },
      //     { path: "profile", element: <Profile /> },
      //     { path: "posts", element: <PostsPage /> },
      //     { path: "posts/:id", element: <AdminPostPage /> },
      //     // { path: "resources", element: <Profile/>},
      //   ],
      // },
    ],
  },

  {
    path: "admin/",
    element: (
      <AdminLayout />

      // <PrivateRoute>
      //   <AdminLayout />
      // </PrivateRoute>
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
