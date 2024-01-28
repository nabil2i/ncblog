import { EditIcon } from "@chakra-ui/icons";
import {
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
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  AuthServerResponse,
  setCredentials,
} from "../../app/features/auth/authSlice";
import { AppDispatch } from "../../app/store";
import User from "../../entities/User";
import useAuth from "../../hooks/useAuth";
import useUpdateUserAccount from "../../hooks/useUpdateUserAccount";
import React from "react";

const EditName = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { firstname, lastname } = useAuth();
  // const navigate = useNavigate();
  // const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateUserAccount = useUpdateUserAccount(
    (data) => {
      // console.log(data);
      dispatch(setCredentials(data as AuthServerResponse));
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
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const onSubmit = (data: FieldValues) => {
    // console.log(data);
    setSubmitting(true);
    updateUserAccount.mutate({
      firstname: data.firstname,
      lastname: data.lastname,
    });
  };

  return (
    <>
      <Button onClick={onOpen} ref={finalRef}>Edit</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Change your name</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  defaultValue={firstname}
                  {...register("firstname", {
                    required: "firstname is required",
                    minLength: {
                      value: 2,
                      message: "firstname must be at least 2 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "firstname must be at most 50 characters.",
                    },
                  })}
                />
              </FormControl>
              <FormErrorMessage>
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  defaultValue={lastname}
                  {...register("lastname", {
                    required: "lastname is required",
                    minLength: {
                      value: 2,
                      message: "lastname must be at least 2 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "lastname must be at most 50 characters.",
                    },
                  })}
                />
              </FormControl>
              <FormErrorMessage>
                {errors.lastname && errors.lastname.message}
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

export default EditName;
