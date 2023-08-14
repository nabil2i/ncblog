import { ReactNode, useReducer } from "react";
import User from "../../entities/User";
import AuthContext from "./authContext";

// Reducer
interface LoginAction {
  type: "LOGIN";
  userData: User;
}

interface LogoutAction {
  type: "LOGOUT";
}

export type AuthAction = LoginAction | LogoutAction;

const authReducer = (state: User, action: AuthAction): User => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("userData", JSON.stringify(action.userData));
      return action.userData;
    }
    case "LOGOUT":
      // localStorage.setItem("userData", JSON.stringify({}));
      localStorage.removeItem("userData");
      return {};
    default:
      return state;
  }
};

// export default authReducer;

// Authentication Provider
interface Props {
  children: ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  const userStoreString = localStorage.getItem("userData");
  // console.log(`userStoreString: ${userStoreString}`);

  let userStore;

  if (!userStoreString) userStore = "";
  else userStore = JSON.parse(userStoreString);

  // const userStore = JSON.parse(userStoreString || "")
  // console.log(`userStore: ${userStore}`);

  // const [ userData, dispatch ] = useReducer(authReducer, {});
  const [userData, dispatch] = useReducer(authReducer, userStore);

  return (
    <AuthContext.Provider value={{ userData, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
