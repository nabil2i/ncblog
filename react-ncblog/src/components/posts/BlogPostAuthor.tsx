import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import NabilConveys2 from "../../assets/icons/NabilConveys2.webp";
import Post from "../../entities/Post";
import BlogPostDate from "./BlogPostDate";

const BlogPostAuthor = ({ post }: { post: Post }) => {
  console.log(post)
  return (
    <Flex mt="1" gap="2">
      <Avatar src={NabilConveys2} />
      <Box>
        <Text fontWeight={300}>
        {post.user?.firstname + " " + post.user?.lastname}
        </Text>
        <BlogPostDate date={post.createdAt} />
      </Box>
    </Flex>
  );
};

export default BlogPostAuthor;
