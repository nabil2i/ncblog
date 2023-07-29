import UserData from "../entities/UserData";

interface LoginAction {
  type: 'LOGIN';
  userData: UserData;
}

interface LogoutAction {
  type: 'LOGOUT';
}

export type AuthAction = LoginAction | LogoutAction;

const authReducer = (state: UserData, action: AuthAction): UserData => {
  switch (action.type) {
    case 'LOGIN':
      {
        localStorage.setItem('userData', JSON.stringify(action.userData)); 
        return action.userData;
      }
    case 'LOGOUT':
      localStorage.setItem('userData', JSON.stringify({}));
      return {};
    default:
      return state;
  }
  
}

export default authReducer;
