import { useState } from 'react';
import TokenObj from '../entities/TokenObj';

const  useToken = () => {
  const getToken = () => {
    // const tokenString = sessionStorage.getItem('token');
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString || '');
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: TokenObj) => {
    // sessionStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

export default useToken;

