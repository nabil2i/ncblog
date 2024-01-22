import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import { AuthProvider, NavBar } from "../../components/navigationbar";

const Layout = () => {
  return (
    <AuthProvider>
      <Flex direction="column" minHeight="100vh">
        <NavBar />
        <Box flex="1" marginTop={{ base: "60px" }}>
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </AuthProvider>
  );
};

export default Layout;
