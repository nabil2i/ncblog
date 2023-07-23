import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, HStack, Heading, Image, Tag, Text } from "@chakra-ui/react";
import NabilConveys1 from "../assets/NabilConveys1.webp";
import NabilConveys2 from "../assets/NabilConveys2.webp";
import Landscape from "../assets/landscape.jpeg"
import Post from "../entities/Post";
import BlogPostDate from "./BlogPostDate";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

const BlogPostCard = ({ post }: Props) => {
  return (
    <Link to={'/blog/' + post._id}> 
    <Card textAlign="left" height="100%" key={post._id} borderRadius='4'>
      <CardBody>
        {/* <Center> */}
          <Image
            // objectFit='cover'
            mt={3}
            mb={3}
            src={Landscape}
            // boxSize="350px"
            height="200px"
            borderRadius='xl'
            objectFit='cover'
            mx='auto'
            />
        {/* </Center> */}
        <HStack mt='5' spacing="3">
          {['Islam', 'Religion'].map(item => (
            <Tag
              key={item}
              color={'green.500'}
              // variant="outline"
              >{item}</Tag>
          ))}
        </HStack>
        <Heading my='4' fontSize="lg" noOfLines={2}>
          {post.title}
        </Heading>
        
        <Text noOfLines={5}>{post.body}</Text>
        
      </CardBody>
      {/* <Divider borderColor="gray.200"/> */}
      {/* <CardHeader>
        
      </CardHeader> */}
      <CardFooter>
      <Flex mt="4" gap='2'>
          <Avatar src={NabilConveys2}/>
          <Box>
            <Text fontWeight={600}>Nabil Ibn Ismail</Text>
            <BlogPostDate date={post.createdAt} />
            {/* <Text>Nabil Ibn Ismail</Text> */}
          </Box>
        </Flex>
        {/* <HStack  justifyContent={"space-around"}>
          <BlogPostDate date={post.createdAt} />
          <Text> </Text>
        </HStack>  */}
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
