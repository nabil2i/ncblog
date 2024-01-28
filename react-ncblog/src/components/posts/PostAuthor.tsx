import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import NabilConveys2 from "../../assets/icons/NabilConveys2.webp";
import Post from "../../entities/Post";
import BlogPostDate from "./BlogPostDate";

const PostAuthor = ({ post }: { post: Post }) => {
  return (
    <Flex mt="1" gap="2">
      <Avatar src={NabilConveys2} />
      <Box>
        {/* <Box>
          <Text>Written by</Text>
        </Box> */}
        <Box>
          <Text fontWeight={300}>
            {post.user?.firstname + " " + post.user?.lastname}
          </Text>
        </Box>

        <Flex direction="column" justify="center">
          <Text>
            Posted on: <BlogPostDate date={post.createdAt} />{" "}
          </Text>
          <Text>
            {" "}
            Last updated: <BlogPostDate date={post.updatedAt} />{" "}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PostAuthor;
