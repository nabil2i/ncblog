import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Tag,
  Td,
  Text,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Post from "../../entities/Post";
import BlogPostDate from "../common/CustomDate";
import DeletePostAction from "./DeletePostAction";
import EditPostAction from "./EditPostAction";

const PostRow = ({ post }: { post: Post }) => {
  const { colorMode } = useColorMode();

  if (post)
    return (
      <>
        <Tr
          _hover={{
            cursor: "pointer",
            bg: colorMode === "light" ? "teal.300" : "black",
          }}
        >
          <Td mb={2} maxW={{ base: "300px", lg: "500px" }}>
            <Box>
              <Flex
                display="column"
                w="100%"
                // mb={2}
                // flexBasis={{ base: "100%", lg: "50%" }}
              >
                <Box>
                  <Link
                    as={NavLink}
                    _hover={{ textDecoration: "none", cursor: "pointer" }}
                    to={`/blog/${post.slug}`}
                    fontSize={{ base: "16px", lg: "20px" }}
                    fontWeight={500}
                    // noOfLines={{ base: 2, lg: 2 }}
                    whiteSpace="pre-wrap"
                  >
                    <div
                      className=""
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                  </Link>
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                  iste eveniet doloribus ipsum nostrum officiis dolorum adipisci
                  enim corporis eos! */}
                </Box>
                <Flex mt="5px" gap={4}>
                  <Box display={{ base: "flex", lg: "none" }}>
                    {post.category && (
                      <Tag color={"green.500"}>{post.category}</Tag>
                    )}
                  </Box>
                  <Text fontSize={"md"} color="gray">
                    <BlogPostDate date={post.createdAt} />
                  </Text>
                </Flex>
              </Flex>

              {/* <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdOutlineMoreHoriz />}
                ></MenuButton>
                <MenuList>
                  <EditPostAction postId={post._id as string} />
                  <DeletePostAction postId={post._id as string} />
                </MenuList>
              </Menu> */}
            </Box>
          </Td>
          <Show above="lg">
            <Td>{post.category}</Td>
          </Show>
          <Td>
            <Flex justify="end" align="center" gap={4}>
              <Flex
                align="center"
                justify="center"
                as={NavLink}
                _hover={{ textDecoration: "none", cursor: "pointer" }}
                to={`/blog/${post.slug}`}
              >
                <Image
                  src={post.img}
                  width={20}
                  height={10}
                  objectFit={"cover"}
                />
              </Flex>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdOutlineMoreHoriz />}
                ></MenuButton>
                <MenuList>
                  <EditPostAction postId={post._id as string} />
                  <DeletePostAction
                    postId={post._id as string}
                    userId={post.user?._id as string}
                  />
                </MenuList>
              </Menu>
            </Flex>
          </Td>
        </Tr>
      </>
    );
  else return null;
};

export default PostRow;
