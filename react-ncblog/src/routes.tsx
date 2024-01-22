import { createBrowserRouter } from "react-router-dom";
import AccountPage from "./pages/AccountPage";
import AddPostPage from "./pages/AddPostPage";
import BlogPage from "./pages/BlogPage";
import BookPage from "./pages/BookPage";
import BooksPage from "./pages/BooksPage";
import EditPostPage from "./pages/EditPostPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layouts/Layout";
import LoginPage from "./pages/LoginPage";
import MyPostsPage from "./pages/MyPostsPage";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./assets/SignUpPage";
import AdminLayout from "./pages/Layouts/AdminLayout";
import AdminAddPostPage from "./pages/admin/AdminAddPostPage";
import Dashboard from "./pages/admin/AdminDashboard";
import AdminErrorPage from "./pages/admin/AdminErrorPage";
import AdminPostEditPage from "./pages/admin/AdminPostEditPage";
import AdminPostPage from "./pages/admin/AdminPostPage";
import PostsPage from "./pages/admin/AdminPostsPage";
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
          { path: "write", element: <AddPostPage /> },
        ],
      },
      {
        path: "/myposts",
        element: <MyPostsPage />,
        children: [
          { index: true, element: <MyPostsPage /> },
          { path: ":id", element: <PostPage /> },
          { path: "edit/:id", element: <EditPostPage /> },
          { path: "write", element: <AddPostPage /> },
        ],
      },
      { path: "search", element: <SearchPage /> },
      {
        path: "books",
        children: [
          { index: true, element: <BooksPage /> },
          { path: ":id", element: <BookPage /> },
        ],
      },
      { path: "account", element: <AccountPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "sign-up", element: <SignUpPage /> },
    ],
  },

  {
    path: "admin/",
    element: (
      <AdminLayout />

      // <AdminPrivateRoute>
      //   <AdminLayout />
      // </AdminPrivateRoute>
    ),
    errorElement: <AdminErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard/>},
      { path: "profile", element: <Profile /> },
      { path: "posts",
        children: [
          { index: true, element: <PostsPage /> },
          { path: ":id", element: <AdminPostPage /> },
          { path: "edit/:id", element: <AdminPostEditPage /> },
          { path: "new", element: <AdminAddPostPage /> },
        ]
      },
    ],
  },
]);

export default router;
