import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "./components/common/RequireAuth";
import Layout from "./pages/_layouts/Layout";
import AdminAddPostPage from "./pages/admin/AdminAddPostPage";
import AdminPostEditPage from "./pages/admin/AdminPostEditPage";
import AdminPostPage from "./pages/admin/AdminPostPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AccountPage from "./pages/common/AccountPage";
import AddPostPage from "./pages/common/AddPostPage";
import BlogPage from "./pages/common/BlogPage";
import BookPage from "./pages/common/BookPage";
import BooksPage from "./pages/common/BooksPage";
import EditPostPage from "./pages/common/EditPostPage";
import ErrorPage from "./pages/common/ErrorPage";
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/common/LoginPage";
import MyPostsPage from "./pages/common/MyPostsPage";
import PostPage from "./pages/common/PostPage";
import SearchPage from "./pages/common/SearchPage";
import SignUpPage from "./pages/common/SignUpPage";
import AboutPage from "./pages/common/AboutPage";
// import AboutPage from "./pages/common/AboutPage";

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
        // element: <PersistLogin />,
        children: [
          {
            path: "",
            // element: <Prefetch />,
            children: [
              { index: true, element: <HomePage /> },
              {
                path: "blog",
                children: [
                  { index: true, element: <BlogPage /> },
                  { path: ":slug", element: <PostPage /> },
                  // { path: ":slug", element: <PostPage /> },
                  {
                    path: "write",
                    element: <RequireAuth allowedRoles={['blogauthor', 'admin', 'superadmin']} />,
                    children: [{ index: true, element: <AddPostPage /> }],
                  },
                ],
              },
              {
                path: "/myposts",
                element: <RequireAuth allowedRoles={['blogauthor', 'admin', 'superadmin']} />,
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
              {
                path: "about",
                element: <AboutPage />,
              },
              // {
              //   path: "account",
              //   element: <RequireAuth />,
              //   children: [
              //     { path: "", element: <BookPage /> }
              //   ],
              // },
              {
                path: "account",
                // element: <AccountPage />
                element: <RequireAuth />,
                children: [
                  {
                    index: true,
                    element: <AccountPage />,
                  },
                ],
              },
              {
                path: "dashboard",
                element: <RequireAuth allowedRoles={['admin', 'superadmin']} />,
                children: [
                  { index: true, element: <DashboardPage /> },
                  {
                    path: "posts",
                    children: [
                      // { index: true, element: <PostsPage /> },
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

  // {
  //   path: "admin/",
  //   element: <AdminLayout></AdminLayout>,
  //   errorElement: <AdminErrorPage />,
  //   children: [
  //     {
  //       path: "",
  //       // element: <PersistLogin />,
  //       children: [
  //         {
  //           path: "",
  //           element: <RequireAuth allowedRoles={["Admin"]} />,
  //           children: [
  //             {
  //               path: "",
  //               element: <Prefetch />,
  //               children: [
  //                 { index: true, element: <Dashboard /> },
  //                 { path: "", element: <Dashboard /> },
  //                 {
  //                   path: "posts",
  //                   children: [
  //                     { index: true, element: <PostsPage /> },
  //                     { path: ":id", element: <AdminPostPage /> },
  //                     { path: "edit/:id", element: <AdminPostEditPage /> },
  //                     { path: "new", element: <AdminAddPostPage /> },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
]);

export default router;
