export default interface User {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
  token?: string;
  isAuthenticated?: boolean
}
