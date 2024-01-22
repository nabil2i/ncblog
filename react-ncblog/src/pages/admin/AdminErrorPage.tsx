import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import AdminNavBar from "../../components/admin/AdminNavBar";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import { AuthProvider } from "../../components/navigationbar";
// import AdminSideBar from "../../components/admin/AdminSideBar";

const AdminErrorPage = () => {
  const [navSize, setNavSize] = useState("large");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleMobileSidebar = () => {
    setNavSize("large");
    setShowMobileSidebar((prev) => (prev === true ? false : true));
  };

  const changeNavSize = () => {
    setShowMobileSidebar(false);
    setNavSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

  const error = useRouteError();
  return (
    <>
      <AuthProvider>
        <Box position="relative">
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
          >
            <AdminNavBar
              changeNavSize={changeNavSize}
              toggleMobileSidebar={toggleMobileSidebar}
            />
          </Flex>

          <Flex>
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
            >
              <Box display={{ base: "none", lg: "flex" }}>
                <Sidebar navSize={navSize} />
              </Box>

              {showMobileSidebar && (
                <Box
                  display={{ base: "flex", lg: "none" }}
                  transition="ease-in-out .2s"
                >
                  <Sidebar
                    navSize={navSize}
                    toggleMobileSidebar={toggleMobileSidebar}
                  />
                </Box>
              )}
            </Flex>

            <Box>
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
        </Box>
      </AuthProvider>
    </>
  );
};

export default AdminErrorPage;
