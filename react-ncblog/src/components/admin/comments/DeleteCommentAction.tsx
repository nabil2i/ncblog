import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  MenuItem,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCommentMutation } from "../../../app/features/comments/commentsApiSlice";

const DeleteCommentAction = ({ commentId }: { commentId: string }) => {
  // console.log(commentId)
  const navigate = useNavigate();
  // const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef<null | HTMLButtonElement>(null);
  const toast = useToast();

  const onClose = () => {
    setIsOpen(false);
  };

  const [deleteComment, { isError, isSuccess }] = useDeleteCommentMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard?tab=comments");
      setIsDeleting(false);
      setIsOpen(false);
      toast({
        title: "",
        description: "Comment deleted successfully",
        duration: 5000, // 5s
        isClosable: true,
        status: "success",
        position: "top",
        icon: <DeleteIcon />,
      });
    }

    if (isError) {
      setIsDeleting(false);
      // setError(true);
      setIsOpen(false);
      toast({
        title: "",
        description: "Could  not delete the comment",
        duration: 5000, // 5s
        isClosable: true,
        status: "error",
        position: "top",
        icon: <DeleteIcon />,
      });
    }
  }, [isError, isSuccess, navigate, toast]);

  const triggerDeleteComment = (commentId: string) => {
    // console.log("triggerid", commentId);
    if (commentId) {
      setIsDeleting(true);
      deleteComment(commentId);
    }
  };

  return (
    <>
      <MenuItem
        icon={<DeleteIcon />}
        disabled={isDeleting}
        onClick={() => setIsOpen(true)}
      >
        Delete Comment {isDeleting && <Spinner />}
      </MenuItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Deletion
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this comment? This action cannot be
              undone.
            </AlertDialogBody>

            <Flex m="4" gap="3" align="center" justify="flex-start">
              <Button
                ref={cancelRef}
                variant="soft"
                color="gray"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => triggerDeleteComment(commentId)}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </Flex>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* <AlertDialog
        isOpen={error}
        leastDestructiveRef={cancelRef}
        onClose={() => setError(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Error
            </AlertDialogHeader>

            <AlertDialogBody>The comment could not be deleted.</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog> */}
    </>
  );
};

export default DeleteCommentAction;
