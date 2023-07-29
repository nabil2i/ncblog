import { Avatar, Box, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useReducer } from 'react'
import authReducer from '../reducers/authReducer'
import AuthContext from '../contexts/authContext'
import useAuth from '../hooks/useAuth'

interface Props {
  children: React.ReactNode
}

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

const Profile = () => {
  // const [userData, dispatch] = useReducer(authReducer, {});
  // const { userData, dispatch} = useContext(AuthContext);
  const { userData, dispatch} = useAuth();
  

  if(userData?.token)
  return (
    <>
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Avatar
              size={'sm'}
              src={'https://avatars.dicebear.com/api/male/username.svg'}
            />
          </MenuButton>
          <MenuList alignItems={'center'}>
            <br />
            <Center>
              <Avatar
                size={'xl'}
                src={'https://avatars.dicebear.com/api/male/username.svg'}
              />
            </Center>
            <br />
            <Center>
              <p>Username</p>
            </Center>
            <br />
            <MenuDivider />
            <MenuItem>Your Servers</MenuItem>
            <MenuItem>Account Settings</MenuItem>
            <MenuItem onClick={() => dispatch({ type: 'LOGOUT'})
            }>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  )
}

export default Profile;
