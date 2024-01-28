import { Box } from "@chakra-ui/react";
import PostForm from "../../components/admin/posts/PostForm";
import useTitle from "../../hooks/useTitle";

const AdminAddPostEditPage = () => {
  useTitle("Add Post");

  return (
    <>
      <Box>
        <PostForm />
      </Box>
    </>
  );
};

export default AdminAddPostEditPage;
