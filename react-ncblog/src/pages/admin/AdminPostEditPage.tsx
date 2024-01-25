import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPostById } from "../../app/features/posts/postsApiSlice";
import { RootState } from "../../app/store";
import PostForm from "../../components/admin/posts/PostForm";

const AdminPostEditPage = () => {
  const { id } = useParams();
  const postId = id?.toString() as string;
  const post = useSelector((state: RootState) => selectPostById(state, postId));

  // console.log("post id on edit page: ", postId)
  // const { data: payload, error } = usePost(postId as string);
  // const post = payload?.data;

  const content = post ? (
    <PostForm post={post} />
  ) : (
    <Text py={8} textAlign={"center"}>
      {" "}
      Loading...
    </Text>
  );

  return content;
  // if (post) {
  //   return (
  //     <>
  //       <PostForm post={post} />
  //     </>
  //   );
  //   } else {
  //     return (
  //       <Text py={8} textAlign={"center"}>
  //         {" "}
  //         We encountered a problem. Please retry later.
  //       </Text>
  //     );
  //   }
};

export default AdminPostEditPage;
