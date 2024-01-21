import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button, Box,
  Flex,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteUserAccount from "../../hooks/useDeleteUserAccount";
import useAuth from "../navigationbar/useAuth";
import ms from "ms";
import User from "../../entities/User";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelRef = useRef<null | HTMLButtonElement>(null);
  const { state, dispatch } = useAuth();
  const toast = useToast();

  const onClose = () => {
    setIsOpen(false);
  };

  const deleteAccount = useDeleteUserAccount(
    () => {
      dispatch({type: "LOGOUT"});
      setIsOpen(false);
      navigate("/signup");
    },
    () => {
      toast({
        title: "",
        description: "Account deleted",
        duration: ms("5s"),
        isClosable: true,
        status: "success",
        position: "top",
      });
    },
    (errorMessage) => {
      setIsDeleting(false);
      setError(true);
      toast({
        title: "",
        description: "This account could not be deleted. " + errorMessage,
        duration: ms("5s"),
        isClosable: true,
        status: "error",
        position: "top",
      });
    },
  );


  const triggerDeleteAccount = () => {
      setIsDeleting(true);
      deleteAccount.mutate("");
  };

  return (
    <>
      <Box>
        <Button
          colorScheme="red"
          disabled={isDeleting}
          onClick={() => setIsOpen(true)}
        >
          Delete Post {isDeleting && <Spinner />}
        </Button>
      </Box>

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
              Are you sure you want to delete your account? This action cannot be
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
                onClick={() => triggerDeleteAccount()}
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

            <AlertDialogBody>The account could not be deleted.</AlertDialogBody>

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

export default DeleteAccount;
