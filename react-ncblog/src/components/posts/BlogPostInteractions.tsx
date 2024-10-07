import { Box, Flex } from "@chakra-ui/react";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import Post from "../../entities/Post";

const BlogPostInteractions = ({ post }: { post: Post }) => {
  return (
    <Flex gap={2}>
      {Number(post.commentCount) > 0 && (
        <Flex gap={1} align="center">
          <FiMessageCircle />
          <Box>{post.commentCount}</Box>
        </Flex>
      )}
      {Number(post.likeCount) > 0 && (
        <Flex gap={1} align="center">
          <FiHeart />
          <Box>{post.likeCount}</Box>
        </Flex>
      )}
    </Flex>
  );
};

export default BlogPostInteractions;
