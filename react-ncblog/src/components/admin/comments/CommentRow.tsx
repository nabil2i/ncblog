import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Td,
  Tr,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { EntityId } from "@reduxjs/toolkit";
import dateFormat from "dateformat";
import { memo } from "react";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useGetCommentsQuery } from "../../../app/features/comments/commentsApiSlice";
import DeleteCommentAction from "./DeleteCommentAction";

const CommentRow = ({ commentId }: { commentId: EntityId }) => {
  const showOnLargeScreen = useBreakpointValue({ base: false, lg: true });

  const { comment } = useGetCommentsQuery("commentList", {
    selectFromResult: ({ data }) => ({
      comment: data?.comments.entities[commentId],
    }),
  });
  // console.log(comment)

  const { colorMode } = useColorMode();

  // // NORMAL SELECTOR
  // const comment = useSelector((state: RootState) => selectCommentById(state, id));
  // console.log(comment);

  if (comment)
    return (
      <>
        <Tr
          _hover={{
            cursor: "pointer",
            bg: colorMode === "light" ? "teal.300" : "black",
          }}
        >
          <Td>
            <Box color="gray">
              {dateFormat(comment.updatedAt, "mmm dS, yyyy")}
            </Box>
            <Flex direction="column" gap={2}>
              <Box>Post Id: {comment.post}</Box>
              <Box>user Id: {comment.userId._id}</Box>

              <Flex display={{ lg: "none" }} direction="column" gap={3}>
                <Box>Number of likes: {comment.likeCount}</Box>
                <Box>
                  User: {comment.userId.firstname + " " + comment.userId.lastname}
                </Box>
              </Flex>
            </Flex>
          </Td>
          <Td whiteSpace="pre-wrap">{comment.text}</Td>
          {showOnLargeScreen && (
            <>
              <Td>{comment.likeCount}</Td>
              {/* <Td>{comment.post}</Td>
              <Td>{comment.user._id}</Td> */}
              <Td>{comment.userId.firstname + " " + comment.userId.lastname}</Td>
            </>
          )}
          <Td>
            <Flex align="center" gap={4}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<MdOutlineMoreHoriz />}
                ></MenuButton>
                <MenuList>
                  {/* <ChangeRolesAction comment={comment} /> */}
                  <DeleteCommentAction commentId={comment._id as string} />
                </MenuList>
              </Menu>
            </Flex>
          </Td>
        </Tr>
      </>
    );
  else return null;
};

const memoizedComment = memo(CommentRow);

export default memoizedComment;
