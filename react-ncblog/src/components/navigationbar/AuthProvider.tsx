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

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

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

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN": {
//       return {
//         user: action.userData,
//         isAuthenticated: true
//       };
//     }
//     case "LOGOUT":
//       return {
//         user: null,
//         isAuthenticated: false,
//       };
//     default:
//       return state;
//   }
// };

// Authentication Provider
interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const userStoreString = localStorage.getItem("userData");

  const initialState: User = {
    _id: "",
    username: "",
    email: "",
    token: "",
    isAuthenticated: false,
    img: "",
  };

  let userStore;

  try {
    userStore = userStoreString ? JSON.parse(userStoreString) : initialState;
  } catch (error) {
    console.error("Error parsing user data from localStorage", error);
    userStore = null;
  }

  const [userData, dispatch] = useReducer(authReducer, userStore);

  return (
    <AuthContext.Provider value={{ userData, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
