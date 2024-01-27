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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../useAuth";
import { useSendLogoutMutation } from "../../../app/features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { authSatus } from "../../../app/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
// import useAuth from "./navigationbar/useAuth";

// interface Props {
//   children: React.ReactNode;
// }

const Profile = () => {
  // const [state, dispatch] = useReducer(authReducer, {});
  // const { state, dispatch} = useContext(AuthContext);
  // const { state, dispatch } = useAuth();
  // const { state, dispatch } = useAuth();
  // console.log(state)
  const toast = useToast();
  const isAuthenticated = useSelector(authSatus);
  const dispatch = useDispatch();
  const [sendLogout, {isError, isLoading, isSuccess, error}] = useSendLogoutMutation()
  const { isAdmin, isEditor, firstname, lastname} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login')
    }
  }, [isSuccess, navigate])

  if (isLoading) {
    return <Box m={10}><Spinner /> {" "} Login out</Box>
  }

  if (isError) {
    // toast({
    //   title: "Log in",
    //   description: error?.data?.message,
    //   duration: 5000, // 5s
    //   isClosable: true,
    //   status: "error",
    //   position: "top",
    // });
    return <p>error.data.message</p>
  }


  if (isAuthenticated)
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
                src={"https://api.dicebear.com/7.x/bottts/png"}
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
                  src={"https://api.dicebear.com/7.x/bottts/png"}
                />
              </Center>
              <br />
              <Center>
                <p>{firstname + " " + lastname}</p>
              </Center>
              <br />
              <MenuDivider />
              {(isAdmin || isEditor) &&( 
                <>
                  <MenuItem onClick={() => navigate("/blog/write")}>
                    Create a post
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/myposts")}>
                    My Posts
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={() => navigate("/account")}>Account</MenuItem>
              {isAdmin && 
                <>
                  <MenuItem onClick={() => navigate("/admin")}>
                    Admin Section
                  </MenuItem>
                </>
              }
              <MenuItem onClick={() => sendLogout(0)}>
                Logout
              </MenuItem>
              {/* <MenuItem onClick={() => dispatch({ type: "LOGOUT" })}>
                Logout
              </MenuItem> */}
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
