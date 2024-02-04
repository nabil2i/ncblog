import { EditIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ms from "ms";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  AuthServerResponse,
  setCredentials,
} from "../../app/features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import User from "../../entities/User";
import useUpdateUserAccount from "../../hooks/useUpdateUserAccount";

const EditPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const { dispatch } = useAuth();
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateUserAccount = useUpdateUserAccount(
    (data) => {
      dispatch(setCredentials(data as AuthServerResponse));
      // console.log(data);
      // dispatch({ type: "UPDATE_USER_ACCOUNT", updatedUserData: data });
      onClose();
      setSubmitting(false);
      // navigate("/account");
      toast({
        title: "",
        description: "Successfully updated your account",
        duration: ms("5s"),
        isClosable: true,
        status: "success",
        position: "top",
        icon: <EditIcon />,
      });
    },
    (errorMessage) => {
      // console.log(errorMessage);
      setSubmitting(false);
      toast({
        title: "",
        description: "We couldn't update your account" + errorMessage,
        duration: ms("5s"),
        isClosable: true,
        status: "error",
        position: "top",
        icon: <EditIcon />,
      });
    }
  );

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const password = watch("password");
  const password2 = watch("password2");

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const onSubmit = (data: FieldValues) => {
    // console.log(data);
    if (password !== password2) {
      setError("Passwords don't match");
      setSubmitting(false);
      // toast({
      //   title: "",
      //   description: "Passwords don't match",
      //   duration: ms("5s"),
      //   isClosable: true,
      //   status: "error",
      //   position: "top",
      //   icon: <EditIcon />,
      // });
      return;
    }
    setSubmitting(true);
    updateUserAccount.mutate({
      password: data.password,
    });
  };

  return (
    <>
      <Button onClick={onOpen} ref={finalRef}>
        Edit
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Change your password</ModalHeader>
            {error && (
              <Alert mb="15px" mt="10px" status="error">
                <AlertIcon />
                <AlertTitle></AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  defaultValue=""
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be at most 255 characters.",
                    },
                  })}
                />
              </FormControl>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>

              <FormControl mt={4}>
                <FormLabel>Confirm password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  defaultValue=""
                  {...register("password2", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be at most 255 characters.",
                    },
                  })}
                />
              </FormControl>
              <FormErrorMessage>
                {errors.password2 && errors.password2.message}
              </FormErrorMessage>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                type="submit"
                mr={3}
                disabled={isSubmitting}
              >
                Save {isSubmitting && <Spinner />}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPassword;
