import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import useAdminLayout from "../../components/admin/useAdminLayout";

const AdminErrorPage = () => {
  const { state } = useAdminLayout();
  const { navSize, showMobileSidebar } = state;
  const error = useRouteError();

  // const [navSize, setNavSize] = useState("large");
  // const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // const toggleMobileSidebar = () => {
  //   setNavSize("large");
  //   setShowMobileSidebar((prev) => (prev === true ? false : true));
  // };

  // const changeNavSize = () => {
  //   setShowMobileSidebar(false);
  //   setNavSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  // };

  // console.log("navSize: ", navSize);
  // console.log("showMobileSidebar: ", showMobileSidebar);

  return (
    <Box
      position="relative"
      w="100%"
      h="100vh"
      // bg="blue"
    >
      <Flex
        as="header"
        position="fixed"
        top="0"
        left={{
          base: 0,
          lg: navSize === "small" ? "55px" : "250px",
        }}
        right="0"
        zIndex="100"
        transition="ease-in-out .2s"
        h="60px"
      >
        <AdminNavBar
        // changeNavSize={changeNavSize}
        // toggleMobileSidebar={toggleMobileSidebar}
        />
      </Flex>

      <Flex w="full">
        {/* START SIDEBAR */}
        <Flex
          as="aside"
          direction="column"
          h="full"
          w={{
            lg:
              navSize === "large"
                ? "250px"
                : navSize === "small"
                ? "55px"
                : "full",
          }}
          transition="ease-in-out .2s"
          position="fixed"
          top="0"
          left="0"
          zIndex="900"
          // bg="red"
        >
          <Box display={{ base: "none", lg: "flex" }}>
            <Sidebar
            // navSize={navSize}
            // toggleMobileSidebar={toggleMobileSidebar}
            />
          </Box>

          {showMobileSidebar && (
            <Box
              display={{ base: "flex", lg: "none" }}
              transition="ease-in-out .2s"
            >
              <Sidebar
              // navSize={navSize}
              // toggleMobileSidebar={toggleMobileSidebar}
              />
            </Box>
          )}
        </Flex>
        {/* END SIDEBAR */}

        {/* START MAIN */}
        <Flex
          // ml={{ base: "55px" }}
          // bg="green"
          w="full"
          maxW={{
            lg:
              navSize === "large"
                ? "calc(100vw - 250px)"
                : navSize === "small"
                ? "calc(100vw - 55px)"
                : "full",
          }}
          ml={{
            lg:
              navSize === "large"
                ? "250px"
                : navSize === "small"
                ? "55px"
                : "0",
          }}
          h="calc(100vh - 60px)"
          mt="60px"
        >
          {/* <Box w="full" h="full" p={10}>
              <Outlet />
            </Box> */}
          <Box
            w="full"
            mx="auto"
            // maxW="1440px"
            // p={4}
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
        {/* START MAIN */}
      </Flex>
    </Box>
  );
};


export default AdminErrorPage;
