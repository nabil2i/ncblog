import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { authSatus } from "../../app/features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { PostComment } from "../../entities/Post";
import useAuth from "../../hooks/useAuth";
import useDeleteComment from "../../hooks/useDeleteComment";
import { CustomButton } from "../common/CustomButton";

interface Props {
  comment: PostComment;
  focusCommentId: string;
  setFocusCommentId: (value: string) => void;
  postId: string;
}
const DeleteCommentButton = ({
  comment,
  postId,
  focusCommentId,
  setFocusCommentId,
}: Props) => {
  const isAuthenticated = useAppSelector(authSatus);
  const { _id, privilegelevel } = useAuth();

  // const toast = useToast();

  // track if the user is editing a comment
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // controle deleting alter dialog
  const [isAlertOpen, setAlertOpen] = useState(false);
  const onCloseAlert = () => setAlertOpen(false);
  const cancelRef = useRef(null);

  const handleDeleteComment = async (commentToDeleteId: string) => {
    await setFocusCommentId(commentToDeleteId);
    setAlertOpen(true);
  };

  const deleteComment = useDeleteComment(
    postId,
    focusCommentId,
    // userId,
    () => {
      setIsDeleting(false);
      setFocusCommentId("");
    }
    //onError
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
    // }
  );

  return (
    <>
      {isAuthenticated &&
        (_id === comment?.userId?._id || privilegelevel === "superadmin") && (
          <CustomButton
            color="red.400"
            onClick={() => {
              handleDeleteComment(comment._id);
            }}
            text={"Delete"}
          />
        )}

      <Box>
        <AlertDialog
          isOpen={isAlertOpen}
          onClose={onCloseAlert}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm Deletion
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this comment? This action cannot
                be undone.
              </AlertDialogBody>

              <Flex m="4" gap="3" align="center" justify="flex-start">
                <Button
                  variant="soft"
                  color="gray"
                  onClick={onCloseAlert}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    setIsDeleting(true);
                    // console.log(theCommentId)
                    deleteComment.mutate();
                    // deleteComment.mutate({ commentId:theCommentId });
                    onCloseAlert();
                  }}
                >
                  {isDeleting && <Spinner />} Delete
                </Button>
              </Flex>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </>
  );
};

export default DeleteCommentButton;
