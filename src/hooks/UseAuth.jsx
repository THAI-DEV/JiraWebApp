import { useState } from 'react';

export const useAuth = () => {
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = () => {
    setUsername('DECH');
    setIsLogin(true);
  };

  const logoutHandler = () => {
    setUsername('');
    setIsLogin(false);
  };

  return {
    username,
    loginHandler,
    logoutHandler,
    isLogin,
  };
};
