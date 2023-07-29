import React, { Dispatch } from "react";
import UserData from "../entities/UserData";
import { AuthAction } from "../reducers/authReducer";

interface AuthContextType {
  userData: UserData;
  dispatch: Dispatch<AuthAction>
}

// const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
