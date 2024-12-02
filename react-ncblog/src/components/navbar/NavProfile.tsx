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
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import useAuth from "../useAuth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSendLogoutMutation } from "../../app/features/auth/authApiSlice";
import {
  AuthErrorResponse,
  authSatus,
} from "../../app/features/auth/authSlice";
import useAuth from "../../hooks/useAuth";
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
  // const dispatch = useDispatch();
  const [sendLogout, { isError, isSuccess, error: logoutError }] =
    useSendLogoutMutation();
  const { privilegelevel, firstname, lastname, img } = useAuth();
  // const [setPersist] = usePersist();
  const [errMessage, setErrMessage] = useState("");
  const [logoutTriggered, setLogoutTriggered] = useState(false);
  const navigate = useNavigate();
  const error = logoutError as AuthErrorResponse;

  const handleLogout = () => {
    console.log("Logout button clicked");
    sendLogout();
    setLogoutTriggered(true);
    setErrMessage(error.data.message);
  };

  useEffect(() => {
    if (isSuccess && logoutTriggered) {
      navigate("/login");
    }
  }, [isSuccess, logoutTriggered, navigate]);

  // if (isLoading) {
  //   return (
  //     <Box m={10}>
  //       <Spinner /> Login out
  //     </Box>
  //   );
  // }

  if (isError) {
    toast({
      title: "Log in",
      description: errMessage,
      duration: 5000, // 5s
      isClosable: true,
      status: "error",
      position: "top",
    });
    // return <Box>error.data.message</Box>;
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
              <Avatar size={"sm"} src={img} />
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
                <Avatar size={"xl"} src={img} />
              </Center>
              <br />
              <Center>
                <Box>{firstname + " " + lastname}</Box>
              </Center>
              <br />
              <MenuDivider />
              {(privilegelevel === "blogauthor" ||
                privilegelevel === "admin" ||
                privilegelevel === "superadmin") && (
                <>
                  <MenuItem onClick={() => navigate("/blog/new-post")}>
                    Create a post
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/myposts")}>
                    My Posts
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={() => navigate("/account/")}>Account</MenuItem>
              {privilegelevel === "superadmin" && (
                <>
                  <MenuItem onClick={() => navigate("/dashboard?tab=dash")}>
                    Dashboard
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
