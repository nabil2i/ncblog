import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
// import Landscape from "../../assets/images/landscape.jpeg";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import Post from "../../entities/Post";
import BlogPostAuthor from "./BlogPostAuthor";

interface Props {
  post: Post;
}

const BlogPostCard = ({ post }: Props) => {
  return (
    <Link
      as={NavLink}
      _hover={{ textDecoration: "none" }}
      to={"/blog/" + post.slug}
    >
      <Card textAlign="left" height="100%" key={post._id} borderRadius="4">
        <CardBody>
          {/* <Center> */}
          <Image
            // objectFit='cover'
            mt={3}
            mb={3}
            src={post.img}
            // boxSize="350px"
            height="200px"
            borderRadius="xl"
            objectFit="cover"
            mx="auto"
          />
          {/* </Center> */}
          <HStack mt="5" spacing="3">
            {post.tags?.slice(0, 4).map((item) => (
              <Tag
                key={item}
                color={"green.500"}
                // variant="outline"
              >
                {item}
              </Tag>
            ))}

            {post.category && <Tag color={"green.500"}>{post.category}</Tag>}
          </HStack>
          <Heading as="h3" my="4" fontSize="xl" noOfLines={3}>
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: post.title }}
            />
          </Heading>

          <Text fontSize={"md"} noOfLines={5}>
            <div className="" dangerouslySetInnerHTML={{ __html: post.body }} />
          </Text>

          <Flex align="center" justify="space-between" mt={4}>
            <BlogPostAuthor post={post} />
            <Flex gap={2}>
              {Number(post.totalCommentsCount) > 0 && (
                <Flex gap={1} align="center">
                  <FiMessageCircle />
                  <Box>{post.totalCommentsCount}</Box>
                </Flex>
              )}
              {Number(post.numberOfLikes) > 0 && (
                <Flex gap={1} align="center">
                  <FiHeart />
                  <Box>{post.numberOfLikes}</Box>
                </Flex>
              )}
            </Flex>
          </Flex>
        </CardBody>
        {/* <Divider borderColor="gray.200"/> */}
        {/* <CardHeader>
          
        </CardHeader> */}
        {/* <CardFooter> */}
        {/* </CardFooter> */}
      </Card>
    </Link>
  );
};

export default BlogPostCard;
