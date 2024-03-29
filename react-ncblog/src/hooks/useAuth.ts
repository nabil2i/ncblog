import { jwtDecode } from 'jwt-decode';
import { selectCurrentToken } from '../app/features/auth/authSlice';
import { useAppSelector } from '../app/hooks';

interface TokenPayload {
  roles: string[];
  username: string;
  _id: string;
  firstname: string;
  lastname: string;
  isActive: string;
  email: string;
  img: string;
  // isAdmin: boolean;
}
const useAuth = () => {
  const token = useAppSelector(selectCurrentToken)
  let isSuperAdmin = false
  let isAdmin = false
  let isWriter = false
  let isStandard = false
  let status = ""

  if (token) {
    const decoded = jwtDecode<TokenPayload>(token)

    const { username, roles, _id, firstname, lastname, isActive, email, img } = decoded

    isSuperAdmin = roles.includes('SuperAdmin' || 'superadmin')
    isAdmin = roles.includes('Admin' || 'admin')
    isWriter = roles.includes('Writer' || 'writer')
    isStandard = roles.includes('Standard' || 'standard')

    if (isStandard) status = "Standard"
    if (isWriter) status = "Writer"
    if (isAdmin) status = "Admin"
    if (isSuperAdmin) status = "SuperAdmin"

    return  {
      _id,
      username,
      firstname,
      lastname,
      email,
      isActive,
      roles,
      img,
      isSuperAdmin,
      isAdmin, isWriter, isStandard, status
    }
  }

  return  {
    _id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    roles: [],
    img: '',
    isSuperAdmin,
    isAdmin, isWriter, isStandard, status
  }
}

export default useAuth
