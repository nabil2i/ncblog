import { Box, Flex } from "@chakra-ui/react";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import Post from "../../entities/Post";

const BlogPostInteractions = ({ post }: { post: Post }) => {
  return (
    <Flex gap={2}>
      {Number(post.totalCommentsCount) > 0 && (
        <Flex gap={1} align="center">
          <FiMessageCircle />
          <Box>{post.totalCommentsCount}</Box>
        </Flex>
      )}
      {Number(post.numberOfLikes) > 0 && (
        <Flex gap={1} align="center">
          <FiHeart />
          <Box>{post.numberOfLikes}</Box>
        </Flex>
      )}
    </Flex>
  );
};

export default BlogPostInteractions;
