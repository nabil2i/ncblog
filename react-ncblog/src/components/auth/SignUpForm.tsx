import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import useCreateUser from "../../hooks/useCreateUser";
import useAuth from "../navigationbar/useAuth";

const VARIANT_COLOR = "teal";

export interface FormData {
  username: string;
  email: string;
  password: string;
  password2: string;
  firstname: string;
  lastname: string;
}

const SignUpForm = () => {
  const { dispatch } = useAuth();
  // const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const createUser = useCreateUser(
    (userData) => {
      reset();
      // console.log(user);
      dispatch({ type: "LOGIN", userData: userData });
      navigate("/");
    },
    () => {
      toast({
        title: "Sign up",
        description: "Successfully created an account.",
        duration: 5000, // 5s
        isClosable: true,
        status: "success",
        position: "top",
        // icon: <EditIcon />,
      });
    },
    (errorMessage) => {
      // console.log(errorMessage);
      toast({
        title: "Sign up",
        description: errorMessage,
        duration: 5000, // 5s
        isClosable: true,
        status: "error",
        position: "top",
        // icon: <EditIcon />,
      });
    }
  );

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
    // } = useForm();
  } = useForm<FormData>();

  const password = watch("password");
  const password2 = watch("password2");

  const onSubmit = (data: FieldValues) => {
    // console.log(data);
    // if (data.password !== data.password2) {
    //   setError("Passwords do not match");
    //   return;
    // }

    createUser.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
      password2: data.password2,
      firstname: data.firstname,
      lastname: data.lastname,
    });
  };

  return (
    <Box p={4} my={8} textAlign="center">
      {/* {error && (
        <Alert mb="15px" mt="10px" status="error">
          <AlertIcon />
          <AlertTitle></AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}
      <Center>
        <Heading as="h2">Sign up</Heading>
      </Center>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired isInvalid={errors.username ? true : false}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
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

        <FormControl isRequired isInvalid={errors.email ? true : false} mt={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              minLength: {
                value: 8,
                message: "Email must be at least 8 characters.",
              },
              maxLength: {
                value: 255,
                message: "Email must be at most 255 characters.",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors.firstname ? true : false}
          mt={4}
        >
          <FormLabel htmlFor="firstname">Firstname</FormLabel>
          <Input
            type="text"
            placeholder="Enter your firstname"
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
          <FormErrorMessage>
            {errors.firstname && errors.firstname.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors.lastname ? true : false}
          mt={4}
        >
          <FormLabel htmlFor="lastname">Lastname</FormLabel>
          <Input
            type="text"
            placeholder="Enter your lastname"
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
          <FormErrorMessage>
            {errors.lastname && errors.lastname.message}
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

        <FormControl
          isRequired
          isInvalid={errors.password2 ? true : false}
          mt={4}
        >
          <FormLabel htmlFor="password2">Confirm Password</FormLabel>
          <Input
            type="password"
            placeholder="Confirm your password"
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
          <FormErrorMessage>
            {errors.password2 && errors.password2.message}
          </FormErrorMessage>
        </FormControl>

        <HStack justifyContent="space-between" mt={4}>
          <Spacer />
          {/* <Box>
            <Checkbox border={1} colorScheme={VARIANT_COLOR} borderColor="teal">Remember me</Checkbox>
          </Box> */}
          <HStack>
            <Box>Already have an account?</Box>
            <Box color={`${VARIANT_COLOR}.500`}>
              <NavLink
                to="/login"
                // color={useColorModeValue("green.200", "green.100")}
              >
                {" "}
                Sign in.
              </NavLink>
            </Box>
          </HStack>
        </HStack>

        <Button width="full" mt={4} type="submit" colorScheme={VARIANT_COLOR}>
          Sign up
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
