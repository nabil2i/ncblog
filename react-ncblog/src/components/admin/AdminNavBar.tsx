import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import ColorModeSwitch from "../navigationbar/navbar/ColorModeSwitch";
import useAdminLayout from "./useAdminLayout";

const AdminNavBar = () => {
  const { dispatch } = useAdminLayout();

  return (
    <>
      <Flex
        as="nav"
        justify="space-between"
        align="center"
        w="full"
        pr={4}
        // backgroundColor={useColorModeValue(
        //   "rgba(255, 255, 255, 1)",
        //   "rgba(0, 0, 0, 1)"
        // )}
        bg="teal"
      >
        <IconButton
          background="none"
          _hover={{ backgroundg: "none" }}
          icon={<FiMenu />}
          onClick={() => dispatch({ type: "TOGGLE_MOBILE_SIDEBAR" })}
          aria-label={""}
          display={{ base: "flex", lg: "none" }}
          color="white"
        />
        <IconButton
          background="none"
          _hover={{ backgroundg: "none" }}
          icon={<FiMenu />}
          onClick={() => dispatch({ type: "CHANGE_NAVSIZE" })}
          aria-label={""}
          color="white"
          display={{ base: "none", lg: "flex" }}
        />

        <Flex align="center" justify="center">
          <Heading as="h1" fontSize={22} color="white">
            Nabil Conveys Administration
          </Heading>
        </Flex>

        <Flex>
          {/* <Avatar size="sm" /> */}
          <ColorModeSwitch />
        </Flex>
      </Flex>
    </>
  );
};

export default AdminNavBar;
