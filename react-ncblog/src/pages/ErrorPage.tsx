import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Footer from "../components/common/Footer";
import { AuthProvider, NavBar } from "../components/navigationbar";
// import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <AuthProvider>
        <Flex direction="column" minHeight="100vh">
          <NavBar />
          <Box
            as="main"
            minHeight="100vh"
            px="80px"
            marginTop={{ base: "150px", md: "70px" }}
            flex="1"
          >
            <Heading>Oops</Heading>
            <Text>
              {isRouteErrorResponse(error)
                ? "This page does not exist."
                : "An unexpected error occurred."}
            </Text>
          </Box>
          <Footer />
        </Flex>
      </AuthProvider>
    </>
  );
};

export default ErrorPage;
