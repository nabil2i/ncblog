import { AtSignIcon, CalendarIcon } from '@chakra-ui/icons';
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <List fontSize="1.2em" spacing={4}>
      <ListItem>
        <NavLink to="/admin">
          <ListIcon as={CalendarIcon} />
          Dashboard
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/admin/resources">
        <ListIcon as={CalendarIcon} />
          Resources
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/admin/posts">
        <ListIcon as={CalendarIcon} />
          Posts
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/admin/profile">
        <ListIcon as={AtSignIcon} />
          Profile
        </NavLink>
      </ListItem>
    </List>
  )
}

export default AdminSideBar;
