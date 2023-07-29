import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../AuthProvider";
import NavBar from "../../components/NavBar";

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

    // <AuthContext.Provider value={{ userData, dispatch}}>
    //   <NavBar />
    //   <Box padding={5}>
    //     <Outlet />
    //   </Box>
    // </AuthContext.Provider>
  );
};

export default Layout;
