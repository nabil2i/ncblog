import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import NabilConveys2 from "../../assets/NabilConveys2.webp";
import Post from "../../entities/Post";

const PostAuthor = ({ post }: { post: Post }) => {
  return (
    <Flex mt="1" gap="2">
      <Avatar src={NabilConveys2} />
      <Box>
        <Box>
          <Text>Written by</Text>
        </Box>
        <Box>
          <Text fontWeight={300}>
            {post.user?.firstname + " " + post.user?.lastname}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default PostAuthor;
