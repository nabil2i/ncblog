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
