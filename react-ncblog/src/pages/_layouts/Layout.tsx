import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import ScrollToTop from "../../components/common/ScrollToTop";
import { NavBar } from "../../components/navbar";

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

  return (
    <ScrollToTop>
      <Flex direction="column">
        <NavBar />
        <Box as="main" flex="1" marginTop={{ base: "60px" }} minHeight="100vh">
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </ScrollToTop>
  );
};

export default Layout;
