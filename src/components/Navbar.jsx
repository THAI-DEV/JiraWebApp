import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

export const Navbar = () => {
  const { username, loginHandler, logoutHandler, isLogin } = useAuth();

  return (
    <>
      <div className={'nav-container'}>
        <h2>Example</h2>
        <nav id="sidebar" className={'nav-item-container'}>
          <NavLink to="/" className={'nav-item'}>
            Home
          </NavLink>
          <NavLink to="/info" className={'nav-item'}>
            Info
          </NavLink>
          <NavLink to="/ex001" className={'nav-item'}>
            Ex001
          </NavLink>
          <NavLink to="/ex002" className={'nav-item'}>
            Ex002
          </NavLink>

          {isLogin && <div style={{ color: 'black', backgroundColor: 'yellow' }}>[{username}]</div>}

          {!isLogin && (
            <button style={{ border: '1px solid black' }} onClick={loginHandler}>
              Login
            </button>
          )}

          {isLogin && (
            <button style={{ border: '1px solid black' }} onClick={logoutHandler}>
              Logout
            </button>
          )}
        </nav>
      </div>
      <hr />
    </>
  );
};
