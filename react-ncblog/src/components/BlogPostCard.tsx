
import { Box, Text, Heading, Card, CardBody } from "@chakra-ui/react";
import { Post } from "../hooks/usePosts";

interface Props {
  post: Post
}

const  BlogPostCard = ({ post }: Props) => {
  return (
    <Card>
      <CardBody>
        <Heading fontSize="2xl">{post.title}</Heading>
        <Text> My cool blog post</Text>
      </CardBody>
    </Card>
  );
}

export default BlogPostCard;