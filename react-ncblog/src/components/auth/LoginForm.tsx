import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/features/auth/authApiSlice";
import {
  AuthErrorResponse,
  setCredentials,
} from "../../app/features/auth/authSlice";
import { LoginData } from "../../entities/User";
import usePersist from "../../hooks/usePersist";

const VARIANT_COLOR = "teal";

const LoginForm = () => {
  // const toast = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [persist, setPersist] = usePersist();

  const togglePersist = () => setPersist((prev: boolean) => !prev);

  // useEffect(() => {
  //   if (isError) {
  //     toast({
  //       title: "",
  //       description: error,
  //       duration: 5000, // 5s
  //       isClosable: true,
  //       status: "error",
  //       position: "top",
  //       icon: <LockIcon />,
  //     });
  //   }
  // }, [error, isError, toast])
  // const { dispatch } = useAuth();
  // const login = useLogin(
  //   (userData) => {
  //     reset();
  //     // console.log(user);
  //     dispatch({ type: "LOGIN", userData: userData });
  //     navigate("/");
  //   },
  //   () => {
  //     toast({
  //       title: "",
  //       description: "Successfully logged in.",
  //       duration: 5000, // 5s
  //       isClosable: true,
  //       status: "success",
  //       position: "top",
  //       icon: <LockIcon />,
  //     });
  //   },
  //   (errorMessage) => {
  //     // console.log(errorMessage);
  //     toast({
  //       title: "",
  //       description: errorMessage,
  //       duration: 5000, // 5s
  //       isClosable: true,
  //       status: "error",
  //       position: "top",
  //       icon: <LockIcon />,
  //     });
  //   }
  // );

  const {
    handleSubmit,
    register,
    reset,
    formState: {
      errors,
      // isSubmitting, isValid
    },
  } = useForm<LoginData>();

  const onSubmit = async (data: FieldValues) => {
    // console.log(`"Form fields": ${data}`);
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      }).unwrap();
      // console.log("response:", response)
      dispatch(setCredentials(response));
      reset();
      navigate("/");
    } catch (error) {
      const err = error as AuthErrorResponse;
      // console.log("error", error);
      setError(err.data.error.message);
    }

    // login.mutate({
    //   // _id: id,
    //   username: data.username,
    //   password: data.password,
    // });
  };

  return (
    <Box p={4} my={8} textAlign="center">
      {error && (
        <Alert mb="15px" mt="10px" status="error">
          <AlertIcon />
          <AlertTitle></AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Center>
        <Heading as="h2">Log in</Heading>
      </Center>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={errors.username ? true : false}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            focusBorderColor="teal.500"
            placeholder="Enter your username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username must be at least 5 characters.",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters.",
              },
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors.password ? true : false}
          mt={4}
        >
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            focusBorderColor="teal.500"
            placeholder="Enter your password"
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
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <HStack justifyContent="space-between" mt={4}>
          <Box>
            <Checkbox
              border={1}
              colorScheme={VARIANT_COLOR}
              borderColor="teal"
              onChange={togglePersist}
              checked={persist}
            >
              Remember me
            </Checkbox>
          </Box>
          {/* <Box color={`${VARIANT_COLOR}.500`}>
            <NavLink
              to="/"
              color={`${VARIANT_COLOR}.500`}
              // color={useColorModeValue("green.200", "green.100")}
            >
              {" "}
              Forgot your password?
            </NavLink>
          </Box> */}
        </HStack>

        <Button
          width="full"
          mt={4}
          type="submit"
          // disabled={login.isLoading}
          disabled={isLoading}
          colorScheme={VARIANT_COLOR}
        >
          {isLoading ? "Logging in" : "Log in"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
