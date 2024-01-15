import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import useAuth from "../useAuth";
// import useAuth from "./navigationbar/useAuth";

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

const Profile = () => {
  // const [userData, dispatch] = useReducer(authReducer, {});
  // const { userData, dispatch} = useContext(AuthContext);
  // const { userData, dispatch } = useAuth();
  const { userData, dispatch } = useAuth();
  // console.log(userData)

  if (userData.isAuthenticated)
    return (
      <>
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
              <Icon
                as={ChevronDownIcon}
                // transition={"all .25s ease-in-out"}
                // transform={isOpen ? "rotate(180deg)" : ""}
                // w={3}
                // h={3}
              />
            </MenuButton>
            <MenuList alignItems={"center"}>
              <br />
              <Center>
                <Avatar
                  size={"xl"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </Center>
              <br />
              <Center>
                <p>{userData.username}</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>Your Servers</MenuItem>
              <MenuItem>Account Settings</MenuItem>
              <MenuItem onClick={() => dispatch({ type: "LOGOUT" })}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </>
    );
};

export default Profile;
