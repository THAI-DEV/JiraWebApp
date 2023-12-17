import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

import { useAuth } from '../../hooks/UseAuth';

export const MenuPage = () => {
  const { username, loginHandler, logoutHandler, isLogin } = useAuth();

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      url: '#/',
    },
    {
      label: 'Info',
      icon: 'pi pi-info',
      url: '#/info',
    },
    {
      label: 'Ex1',
      icon: 'pi pi-clone',
      url: '#/ex001',
    },
    {
      label: 'Ex2',
      icon: 'pi pi-clone',
      url: '#/ex002',
    },
  ];

  const start = <h2>Example</h2>;

  const end = (
    <div className="flex align-items-center justify-content-start">
      {isLogin && <div style={{ color: 'black', backgroundColor: 'yellow' }}>[{username}]</div>}
      {!isLogin && <Button icon="pi pi-check" onClick={loginHandler}></Button>}
      {isLogin && <Button icon="pi pi-times" onClick={logoutHandler}></Button>}
    </div>
  );

  return (
    <>
      <div className="border-1 border-round">
        <Menubar model={items} start={start} end={end} />
      </div>
    </>
  );
};
