import Cookies from "cookies-js";
import jwt from "jsonwebtoken";
import { ReactNode } from "react";
import useAuth from "../navigationbar/useAuth";

interface EditorProvateRouteProps {
  children: ReactNode;
}

interface TokenPayload {
  _id: string;
  roles: string[];
  isActive: boolean;
}

const EditorPrivateRoute = ({ children }: EditorProvateRouteProps) => {
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     return;
  //   }

  //   const decodedToken: TokenPayload = decodeToken(token) as TokenPayload;

  //   if (!decodedToken || !decodeToken) {
  //     return;
  //   }
  //   console.log(token);
  //   console.log(decodedToken);

  //   const designatedRole = "editor";
  //   const userRoles =
  //     decodedToken.roles?.map((role: string) => role.toLowerCase()) || [];

  //   if (!userRoles.includes(designatedRole)) {
  //     return;
  //   }
  // }, []);

  const { state } = useAuth();
  if (!state.isAuthenticated) {
    return;
  }

  const token = Cookies.get("token");
  if (!token) {
    return;
  }

  const decodedToken: TokenPayload = decodeToken(token) as TokenPayload;

  if (!decodedToken || !decodeToken) {
    return;
  }
  console.log(token);
  console.log(decodedToken);

  const designatedRole = "editor";
  const userRoles =
    decodedToken.roles?.map((role: string) => role.toLowerCase()) || [];

  if (!userRoles.includes(designatedRole)) {
    return;
  }

  return <>{children}</>;
};

const JWT_SECRET = import.meta.env.DEV
  ? import.meta.env.VITE_API_JWT_SECRET
  : process.env.API_JWT_SECRET;
const decodeToken = (token: string | undefined) => {
  try {
    if (token) {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      // const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
};

export default EditorPrivateRoute;
