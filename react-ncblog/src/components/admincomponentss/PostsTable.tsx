import {
  Button,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import usePosts from "../../hooks/usePosts";
import BlogPostDate from "../BlogPostDate";
import { redirect } from "react-router-dom";

const PostsTable = () => {
  const { data, error, isLoading } = usePosts();

  if (isLoading)
    return (
      <VStack marginTop={2}>
        <Spinner />
      </VStack>
    );

  const deletePost = (postId: string) => {
    // console.log("deleting..."); return;
    axios.delete(`http://localhost:5000/api/posts/${postId}`);
    redirect("/admin/dashboard");
  };

  return (
    <>
      {error && <Text> We encountered a problem.</Text>}
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Blog posts</TableCaption>
          <Thead>
            <Tr>
              <Th>Post title</Th>
              <Th>Date</Th>
              {/* <Th isNumeric>multiply by</Th> */}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.results.map((post) => (
              <Tr key={post._id}>
                <Td _hover={{ color: "green" }}>{post.title}</Td>
                <Td>
                  <BlogPostDate date={post.createdAt} />
                </Td>
                <Td>
                  <Flex gap="3">
                    <Button colorScheme="blue">Edit</Button>
                    <Button
                      colorScheme="red"
                      onClick={() => deletePost(post._id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default PostsTable;
