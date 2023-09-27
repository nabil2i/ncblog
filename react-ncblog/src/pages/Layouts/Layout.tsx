import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AuthProvider, NavBar } from "../../components/navigationbar";
import Footer from "../../components/Footer";

const Layout = () => {

  return (
    <AuthProvider>
      <NavBar />
      <Box padding={5} marginTop={12}>
        <Outlet />
      </Box>
      <Footer />
    </AuthProvider>
  );
};

export default Layout;
