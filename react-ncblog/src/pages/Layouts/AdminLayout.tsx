import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../AuthProvider";
import AdminNavBar from "../../components/admincomponentss/AdminNavBar";
import AdminSideBar from "../../components/admincomponentss/AdminSideBar";

const AdminLayout = () => {
  // const [userData, dispatch] = useReducer(authReducer, {});

  return (
    <AuthProvider>
      <Grid
        templateColumns="repeat(6, 1fr)"
        // bg="gray.50"
      >
        <GridItem
          as="aside"
          colSpan={{ base: 6, lg: 2, xl: 1 }}
          backgroundColor="purple.600"
          minHeight="100vh"
          p="30px"
        >
          <AdminSideBar />
        </GridItem>

        <GridItem
          as="main"
          colSpan={{ base: 6, lg: 4, xl: 5 }}
          py="10px"
          px="40px"
        >
          <AdminNavBar />
          <Outlet />
        </GridItem>
      </Grid>
    </AuthProvider>
  );
};

export default AdminLayout;
