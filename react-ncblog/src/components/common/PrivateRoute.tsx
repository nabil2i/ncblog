import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../navigationbar/useAuth";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { state } = useAuth();
  // console.log(state);
  // const finalComponent = state.token ? children : <LoginPage/>

  // return finalComponent;
  if (!state?.isAuthenticated) {
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
