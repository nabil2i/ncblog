import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { authSatus } from "../../app/features/auth/authSlice";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useSelector(authSatus);
  // console.log(state);
  // const finalComponent = state.token ? children : <LoginPage/>

  // return finalComponent;
  if (isAuthenticated) {
    return (
      <Navigate
        to="/login"
        // state={{ from: history.location }}
        replace
      />
      // <LoginPage/>
    );
  }
  return children;
};

export default PrivateRoute;
