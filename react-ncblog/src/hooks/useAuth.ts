import { jwtDecode } from 'jwt-decode';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';

interface TokenPayload {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  roles: string[];
  isActive: boolean;
  email: string;
  img: string;
}
const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  // console.log(token);

  const tokendata = {
    _id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    roles: [''],
    img: '',
    isActive: false, 
    privilegelevel: ''
   }

  let isUser = false;
  let isBlogAuthor = false;
  let isAdmin = false;
  let isSuperAdmin = false;

  if (token) {
    const decoded = jwtDecode<TokenPayload>(token);
    // console.log("decoded user", decoded)

    const { _id, username, firstname, lastname, email, roles, isActive, img } = decoded

    isSuperAdmin = roles.includes('superadmin');
    isAdmin = roles.includes('admin');
    isBlogAuthor = roles.includes('blogauthor');
    isUser = roles.includes('user');

    if (isUser) tokendata.privilegelevel = 'user';
    // if (isUser) tokendata.status = "user";
    if (isBlogAuthor) tokendata.privilegelevel = 'blogauthor';
    // if (isBlogAuthor) tokendata.status = "blogauthor";
    if (isAdmin) tokendata.privilegelevel = 'admin';
    // if (isAdmin) tokendata.status = "admin";
    if (isSuperAdmin) tokendata.privilegelevel = 'superadmin';
    // if (isSuperAdmin) tokendata.status = "superadmin";

    if (_id) tokendata._id = _id;
    if (username) tokendata.username = username;
    if (firstname) tokendata.firstname = firstname;
    if (lastname) tokendata.lastname = lastname;
    if (email) tokendata.email = email;
    if (isActive) tokendata.isActive = isActive;
    if (img) tokendata.img = img;
    if (roles) tokendata.roles = roles;
  }

  // console.log (tokendata)
  return tokendata;

}

export default useAuth;
