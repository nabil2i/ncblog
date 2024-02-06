import { Box, Flex } from "@chakra-ui/react";
import PostsTable from "../../components/admin/posts/PostsTable";
import AddPostButton from "../../components/posts/AddPostButton";

const DashPosts = () => {
  return (
    <Flex direction="column" maxW="1440px" p={4}>
      <Flex justify="space-between" align="center">
        <Box as="h1" fontSize={50}>Posts</Box>
        <AddPostButton />
      </Flex>
      <Box>
        <PostsTable />
      </Box>
    </Flex>
  );
};

export default DashPosts;
