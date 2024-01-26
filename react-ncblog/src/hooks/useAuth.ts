import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../app/features/auth/authSlice'

interface TokenPayload {
  roles: string[];
  isAdmin: string;
  isRegular: string;
  isEditor: string;
  username: string;
  _id: string;
  firstname: string;
  lastname: string;
  isActive: string;
}
const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isAdmin = false
  let isEditor = false
  let isRegular = false
  let status = ""

  if (token) {
    const decoded = jwtDecode<TokenPayload>(token)

    const { username, roles, _id, firstname, lastname, isActive } = decoded

    isAdmin = roles.includes('Admin' || 'admin')
    isEditor = roles.includes('Editor' || 'editor')
    isRegular = roles.includes('Regular' || 'regular')

    if (isRegular) status = "Regular"
    if (isEditor) status = "Editor"
    if (isAdmin) status = "Admin"

    return  {
      username,
      _id,
      firstname,
      lastname,
      isActive,
      roles,
      isAdmin, isEditor, isRegular, status
    }
  }

  return  {
    username: '',
    roles: [],
    isAdmin, isEditor, isRegular, status
  }
}

export default useAuth
