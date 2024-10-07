import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import NabilConveys2 from "../../assets/icons/NabilConveys2.webp";
import Post from "../../entities/Post";
import BlogPostDate from "../common/CustomDate";

const BlogPostAuthor = ({ post }: { post: Post }) => {
  // console.log(post)
  return (
    <Flex mt="1" gap="2">
      <Avatar src={NabilConveys2} />
      <Box>
        <Text fontWeight={300}>
          {post.postAuthorId?.firstname + " " + post.postAuthorId?.lastname}
        </Text>
        <Text fontSize={"md"} color="gray">
          <BlogPostDate date={post.createdAt} />
        </Text>
      </Box>
    </Flex>
  );
};

export default BlogPostAuthor;
