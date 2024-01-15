import { Flex, Text } from "@chakra-ui/react";
import Post from "../../entities/Post";
import PostAuthor from "./PostAuthor";
import BlogPostDate from "./BlogPostDate";

const BlogPostInfo = ({ post }: { post: Post }) => {
  return (
    <Flex direction="column">
      <Flex gap={2}>
        <Text whiteSpace="nowrap">
          Posted on: <BlogPostDate date={post.createdAt} />{" "}
        </Text>
        <Text whiteSpace="nowrap">
          {" "}
          Last updated: <BlogPostDate date={post.updatedAt} />{" "}
        </Text>
      </Flex>
      <Flex gap={4} mt={2}>
        <PostAuthor post={post} />
      </Flex>
    </Flex>
  );
};

export default BlogPostInfo;
