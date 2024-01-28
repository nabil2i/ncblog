import { Box, Flex } from "@chakra-ui/react";
import AddPostButton from "../../components/admin/posts/AddPostButton";
import PostsTable from "../../components/admin/posts/PostsTable";

const PostsPage = () => {
  return (
    <>
      <Box>
        <Flex direction="column" maxW="1440px" p={4}>
          <Flex justify="space-between" align="center">
            <Box>Posts</Box>
            <AddPostButton />
          </Flex>
          <Box>
            <PostsTable />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default PostsPage;
