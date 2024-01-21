import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PostForm from "../../components/admin/posts/PostForm";
import usePost from "../../hooks/usePost";

const AdminAddPostEditPage = () => {
  return (
    <>
      <PostForm />
    </>
  );
};

export default AdminAddPostEditPage;
