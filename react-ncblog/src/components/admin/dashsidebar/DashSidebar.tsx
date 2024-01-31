import { Flex, useColorMode } from "@chakra-ui/react";
import DashboardNavigation from "./DashboardNavigation";

const DashSidebar = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        direction="column"
        // w="full"
        // position="fixed"
        // maxW="300px"
        // h="full"
        // minH="100vh"
        justify="space-between"
        bg={"#2e3238"}
        color={colorMode === "light" ? "white" : "white"}
      >
        <Flex direction="column" justify="flex-start">
          {/* Logo */}
          {/* <LogoSearch /> */}

          {/* Navitems */}
          <DashboardNavigation />
        </Flex>
      </Flex>
    </>
  );
};

export default DashSidebar;
