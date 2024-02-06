import { Box, Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorMode } from "@chakra-ui/react";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import PostRow from "./PostRow";
import Post from "../../../entities/Post";

interface Props {
  isSuccess: boolean;
  posts: EntityState<Post, EntityId>
}

const PostsTable = ({ isSuccess, posts }: Props) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  if (isSuccess) {
    if (posts) {
      const { ids } = posts;
      const tableContent = ids.length ? (
        ids.map((postId: EntityId) => <PostRow key={postId} postId={postId} />)
      ) : (
        <Tr>
          <Td colSpan={2} textAlign="center"> Nothing to show</Td>
        </Tr>
      )

      return (
        <Flex direction="column" w={{ base: "full", md: "auto" }} shadow="md" p={2} rounded="md" bg={ colorMode === 'light' ? '' : 'gray.900'}>
          <Flex justify="space-between" align="center" fontWeight="bold" p={3}>
            <Box as="h3" > Recent Posts</Box>
            <Button variant="outline" colorScheme="teal" onClick={() => navigate("/dashboard?tab=posts")}>
              See all posts
            </Button>
          </Flex>

          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Post Image</Th>
                  <Th>Post Title</Th>
                  <Th>Post Category</Th>
                </Tr>
              </Thead>
              <Tbody>{tableContent}</Tbody>
            </Table>
          </TableContainer>
        </Flex>
      );
    }
  }
};

export default PostsTable;
