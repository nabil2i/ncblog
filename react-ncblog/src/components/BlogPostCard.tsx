
import { Box, Text, Heading } from "@chakra-ui/react";
import { Post } from "../hooks/usePosts";

interface Props {
  post: Post
}

const  BlogPostCard = ({ post }: Props) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box m="5" as="a" href="/blog-post-thing">
        <Heading m="5" mb="0" as="h4" size="md" fontSize="2xl">
          {post.title}
        </Heading>
        <Text m="5" mt="0">
          My cool blog post
        </Text>
      </Box>
    </Box>
  );
}

export default BlogPostCard;