
import { Text, Image, Heading, Card, CardBody, HStack } from "@chakra-ui/react";
import { Post } from "../hooks/usePosts";
import BlogPostDate from "./BlogPostDate";
import NabilConveys1 from '../assets/NabilConveys1.webp';

interface Props {
  post: Post
}

const  BlogPostCard = ({ post }: Props) => {
  return (
    <Card as="a" href="https://google.com" textAlign="left" height="100%" >
      <CardBody>
        <Heading fontSize="2xl" noOfLines={2}>{post.title}</Heading>
        <Image
        mt={3} mb={3}
          src={NabilConveys1} boxSize="350px" height="350px"
        />
        <Text noOfLines={5}>{post.body}</Text>
        
        <HStack mt={3} paddingY="1" justifyContent={"space-between"}>
          <BlogPostDate date={post.createdAt} />
          <Text> {post._id} </Text>
          {/* <Text> Icon </Text> */}
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