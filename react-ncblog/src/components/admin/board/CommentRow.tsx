import { Td, Tr, useColorMode } from "@chakra-ui/react";
import { EntityId } from "@reduxjs/toolkit";
import { memo } from "react";
import { useGetCommentsQuery } from "../../../app/features/comments/commentsApiSlice";

const CommentRow = ({ commentId }: { commentId: EntityId }) => {
  // const showOnLargeScreen = useBreakpointValue({ base: false, lg: true });

  const { comment } = useGetCommentsQuery("commentsList", {
    selectFromResult: ({ data }) => ({
      comment: data?.comments.entities[commentId],
    }),
  });
  // console.log(comment)

  const { colorMode } = useColorMode();

  // console.log(comment?.img);
  // console.log(role);

  if (comment)
    return (
      <>
        <Tr
          _hover={{
            cursor: "pointer",
            bg: colorMode === "light" ? "teal.300" : "black",
          }}
        >
          {/* <Td noOfLines={2}>{comment.text}</Td> */}
          <Td noOfLines={2} w={96}>{comment.text}</Td>
          <Td>{comment.numberOfLikes}</Td>
        </Tr>
      </>
    );
  else return null;
};

const memoizedComment = memo(CommentRow);

export default memoizedComment;
