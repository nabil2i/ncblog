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
import { useDeletePostMutation } from "../../../app/features/posts/postsApiSlice";

const DeletePostAction = ({ postId }: { postId: string }) => {
  // console.log(postId)
  const navigate = useNavigate();
  // const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef<null | HTMLButtonElement>(null);
  const toast = useToast();

  const onClose = () => {
    setIsOpen(false);
  };

  const [deletePost, { isError, isSuccess }] = useDeletePostMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin/posts/");
      setIsOpen(false);
      toast({
        title: "Delete a post",
        description: "Successfully deleted the post",
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
      toast({
        title: "Delete a post",
        description: "Could  not delete the post",
        duration: 5000, // 5s
        isClosable: true,
        status: "success",
        position: "top",
        icon: <DeleteIcon />,
      });
    }
  }, [isError, isSuccess, navigate, toast]);

  // const deletePost = useDeletePost(
  //   () => {
  //     setIsOpen(false);
  //     setIsDeleting(false);
  //     navigate("/admin/posts");
  //   },
  //   (errorMessage) => {
  //     setIsDeleting(false);
  //     // setError(true);
  //     setIsOpen(false); toast({
  //       title: "",
  //       description: "This could not post not be deleted. " + errorMessage,
  //       duration: ms("5s"),
  //       isClosable: true,
  //       status: "error",
  //       position: "top",
  //     });
  //   }
  // );

  // const deletePost = (postId: string) => {
  //   // console.log("deleting..."); return;
  //   axios
  //     .delete(`http://localhost:5000/api/posts/${postId}`)
  //     .then(res => {
  //       res.data;
  //       showToast();
  //       redirect("/admin/posts");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       showErrorToast();
  //     })

  // };

  // const deletePost = async () => {
  //   try {
  //     setIsDeleting(true);
  //     await axios.delete("posts/" + postId);
  //     navigate("/admin/posts");
  //     setIsOpen(false);
  //   } catch (error) {
  //     setIsDeleting(false);
  //     setError(true);
  //   }
  // };

  const triggerDeletePost = (postId: string) => {
    console.log("triggerid", postId);
    if (postId) {
      setIsDeleting(true);
      deletePost(postId);
      // deletePost.mutate(postId);
    }
  };

  return (
    <>
      <MenuItem
        icon={<DeleteIcon />}
        disabled={isDeleting}
        onClick={() => setIsOpen(true)}
      >
        Delete Post {isDeleting && <Spinner />}
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
                onClick={() => triggerDeletePost(postId)}
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

export default DeletePostAction;
