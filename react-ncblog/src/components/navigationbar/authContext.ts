import React, { Dispatch } from "react";
import User from "../../entities/User";
import { AuthAction } from "./AuthProvider";

interface AuthContextType {
  userData: User;
  dispatch: Dispatch<AuthAction>
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
