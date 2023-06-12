
import { Box, Text, Heading, Card, CardBody, HStack } from "@chakra-ui/react";
import { Post } from "../hooks/usePosts";
import BlogPostDate from "./BlogPostDate";

interface Props {
  post: Post
}

const  BlogPostCard = ({ post }: Props) => {
  return (
    <Card as="a" href="/blog-post-thing" textAlign="left">
      <CardBody>
        <Heading fontSize="2xl" noOfLines={1}>{post.title}</Heading>
        <Text noOfLines={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ex odit harum quo nisi magnam veniam, rerum neque libero porro voluptatibus quam ipsa illum reprehenderit enim, iusto id tempora, dicta veritatis quisquam? Amet officia qui corrupti voluptas fugit tempore. Voluptatum dicta illo eveniet odio illum iusto, amet quasi! Ab, debitis!</Text>
        <HStack paddingY="1">
          <BlogPostDate date={"20 Dec 2023"} />
        </HStack>
      </CardBody>
    </Card>
    // <Box m="5" as="a" href="/blog-post-thing">
    //   <Heading m="5" mb="0" as="h4" size="md">
    //     Blog Post
    //   </Heading>
    //   <Text m="5" mt="0">
    //     My cool blog post
    //   </Text>
    // </Box>
  );
}

export default BlogPostCard;