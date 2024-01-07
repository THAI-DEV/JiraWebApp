import { useState } from 'react';

export const useAuth = () => {
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = () => {
    setUsername('DECH');
    setIsLogin(true);
    console.log('login');
  };

  const logoutHandler = () => {
    setUsername('');
    setIsLogin(false);
    console.log('logout');
  };

  return {
    username,
    loginHandler,
    logoutHandler,
    isLogin,
  };
};
