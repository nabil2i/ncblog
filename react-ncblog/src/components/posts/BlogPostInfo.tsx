import { Box, Flex } from "@chakra-ui/react";
import Post from "../../entities/Post";
import PostAuthor from "./PostAuthor";
import { readingTime } from "../../utils/post";
import { removeHtmlMarkup } from "../../utils/markup";

const BlogPostInfo = ({ post }: { post: Post }) => {
  return (
    <Flex direction="row" justify="space-between" gap={4} mt={8} fontSize={15}>
      <Flex gap={4}>
        <PostAuthor post={post} />
      </Flex>
      <Box>{post && readingTime(removeHtmlMarkup(post.body))} read</Box>

      {/* <Flex direction="column" justify="center">
        <Text >
          Posted on: <BlogPostDate date={post.createdAt} />{" "}
        </Text>
        <Text >
          {" "}
          Last updated: <BlogPostDate date={post.updatedAt} />{" "}
        </Text>
      </Flex> */}
    </Flex>
  );
};

export default BlogPostInfo;
