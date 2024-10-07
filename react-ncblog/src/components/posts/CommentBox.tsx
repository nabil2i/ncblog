import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import moment from "moment";
import { PostComment } from "../../entities/Post";
import useUpdateComment from "../../hooks/useUpdateComment";

interface Props {
  comment: PostComment;
  focusCommentId: string;
  postId: string;
  isEditing: boolean;
  editedContent: string;
  setIsEditing: (value: boolean) => void;
  setEditedContent: (value: string) => void;
  setFocusCommentId: (value: string) => void;
}

const CommentBox = ({
  comment,
  focusCommentId,
  setFocusCommentId,
  isEditing,
  setIsEditing,
  postId,
  editedContent,
  setEditedContent,
}: Props) => {
  const { colorMode } = useColorMode();

  // cancel editing a comment
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFocusCommentId("");
  };

  // trigger edition of comment in backend
  const editComment = useUpdateComment(
    postId,
    focusCommentId,
    () => {
      setIsEditing(false);
      setFocusCommentId("");
    }
    // (comment: Comment) => {
    //   setIsEditing(false);
    //   setTheCommentId("");
    //   // Update the comment ?
    //   // onEdit(comment, comment.text)
    // }

    // (errorMessage) => {
    //   // console.log("Error: ", errorMessage);
    //   toast({
    //     title: "",
    //     description: errorMessage,
    //     duration: ms("5s"),
    //     isClosable: true,
    //     status: "error",
    //     position: "top",
    //     // icon: <EditIcon />,
    //   });
    // setIsEditing(false);
    // setFocusCommentId("");
    // }
  );

  return (
    <>
      <Box
        borderRadius={"lg"}
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        p={4}
      >
        {/* USER + TIME */}
        <Flex gap="3" alignItems="center">
          <Text size="3" fontWeight={700} colorScheme={"blue"}>
            {comment?.userId?.username}
          </Text>
          <Text>.</Text>
          <Text size="2" color="gray">
            {moment(comment.createdAt).fromNow()}
          </Text>
        </Flex>
        {/* END USER + TIME */}

        {/* COMMENTTEXT */}
        {isEditing && focusCommentId === comment._id ? (
          <Flex direction="column" gap={4}>
            <Flex direction="column">
              <Textarea
                focusBorderColor="teal.500"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <Box color="gray">{/* {remainingChars} characters left */}</Box>
            </Flex>

            <Flex align="center" gap="2" justify="flex-end">
              <Button variant="solid" colorScheme="gray" onClick={handleCancelEdit}>Cancel</Button>
              <Button
                type="submit"
                // disabled={!isValid}
                colorScheme={"teal"}
                variant="solid"
                onClick={() =>
                  editComment.mutate({
                    text: editedContent as string,
                  })}
              >
                Send
              </Button>

              {/* <CustomButton
                onClick={() =>
                  editComment.mutate({
                    text: editedContent as string,
                  })
                }
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </CustomButton> */}
            </Flex>
          </Flex>
        ) : (
          <Text size="2">{comment.text}</Text>
        )}
        {/* END COMMENTTEXT */}
      </Box>
    </>
  );
};

export default CommentBox;
