import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { authSatus } from "../../app/features/auth/authSlice";
import Footer from "../../components/common/Footer";
import { NavBar } from "../../components/navigationbar";
import usePersist from "../../hooks/usePersist";

const Layout = () => {
  const [setPersist] = usePersist();
  const isAuthenticated = useSelector(authSatus);
  // if (!isAuthenticated) setPersist(false);

  // useEffect(() => {
  //   if (!isAuthenticated) setPersist("false");
  // }, [isAuthenticated, setPersist])

  return (
    <Flex direction="column" minHeight="100vh">
      <NavBar />
      <Box as="main" flex="1" marginTop={{ base: "60px" }} minHeight="100vh">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
