import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import ms from "ms";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteUserPost from "../../hooks/useDeleteUserPost";

interface Props {
  postId: string;
  userId: string;
}
const DeletePostButton = ({ postId, userId }: Props) => {
  const navigate = useNavigate();
  // const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef<null | HTMLButtonElement>(null);
  const toast = useToast();

  const onClose = () => {
    setIsOpen(false);
  };

  const deletePost = useDeleteUserPost(
    () => {
      navigate("/myposts");
      setIsOpen(false);
      setIsDeleting(false);
    },
    (errorMessage) => {
      setIsDeleting(false);
      // setError(true);
      setIsOpen(false);
      toast({
        title: "",
        description: "This post could not be deleted. " + errorMessage,
        duration: ms("5s"),
        isClosable: true,
        status: "error",
        position: "top",
      });
    }
  );

  const triggerDeletePost = () => {
    if (postId) {
      setIsDeleting(true);
      deletePost.mutate({
        id: postId,
        userId,
      });
    }
  };

  return (
    <>
      <Button
        colorScheme="gray"
        // variant={"outline"}
        disabled={isDeleting}
        size="lg"
        onClick={() => setIsOpen(true)}
      >
        Delete Post {isDeleting && <Spinner />}
      </Button>

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
              Are you sure you want to delete this post? This action cannot be
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
                onClick={() => triggerDeletePost()}
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

            <AlertDialogBody>The post could not be deleted.</AlertDialogBody>

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

export default DeletePostButton;
