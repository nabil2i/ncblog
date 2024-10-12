import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import ScrollToTop from "../../components/common/ScrollToTop";
import { NavBar } from "../../components/navbar";
import { useSelector } from "react-redux";
import { authSatus } from "../../app/features/auth/authSlice";
import Notification from "../../components/common/Notification";

const Layout = () => {
  // const { state, dispatch } = useAdminLayout();
  // const onClose = state.onCloseMain;
  // const isOpen = state.isOpen;
  // const [setPersist] = usePersist();
  // const isAuthenticated = useSelector(authSatus);
  // if (!isAuthenticated) setPersist(false);

  // useEffect(() => {
  //   if (!isAuthenticated) setPersist("false");
  // }, [isAuthenticated, setPersist])
  const isAuthenticated = useSelector(authSatus);
  const marginTopValue = {
    base: isAuthenticated ? "60px" : "120px",
    lg: "60px"
  };

  return (
    <ScrollToTop>
      <Notification />
      <Flex direction="column">
        <NavBar />
        <Box as="main" flex="1" marginTop={marginTopValue} minHeight="100vh" overflowY="auto">
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </ScrollToTop>
  );
};

export default Layout;
