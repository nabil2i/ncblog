import { Box, Text, Button, Center, Checkbox, FormControl, FormLabel, HStack, Heading, Input, Spacer, useToast, FormErrorMessage, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useCreateUser from '../hooks/useCreateUser';
import { FieldValues, useForm } from 'react-hook-form';

const VARIANT_COLOR = "teal";

export interface FormData {
  username: string;
  email: string;
  password: string;
  password2: string
}


const SignUpForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const createUser = useCreateUser(
    (user) => {
    reset();
    // console.log(user);
    navigate('/');
  },
  () => {
    toast({
      title: "Sign up",
      description: "Successfully created an account.",
      // description: `${data}`,
      duration: 5000, // 5s
      isClosable: true,
      status: "success",
      position: "top",
      // icon: <EditIcon />,
    })}
  ,
  (errorMessage) => {
    // console.log(errorMessage);
    toast({
      title: "Sign up",
      // description: "An error occured while creating an account.",
      description: errorMessage,
      duration: 5000, // 5s
      isClosable: true,
      status: "error",
      position: "top",
      // icon: <EditIcon />,
    });
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  // } = useForm();
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => {
    // console.log(data);
    createUser.mutate({
      // _id: id,
      username: data.username,
      email: data.email,
      password: data.password,
      password2: data.password2
    });
  };

  return (
    <Box p={4} my={8} textAlign='center'>
      {/* {createUser.error && (
       <Alert mb="15px" mt="10px" status="error">
            <AlertIcon />
            <AlertTitle>{createUser.error.name}</AlertTitle>
            <AlertDescription>{createUser.error.message}</AlertDescription>
          </Alert>
        )} */}
      <Center>
        <Heading>Sign up</Heading>
        {/* <Text>
              Or <NavLink to="/sign-up"> Sign up</NavLink>
            </Text> */}
      </Center>

      
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isRequired
          isInvalid={errors.username ? true: false}
          >
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input type="text" placeholder='Enter your username'
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
            })}/>
            <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors.email ? true: false}
          mt={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" placeholder='Enter your email address'
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
          })}/>
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors.password ? true: false}
          mt={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input type="password" placeholder='Enter your password'
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
          })}/>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={errors.password2 ? true: false}
          mt={4}>
          <FormLabel htmlFor="password2">Confirm Password</FormLabel>
          <Input type="password" placeholder='Confirm your password'
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
            })}/>
            <FormErrorMessage>
            {errors.password2 && errors.password2.message}
          </FormErrorMessage>
        </FormControl>

        <HStack justifyContent="space-between" mt={4}>
          <Spacer/>
          {/* <Box>
            <Checkbox border={1} colorScheme={VARIANT_COLOR} borderColor="teal">Remember me</Checkbox>
          </Box> */}
          <HStack>
            <Box>
                Already have an account?
            </Box>
            <Box color={`${VARIANT_COLOR}.500`}>
              <NavLink
                to="/login"
                // color={useColorModeValue("green.200", "green.100")}
                >    Sign in.</NavLink>
            </Box>
          </HStack>
        </HStack>

        <Button width="full" mt={4} type="submit"
          colorScheme={VARIANT_COLOR}
        >Sign up</Button>
      </form>
    </Box>
  )
}

export default SignUpForm