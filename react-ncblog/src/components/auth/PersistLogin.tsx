import { Link } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { useRefreshMutation } from "../../app/features/auth/authApiSlice";
import {
  authSatus,
  selectCurrentToken,
} from "../../app/features/auth/authSlice";
import usePersist from "../../hooks/usePersist";
// { children }: { children: ReactNode }

const PersistLogin = () => {
  const [persist, setPersist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(authSatus);
  const effectRan = useRef(false);
  // const navigate = useNavigate();
  const location = useLocation();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isError, isLoading, isUninitialized, isSuccess }] =
    useRefreshMutation();

  useEffect(() => {
    if (!isAuthenticated && token) setPersist(false);
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // react 18 strict mode iîdev(mount, unmount, remount: useEffect runs twice)
      const verifyRefreshToken = async () => {
        // console.log("verifying refresh token");
        try {
          //const response =
          await refresh({});
          //const { accessToken } = response.data
          setTrueSuccess(true); // give time to credentials to be set
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  let content;

  if (!persist) {
    // persist
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    // content = <Spinner />;
  } else if (isError) {
    //persist: yes, token: no
    const path = location.pathname;
    if (
      path.includes("/admin") ||
      path.includes("/myposts") ||
      path.includes("/blog/new-post")
    )
      content = <Navigate to={"/login"}></Navigate>;

    <p className="errmsg">
      {/* {error.data?.message} */}
      <Link as={NavLink} _hover={{ textDecoration: "none" }} to="/login">
        Please login again
      </Link>
      .
    </p>;
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
