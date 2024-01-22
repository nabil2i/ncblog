import { Flex } from "@chakra-ui/react";
import Post from "../../entities/Post";
import PostAuthor from "./PostAuthor";

const BlogPostInfo = ({ post }: { post: Post }) => {
  return (
    <Flex direction="row" align="center" gap={4} mt={8}>
      <Flex gap={4}>
        <PostAuthor post={post} />
      </Flex>

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
