import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../../app/features/auth/authApiSlice";
import useAuth from "../../../hooks/useAuth";
import LogoSearch from "../../common/LogoSearch";
import AvatarBox from "./AvatarBox";
import Navigation from "./Navigation";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const { firstname, lastname } = useAuth();
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return (
      <Box m={10}>
        <Spinner /> Login out
      </Box>
    );
  }

  return (
    <>
      <Flex
        direction="column"
        w="full"
        h="full"
        minH="100vh"
        justify="space-between"
        bg={"#2e3238"}
        color={colorMode === "light" ? "white" : "white"}
      >
        <Flex direction="column" justify="flex-start">
          {/* Logo */}
          <LogoSearch />

          {/* Navitems */}
          <Navigation />
        </Flex>

        {/* Menu Avatar */}
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            _hover={{ textDecoration: "none" }}
            minW={0}
          >
            <AvatarBox />
          </MenuButton>
          <MenuList
            alignItems={"center"}
            color={colorMode === "light" ? "black" : "white"}
          >
            <br />
            <Center>
              <Avatar
                size={"xl"}
                src={"https://api.dicebear.com/7.x/bottts/png"}
              />
            </Center>
            <br />
            <Center>
              <p>{firstname + " " + lastname}</p>
            </Center>
            <br />
            <MenuItem onClick={() => navigate("/")}>Go to main blog</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => sendLogout(0)}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default Sidebar;
