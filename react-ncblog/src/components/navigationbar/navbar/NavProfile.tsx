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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
// import useAuth from "./navigationbar/useAuth";

// interface Props {
//   children: React.ReactNode;
// }

const Profile = () => {
  // const [state, dispatch] = useReducer(authReducer, {});
  // const { state, dispatch} = useContext(AuthContext);
  // const { state, dispatch } = useAuth();
  const { state, dispatch } = useAuth();
  // console.log(state)

  const navigate = useNavigate();

  if (state.isAuthenticated)
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
                <p>{state.user?.username}</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem onClick={() => navigate("/blog/write")}>
                Create a post
              </MenuItem>
              <MenuItem onClick={() => navigate("/myposts")}>My Posts</MenuItem>
              <MenuItem onClick={() => navigate("/account")}>Account</MenuItem>
              <MenuItem onClick={() => dispatch({ type: "LOGOUT" })}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </>
    );
};


// const NavLink = (props: Props) => {
//   const { children } = props;

//   return (
//     <Box
//       as="a"
//       px={2}
//       py={1}
//       rounded={"md"}
//       _hover={{
//         textDecoration: "none",
//         bg: useColorModeValue("gray.200", "gray.700"),
//       }}
//       href={"#"}
//     >
//       {children}
//     </Box>
//   );
// };

export default Profile;
