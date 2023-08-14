import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AuthProvider, NavBar } from "../../components/navigationbar";

const Layout = () => {
  // const [userData, dispatch] = useReducer(authReducer, {});
  // const setLatestPosts = usePostQueryStore(s => s.setLatestPosts);
  // const location = useLocation();
  // console.log(`Current location: ${location.pathname}`)
  // if (location.pathname === '/') {
  //   setLatestPosts(3)
  // } else {setLatestPosts(0)}

  return (
    <AuthProvider>
      <NavBar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </AuthProvider>
  );
};

export default Layout;
