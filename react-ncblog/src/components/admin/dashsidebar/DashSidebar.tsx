import { Flex, useColorMode } from "@chakra-ui/react";
import DashboardNavigation from "./DashboardNavigation";

const DashSidebar = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        direction="column"
        // w="full"
        position="sticky"
        w="250px"
        maxW="250px"
        h="full"
        minH="100vh"
        justify="space-between"
        // bg={"gray.200"}
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
