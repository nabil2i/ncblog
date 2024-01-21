import {
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { NavLink } from "react-router-dom";
import usePosts from "../../../hooks/usePosts";
import BlogPostDate from "../../posts/BlogPostDate";
import DeletePostAction from "./DeletePostAction";
import EditPostAction from "./EditPostAction";

const PostsTable = () => {
  const { data: payload, error, isLoading } = usePosts();
  const data = payload?.data;

  if (isLoading)
    return (
      <Box p={10}>
        <Flex justify="center">
          <Spinner />
        </Flex>
      </Box>
    );

  return (
    <>
      {error && <Text> We encountered a problem.</Text>}

      <Table>
        <Thead>
          <Tr>
            <Th fontSize={{ base: "sm", md: "md" }}>Post</Th>
          </Tr>
        </Thead>

        <Tbody>
          {data?.results.length === 0 ? (
            <Tr>
              <Td> Nothing to show</Td>
            </Tr>
          ) : (
            data?.results.map((post) => (
              <Tr key={post._id}>
                <Td mb={2}>
                  <Flex align="center" justify="space-between">
                    <Flex
                      display="column"
                      mr={2}
                      flexBasis={{ base: "100%", lg: "50%" }}
                    >
                      <Link
                        as={NavLink}
                        to={`/admin/posts/${post._id}`}
                        _hover={{ color: "teal", cursor: "pointer" }}
                        fontSize={{ base: "16px", lg: "20px" }}
                        fontWeight={500}
                        noOfLines={{ base: 2, lg: 1 }}
                        whiteSpace="pre-wrap"
                      >
                        {post.title}
                      </Link>
                      <Flex align="center" mt="5px">
                        <Text>
                          <BlogPostDate date={post.createdAt} />
                        </Text>
                      </Flex>
                    </Flex>

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
                  </Flex>
                </Td>

                {/* <Td display={{ base: "none", lg: "flex" }}>
                      <BlogPostDate date={post.createdAt} />
                    </Td> 
                    
                      
                    <Td>
                      <Flex gap="3" align="center">
                        <EditPostButton postId={post._id as string} />
                        <DeletePostButton postId={post._id as string} />
                      </Flex> 
                    </Td>*/}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default PostsTable;
