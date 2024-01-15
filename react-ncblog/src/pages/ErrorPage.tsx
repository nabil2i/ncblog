import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { NavBar } from "../components/navigationbar";
// import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar/>
      <Box px="80px" marginTop={{ base: "150px", md: "70px"}}>
        <Heading>Oops</Heading>
        <Text>{ isRouteErrorResponse(error) ? 'This page does not exist.' : 'An unexpected error occurred.'}</Text>
      </Box>
    </>
  );
};

export default ErrorPage;
