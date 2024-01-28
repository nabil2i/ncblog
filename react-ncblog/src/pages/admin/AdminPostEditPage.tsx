import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../app/features/posts/postsApiSlice";
import PostForm from "../../components/admin/posts/PostForm";
import useTitle from "../../hooks/useTitle";

const AdminPostEditPage = () => {
  useTitle("Edit Post");
  const { id } = useParams();
  const postId = id?.toString() as string;
  // const post = useAppSelector((state: RootState) => selectPostById(state, postId));

  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.posts.entities[postId],
    }),
  });

  // console.log("post id on edit page: ", postId)
  // const { data: payload, error } = usePost(postId as string);
  // const post = payload?.data;

  const content = post ? (
    <Box>
      <Flex direction="column">
        <Flex justify="space-between" align="center"></Flex>
        <Box>
          <PostForm post={post} />
        </Box>
      </Flex>
    </Box>
  ) : (
    <Box py={8}>
      {" "}
      <Spinner />
    </Box>
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
