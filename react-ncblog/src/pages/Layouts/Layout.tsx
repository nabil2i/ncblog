import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AuthProvider, NavBar } from "../../components/navigationbar";

const Layout = () => {

  return (
    <AuthProvider>
      <NavBar />
      <Box padding={5} marginTop={12}>
        <Outlet />
      </Box>
    </AuthProvider>
  );
};

export default Layout;
