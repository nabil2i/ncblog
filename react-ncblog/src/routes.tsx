import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import BlogPage from "./pages/BlogPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      { index: true, element: <HomePage/>},
      { path: 'blog', element: <BlogPage/>},
    ]
  }
]);

export default router;
