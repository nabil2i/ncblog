import { ReactNode, useReducer } from "react";
import User from "../../entities/User";
import AuthContext from "./authContext";

// Reducer
interface LoginAction {
  type: "LOGIN";
  userData: User;
}
interface UpdateAccountAction {
  type: "UPDATE_USER_ACCOUNT";
  updatedUserData: Partial<User>;
}

interface LogoutAction {
  type: "LOGOUT";
}

export type AuthAction = LoginAction | LogoutAction | UpdateAccountAction;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      const newState = {
        user: action.userData,
        isAuthenticated: true,
      };
      localStorage.setItem("userData", JSON.stringify(newState));
      return newState;
    }
    // case "LOGIN": {
    //   localStorage.setItem("userData", JSON.stringify(action.userData));
    //   return action.userData;
    // }
    // case "UPDATE_USER_ACCOUNT": {
    //   localStorage.setItem("userData", JSON.stringify(action.userData));
    //   return { ...state, };
    // }
    case "UPDATE_USER_ACCOUNT": {
      const updatedUser = { ...state.user, ...action.updatedUserData };
      const newState = {
        user: updatedUser,
        isAuthenticated: true,
      };
      localStorage.setItem("userData", JSON.stringify(newState));
      return newState;
    }
    case "LOGOUT": {
      const newState = {
        user: null,
        isAuthenticated: false,
      };
      localStorage.removeItem("userData");
      return newState;
    }
    // case "LOGOUT":
    //   // localStorage.setItem("userData", JSON.stringify({}));
    //   localStorage.removeItem("userData");
    //   return {};
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
  const userStateString = localStorage.getItem("userData");

  // const initialState: User = {
  //   _id: "",
  //   username: "",
  //   email: "",
  //   token: "",
  //   isAuthenticated: false,
  //   img: "",
  // };
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
  };

  let userState;

  try {
    userState = userStateString ? JSON.parse(userStateString) : initialState;
  } catch (error) {
    console.error("Error parsing user data from localStorage", error);
    userState = null;
  }

  const [state, dispatch] = useReducer(authReducer, userState);
  // const [state, dispatch] = useReducer(authReducer, userState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
