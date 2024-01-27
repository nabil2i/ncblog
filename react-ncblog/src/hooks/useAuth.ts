import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../app/features/auth/authSlice'

interface TokenPayload {
  roles: string[];
  username: string;
  _id: string;
  firstname: string;
  lastname: string;
  isActive: string;
  email: string;
  img: string;
}
const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isAdmin = false
  let isEditor = false
  let isRegular = false
  let status = ""

  if (token) {
    const decoded = jwtDecode<TokenPayload>(token)

    const { username, roles, _id, firstname, lastname, isActive, email, img } = decoded

    isAdmin = roles.includes('Admin' || 'admin')
    isEditor = roles.includes('Editor' || 'editor')
    isRegular = roles.includes('Regular' || 'regular')

    if (isRegular) status = "Regular"
    if (isEditor) status = "Editor"
    if (isAdmin) status = "Admin"

    return  {
      _id,
      username,
      firstname,
      lastname,
      email,
      isActive,
      roles,
      img,
      isAdmin, isEditor, isRegular, status
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
    isAdmin, isEditor, isRegular, status
  }
}

export default useAuth
