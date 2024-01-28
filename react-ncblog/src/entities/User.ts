export default interface User {
  _id?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  password2?: string;
  token?: string;
  isAuthenticated?: boolean
  img?: string
  // roles?: Array<string>;
}

export interface LoginData {
  username?: string;
  password?: string;
  token?: string;
}

export interface FormData {
  username: string;
  email: string;
  password: string;
  password2: string;
  firstname: string;
  lastname: string;
}
