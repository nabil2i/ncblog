import { LockIcon } from '@chakra-ui/icons';
import { Box, Text, Center, Flex, FormControl, FormLabel, Heading, Input, VStack, Stack, Checkbox, Button, HStack, useColorModeValue, useToast, FormErrorMessage, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin';
import { FieldValues, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

const VARIANT_COLOR = "teal";
export interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { dispatch } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const login = useLogin(
    (userData) => {
    reset();
    // const token = userData.token;
    // sessionStorage.setItem('token', JSON.stringify(tokenObj));
    // localStorage.setItem('userData', JSON.stringify(userData));
    // console.log(userData);
    // console.log(token);
    dispatch({ type: 'LOGIN', userData: userData});
    navigate('/');
  },
  () => {
    toast({
      title: "Log in",
      description: "Successfully logged in.",
      duration: 5000, // 5s
      isClosable: true,
      status: "success",
      position: "top",
      icon: <LockIcon />,
    })}
  ,
  (errorMessage) => {
    // console.log(errorMessage);
    toast({
      title: "Log in",
      description: errorMessage,
      duration: 5000, // 5s
      isClosable: true,
      status: "error",
      position: "top",
      icon: <LockIcon />,
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
    console.log(`"Form fields": ${data}`);
    login.mutate({
      // _id: id,
      username: data.username,
      password: data.password,

    });
  };
  
  return (

    <Box p={4} my={8} textAlign='center'>
       {/* {login.error && (
       <Alert mb="15px" mt="10px" status="error">
            <AlertIcon />
            <AlertTitle></AlertTitle>
            <AlertDescription>{login.error.response?.data  as string}</AlertDescription>
          </Alert>
        )} */}
      <Center>
        <Heading>Log in</Heading>
        {/* <Text>
              Or <NavLink to="/sign-up"> Sign up</NavLink>
            </Text> */}
      </Center>


      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isRequired
          isInvalid={errors.username ? true: false}>
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

        <HStack justifyContent="space-between" mt={4}>
          <Box>
            <Checkbox border={1} colorScheme={VARIANT_COLOR} borderColor="teal">Remember me</Checkbox>
          </Box>
          <Box color={`${VARIANT_COLOR}.500`}>
            <NavLink
              to="/"
              color={`${VARIANT_COLOR}.500`}
              // color={useColorModeValue("green.200", "green.100")}
            > Forgot your password?</NavLink>
          </Box>
        </HStack>

        <Button width="full" mt={4} type="submit" disabled={login.isLoading}
          colorScheme={VARIANT_COLOR}
        >{login.isLoading ? 'Logging in' : 'Log in'}</Button>
      </form>
    </Box>
  );
}

export default LoginForm