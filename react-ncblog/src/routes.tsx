import { createBrowserRouter } from "react-router-dom";
import Prefetch from "./app/features/Prefetch";
import SignUpPage from "./pages/SignUpPage";
import PersistLogin from "./components/auth/PersistLogin";
import RequireAuth from "./components/common/RequireAuth";
import AccountPage from "./pages/AccountPage";
import AddPostPage from "./pages/AddPostPage";
import BlogPage from "./pages/BlogPage";
import BookPage from "./pages/BookPage";
import BooksPage from "./pages/BooksPage";
import EditPostPage from "./pages/EditPostPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AdminLayout from "./pages/Layouts/AdminLayout";
import Layout from "./pages/Layouts/Layout";
import LoginPage from "./pages/LoginPage";
import MyPostsPage from "./pages/MyPostsPage";
import PostPage from "./pages/PostPage";
import SearchPage from "./pages/SearchPage";
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
      { path: "login", element: <LoginPage /> },
      { path: "sign-up", element: <SignUpPage /> },

      {
        path: "",
        element: <PersistLogin />,
        children: [
          {
            path: "",
            element: <Prefetch />,
            children: [
              { index: true, element: <HomePage /> },
              {
                path: "blog",
                children: [
                  { index: true, element: <BlogPage /> },
                  { path: ":id", element: <PostPage /> },
                  {
                    path: "write",
                    element: <RequireAuth allowedRoles={["Editor"]} />,
                    children:[
                      { index: true, element: <AddPostPage />}
                    ]
                  },
                ],
              },
              {
                path: "/myposts",
                element: <RequireAuth allowedRoles={["Editor", "Admin"]} />,
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
              //end
            ],
          },
        ],
      },
    ],
  },

  {
    path: "admin/",
    element: <AdminLayout></AdminLayout>,
    errorElement: <AdminErrorPage />,
    children: [
      {
        path: "",
        element: <PersistLogin />,
        children: [
          {
            path: "",
            element: <RequireAuth allowedRoles={["Admin"]} />,
            children: [
              {
                path: "",
                element: <Prefetch />,
                children: [
                  { index: true, element: <Dashboard /> },
                  { path: "dashboard", element: <Dashboard /> },
                  { path: "profile", element: <Profile /> },
                  {
                    path: "posts",
                    children: [
                      { index: true, element: <PostsPage /> },
                      { path: ":id", element: <AdminPostPage /> },
                      { path: "edit/:id", element: <AdminPostEditPage /> },
                      { path: "new", element: <AdminAddPostPage /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
