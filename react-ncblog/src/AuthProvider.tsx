import { ReactNode, useContext, useReducer } from "react";
import AuthContext from "./contexts/authContext";
import authReducer from "./reducers/authReducer";
import UserData from "./entities/UserData";

interface Props {
  children: ReactNode;
}
const AuthProvider = ({ children }: Props) => {
  const userStoreString = localStorage.getItem('userData');
  // console.log(`userStoreString: ${userStoreString}`);

  const userStore = JSON.parse(userStoreString || '');
  // console.log(`userStore: ${userStore}`);
  
  // const [ userData, dispatch ] = useReducer(authReducer, {});
  const [ userData, dispatch ] = useReducer(authReducer, userStore);

  return (
    <AuthContext.Provider value={{ userData, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
