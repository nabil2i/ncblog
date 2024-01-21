import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import ColorModeSwitch from "../navigationbar/navbar/ColorModeSwitch";

interface Props {
  changeNavSize: () => void;
  toggleMobileSidebar: () => void;
}
const AdminNavBar = ({ changeNavSize, toggleMobileSidebar }: Props) => {
  // const toast = useToast();

  // const showToast = () => {
  //   toast({
  //     title: "Logged out",
  //     description: "Successfully logged out.",
  //     duration: 3000, // 5s
  //     isClosable: true,
  //     status: "success",
  //     position: "top",
  //     icon: <UnlockIcon />,
  //   });
  // };

  return (
    <>
      <Flex
        as="nav"
        justify="space-between"
        align="center"
        w="full"
        minH="60px"
        pr={4}
        // backgroundColor={useColorModeValue(
        //   "rgba(255, 255, 255, 1)",
        //   "rgba(0, 0, 0, 1)"
        // )}
        bg="teal"

        // position="fixed"
        //     top="0"
        //     left="0"
        //     zIndex="1"
      >
        <IconButton
          background="none"
          _hover={{ backgroundg: "none" }}
          icon={<FiMenu />}
          onClick={toggleMobileSidebar}
          aria-label={""}
          display={{ base: "flex", lg: "none" }}
          color="white"
        />
        <IconButton
          background="none"
          _hover={{ backgroundg: "none" }}
          icon={<FiMenu />}
          onClick={changeNavSize}
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
