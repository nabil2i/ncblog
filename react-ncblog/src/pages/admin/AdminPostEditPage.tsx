import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PostForm from "../../components/admin/posts/PostForm";
import usePost from "../../hooks/usePost";

const AdminPostEditPage = () => {
  const { id: postId } = useParams();
  // console.log("post id on edit page: ", postId)
  const { data: payload, error } = usePost(postId as string);
  const post = payload?.data;

  if (error || !post) {
    return (
      <Text py={8} textAlign={"center"}>
        {" "}
        We encountered a problem. Please retry later.
      </Text>
    );
  }

  return (
    <>
      <PostForm post={post} />
    </>
  );
};

export default AdminPostEditPage;
