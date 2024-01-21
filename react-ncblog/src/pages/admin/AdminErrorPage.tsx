import { Box, Flex, Grid, GridItem, Heading, Show, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar";
import { useState } from "react";
import { AuthProvider } from "../../components/navigationbar";
import Sidebar from "../../components/admin/sidebar/Sidebar";
// import AdminSideBar from "../../components/admin/AdminSideBar";

const AdminErrorPage = () => {
  const [navSize, setNavSize] = useState("large");

  const changeNavSize = () => {
    if (navSize === "small") setNavSize("large");
    else setNavSize("small");
  };
  
  const error = useRouteError();
  return (
    <>
    <AuthProvider>
      <Box position="relative">
        <Flex
          as="header"
          justify="flex-end"
          // p="4"
          position="fixed"
          top="0"
          left={navSize === "small" ? "55px" : "250px"}
          right="0"
          zIndex="100"
          bg="white"
          transition="ease-in-out .2s"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <AdminNavBar changeNavSize={changeNavSize} />
        </Flex>

        <Flex>
          <Show above="lg">
            <Flex
              as="aside"
              direction="column"
              h="full"
              w={navSize === "large" ? "250px" : "55px"}
              bg="white"
              justify="space-between"
              transition="ease-in-out .2s"
              position="fixed"
              top="0"
              left="0"
              zIndex="90"
              boxShadow="2px 0 4px rgba(0, 0, 0, 0.1)"
            >
              <Sidebar navSize={navSize} />
            </Flex>
          </Show>

          <Flex
            direction="column"
            w="full"
            h="full"
            ml={navSize === "small" ? "55px" : "250px"}
          >
            <Box
              pt={20}
              px={10}
              w="full"
              minH="100vh"
              overflowY="auto"
              bg="gray.100"
            >
              <Box padding={5}>
              <Heading>Oops</Heading>
              <Text>
                {isRouteErrorResponse(error)
                  ? "This page does not exist."
                  : "An unexpected error occurred."}
              </Text>
            </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </AuthProvider>  
    </>
  );
};

export default AdminErrorPage;
