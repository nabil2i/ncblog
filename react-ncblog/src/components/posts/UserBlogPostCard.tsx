import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Tag,
  Text,
} from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Link } from "react-router-dom";
import Landscape from "../../assets/landscape.jpeg";
import Post from "../../entities/Post";
import BlogPostAuthor from "./BlogPostAuthor";
import DeletePostAction from "./DeletePostAction";
import EditPostAction from "./EditPostAction";

interface Props {
  post: Post;
}

const UserBlogPostCard = ({ post }: Props) => {
  return (
    <Flex display="column">
      <Card textAlign="left" height="100%" key={post._id} borderRadius="4">
        <CardHeader>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MdOutlineMoreHoriz />}
            ></MenuButton>
            <MenuList>
              <EditPostAction postId={post._id as string} />
              <DeletePostAction postId={post._id as string} />
            </MenuList>
          </Menu>
        </CardHeader>
        <Link to={"/blog/" + post._id}>
          <CardBody>
            {/* <Center> */}
            <Image
              // objectFit='cover'
              mt={3}
              mb={3}
              src={Landscape}
              // boxSize="350px"
              height="200px"
              borderRadius="xl"
              objectFit="cover"
              mx="auto"
            />
            {/* </Center> */}
            <HStack mt="5" spacing="3">
              {["Islam", "Religion"].map((item) => (
                <Tag
                  key={item}
                  color={"green.500"}
                  // variant="outline"
                >
                  {item}
                </Tag>
              ))}
            </HStack>
            <Heading as="h3" my="4" fontSize="xl" noOfLines={2}>
              {post.title}
            </Heading>
            <Text fontSize={"md"} noOfLines={3}>
              {post.body}
            </Text>
          </CardBody>
          {/* <Divider borderColor="gray.200"/> */}
          {/* <CardHeader>
      
          </CardHeader> */}
          <CardFooter>
            <BlogPostAuthor post={post} />
          </CardFooter>
        </Link>
      </Card>
    </Flex>

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

export default UserBlogPostCard;
