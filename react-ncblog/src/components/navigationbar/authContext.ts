import React, { Dispatch } from "react";
import User from "../../entities/User";
import { AuthAction } from "./AuthProvider";

interface AuthContextType {
  userData: User;
  dispatch: Dispatch<AuthAction>
}

// export const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
// };

// interface AuthContextType {
//   state: AuthState;
//   dispatch: Dispatch<AuthAction>
// }

// const initialContext: AuthContextType = {
//   state: initialState,
//   dispatch: () => null
// }

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
