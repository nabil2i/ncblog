import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Comment from "../../../entities/Comment";
import CommentRow from "./CommentRow";

interface Props {
  isSuccess: boolean;
  comments: EntityState<Comment, EntityId>;
}

const CommentsTable = ({ isSuccess, comments }: Props) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  if (isSuccess) {
    if (comments) {
      const { ids } = comments;
      const tableContent = ids.length ? (
        ids.map((commentId: EntityId) => (
          <CommentRow key={commentId} commentId={commentId} />
        ))
      ) : (
        <Tr>
          <Td colSpan={2} textAlign="center">
            {" "}
            Nothing to show
          </Td>
        </Tr>
      );

      return (
        <Flex
          direction="column"
          w={{ base: "full", md: "auto" }}
          shadow="md"
          p={2}
          rounded="md"
          bg={colorMode === "light" ? "" : "gray.900"}
        >
          <Flex justify="space-between" align="center" fontWeight="bold" p={3}>
            <Box as="h3"> Recent Comments</Box>
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => navigate("/dashboard?tab=comments")}
            >
              See all comments
            </Button>
          </Flex>

          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th
                    maxW={{ base: "300px", lg: "500px" }}
                    whiteSpace="pre-wrap"
                  >
                    Comment content
                  </Th>
                  <Th>Likes</Th>
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

export default CommentsTable;
