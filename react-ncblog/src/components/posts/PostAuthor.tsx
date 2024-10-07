import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import NabilConveys2 from "../../assets/icons/NabilConveys2.webp";
import Post from "../../entities/Post";
import BlogPostDate from "../common/CustomDate";
import { readingTime } from "../../utils/post";
import { removeHtmlMarkup } from "../../utils/strings";

const PostAuthor = ({ post }: { post: Post }) => {
  return (
    <Flex mt="1" gap="2">
      <Avatar src={NabilConveys2} />
      <Box>
        {/* <Box>
          <Text>Written by</Text>
        </Box> */}
        <Box>
          <Text fontSize={22} fontWeight={"bold"}>
            {post.postAuthorId?.firstname + " " + post.postAuthorId?.lastname}
          </Text>
        </Box>

        <Flex gap={2}>
          <Text>
            <BlogPostDate date={post.createdAt} />
          </Text>

          <Text>·</Text>
          
          <Box fontSize={15}>
            {post && readingTime(removeHtmlMarkup(post.body))} read
          </Box>

        </Flex>
        {/* <Flex>
          <Text>
            Updated: <BlogPostDate date={post.updatedAt} />
          </Text>
        </Flex> */}
      </Box>
    </Flex>
  );
};

export default PostAuthor;
