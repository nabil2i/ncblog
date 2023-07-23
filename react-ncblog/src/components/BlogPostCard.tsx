import { Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, HStack, Heading, Image, Text } from "@chakra-ui/react";
import NabilConveys1 from "../assets/NabilConveys1.webp";
import Post from "../entities/Post";
import BlogPostDate from "./BlogPostDate";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

const BlogPostCard = ({ post }: Props) => {
  return (
    <Link to={'/blog/' + post._id}> 
    <Card textAlign="left" height="100%" key={post._id} >
      <CardHeader>
        <Box w="50px" h="50px">
          <Text>Av</Text>
        </Box>
      </CardHeader>
      <CardBody>
        <Center>
          <Image
            // objectFit='cover'
            mt={3}
            mb={3}
            src={NabilConveys1}
            // boxSize="350px"
            height="200px"
            />
        </Center>
        <Heading fontSize="2xl" noOfLines={2}>
          {post.title}
        </Heading>
        
        <Text noOfLines={2}>{post.body}</Text>
      </CardBody>
      {/* <Divider borderColor="gray.200"/> */}
      <CardFooter>
        <HStack mt={3} paddingY="1" justifyContent={"space-between"}>
          <BlogPostDate date={post.createdAt} />
          <Text> {post._id} </Text>
          {/* <Text> Icon </Text> */}
        </HStack> 
      </CardFooter>
    </Card>
    </Link>
    // <Box m="5" as="a" href="/blog-post-thing">
    //   <Heading m="5" mb="0" as="h4" size="md">
    //     Blog Post
    //   </Heading>
    //   <Text m="5" mt="0">
    //     My cool blog post
    //   </Text>
    // </Box>
  );
};

export default BlogPostCard;
