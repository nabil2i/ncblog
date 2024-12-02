import { Box, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../app/features/posts/postsApiSlice";
import BlogDetailsActions from "../../components/admin/posts/BlogDetailsActions";
import BlogPostDetails from "../../components/posts/BlogPostDetails";
import Post from "../../entities/Post";
import useTitle from "../../hooks/useTitle";

const AdminPostPage = () => {
  useTitle("Nabil Conveys - Post");

  const { id } = useParams();
  const postId = id?.toString() as string;
  // const post = useAppSelector((state: RootState) => selectPostById(state, postId));

  const { post } = useGetPostsQuery("postsList", {
    selectFromResult: ({ data }) => ({
      post: data?.posts.entities[postId],
    }),
  });

  // // console.log(id)
  // const { data: payload, isLoading, error } = usePost(id as string);
  // const post = payload?.data;
  // // console.log(post);

  // if (isLoading)
  //   return (
  //     <Box p={10}>
  //       <VStack marginTop={2}>
  //         <Spinner />
  //       </VStack>
  //     </Box>
  //   );

  // if (error || !post) throw error;

  const content = post ? (
    // <Flex direction="column">
    //   <Flex justify="space-between" align="center"></Flex>
    //   <Box>
    //     <PostForm post={post} />
    //   </Box>
    // </Flex>
    <Box>
      <BlogDetailsActions post={post} />
      <Box w="full" mx="auto" maxW="800px" px={4} pt="100px">
        <BlogPostDetails post={post as Post} />
      </Box>
    </Box>
  ) : (
    <Box py={8}>
      {" "}
      <Spinner />
    </Box>
  );

  return content;

  // return (
  //   <>
  //     <Grid
  //       gap={2}
  //       templateAreas={{ base: `"side" "main"`, lg: `"main side"` }}
  //       templateColumns={{ base: "1fr", lg: "2f 1fr" }}
  //     >
  //       <GridItem area="main" p={4}>
  //         <BlogPostDetails post={post as Post} />
  //       </GridItem>

  //       {/* <GridItem area="side">
  //         <Flex direction={{ base: "row", lg: "column" }} gap="4">
  //           <EditPostButton postId={post._id as string} />
  //           <DeletePostButton postId={post._id as string} />
  //         </Flex>
  //       </GridItem> */}
  //     </Grid>
  //   </>
  // );
};

export default AdminPostPage;
