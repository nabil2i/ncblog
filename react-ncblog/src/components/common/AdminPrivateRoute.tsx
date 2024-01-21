/// <reference types="vite/client" />

import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../navigationbar/useAuth";
import jwt from "jsonwebtoken";

interface Props {
  children: ReactNode;
}

const JWT_SECRET = process.env.REACT_APP_API_JWT_SECRET || ""; // Make sure to set this environment variable

const AdminPrivateRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { state } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token"); // You can use cookies or any other storage method
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken: any = jwt.verify(token, JWT_SECRET);
      const userRoles = decodedToken.roles || [];
      const userRole = "admin";

      if (!userRoles.includes(userRole)) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default AdminPrivateRoute;

  // const roles = state.?user?.roles
  // console.log(roles)  
  // const lowercaseRoles = roles?.map((role: string) => role.toLowerCase());
  // const userRole = "admin"

  // if (!state?.isAuthenticated && !lowercaseRoles?.includes(userRole.toLowerCase())) {
  //   return (
  //     <Navigate
  //       to="/login"
  //       replace
  //     />
  //   );
  // }

// const JWT_SECRET = import.meta.env.DEV ? import.meta.env.VITE_API_JWT_SECRET : process.env.API_JWT_SECRET;

// function getCookie(name: string) {
//   const cookies = document.cookie.split(';');
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].trim();
//     if (cookie.startsWith(`${name}=`)) {
  //       return cookie.substring(name.length + 1);
  //     }
//   }
//   return null;
// }

// const decodeToken = (token: string) => {
  //   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     // return JSON.parse(atob(token.split(".")[1]));
//     return decoded
//   } catch (error) {
//     return null;
//   } 

// }