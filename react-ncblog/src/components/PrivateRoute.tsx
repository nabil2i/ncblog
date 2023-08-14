import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./navigationbar/useAuth";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { userData } = useAuth();
  // console.log(userData);
  // const finalComponent = userData.token ? children : <LoginPage/>

  // return finalComponent;
  if (!userData.token) {
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
