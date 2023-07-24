import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import AdminNavBar from "../../components/admincomponentss/AdminNavBar";
import AdminSideBar from "../../components/admincomponentss/AdminSideBar";

const AdminErrorPage = () => {
  const error = useRouteError();
  return(
    <>
    <Grid
        templateColumns="repeat(6, 1fr)"
        // bg="gray.50"
      >
        <GridItem as="aside"
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          backgroundColor="purple.600"
          minHeight="100vh"
          p="30px"
          >
          <AdminSideBar/>
        </GridItem>

        <GridItem
          as="main"
          colSpan={{ base: 6, lg: 4, xl: 5 }}
          py="10px"
          px="40px"
        >
          <AdminNavBar />
          <Box padding={5}>
            <Heading>Oops</Heading>
            <Text>
              {isRouteErrorResponse(error)
                ? "This page does not exist."
                : "An unexpected error occurred."}
            </Text>
          </Box>
        </GridItem>
      </Grid>
  </>
);
};

export default AdminErrorPage;
