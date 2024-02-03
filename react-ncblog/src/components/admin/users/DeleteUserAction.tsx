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
import { useDeleteUserMutation } from "../../../app/features/users/usersApiSlice";

const DeleteUserAction = ({ userId }: { userId: string }) => {
  // console.log(userId)
  const navigate = useNavigate();
  // const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef<null | HTMLButtonElement>(null);
  const toast = useToast();

  const onClose = () => {
    setIsOpen(false);
  };

  const [deleteUser, { isError, isSuccess }] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard?tab=users");
      setIsDeleting(false);
      setIsOpen(false);
      toast({
        title: "",
        description: "User deleted successfully",
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
        description: "Could  not delete the user",
        duration: 5000, // 5s
        isClosable: true,
        status: "error",
        position: "top",
        icon: <DeleteIcon />,
      });
    }
  }, [isError, isSuccess, navigate, toast]);

  const triggerDeleteUser = (userId: string) => {
    console.log("triggerid", userId);
    if (userId) {
      setIsDeleting(true);
      deleteUser(userId);
    }
  };

  return (
    <>
      <MenuItem
        icon={<DeleteIcon />}
        disabled={isDeleting}
        onClick={() => setIsOpen(true)}
      >
        Delete User {isDeleting && <Spinner />}
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
              Are you sure you want to delete this user? This action cannot be
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
                onClick={() => triggerDeleteUser(userId)}
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

            <AlertDialogBody>The user could not be deleted.</AlertDialogBody>

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

export default DeleteUserAction;
