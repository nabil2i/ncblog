import { Box, Text, Center, Flex, FormControl, FormLabel, Heading, Input, VStack, Stack, Checkbox, Button, HStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const VARIANT_COLOR = "teal";

const LoginForm = () => {
  return (

    <Box p={4} my={8} textAlign='center'>
      <Center>
        <Heading>Log in</Heading>
        {/* <Text>
              Or <NavLink to="/sign-up"> Sign up</NavLink>
            </Text> */}
      </Center>


      <form>
        <FormControl
          isRequired>
          <FormLabel>
            Username
          </FormLabel>
          <Input type="text" placeholder='Enter your username' />
        </FormControl>

        <FormControl
          isRequired
          mt={4}>
          <FormLabel>
            Password
          </FormLabel>
          <Input type="password" placeholder='Enter your password' />
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

        <Button width="full" mt={4}
          colorScheme={VARIANT_COLOR}
        >Log in</Button>
      </form>
    </Box>
  );
}

export default LoginForm