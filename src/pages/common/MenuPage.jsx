import { useAtomValue } from 'jotai';

import { Menubar } from 'primereact/menubar';

import { authUserInfoAtom, loginTitleAtom } from '../../store/AuthStore';

export const MenuPage = () => {
  const authUserInfo = useAtomValue(authUserInfoAtom);
  const loginTitle = useAtomValue(loginTitleAtom);

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
    // {
    //   label: 'Ex1',
    //   icon: 'pi pi-clone',
    //   url: '#/ex001',
    // },
    {
      label: 'App001',
      icon: 'pi pi-clone',
      url: '#/app001',
    },
    {
      label: 'App002',
      icon: 'pi pi-clone',
      url: '#/app002',
    },
    {
      label: `${loginTitle}`,
      icon: 'pi pi-user',
      url: '#/login',
    },
  ];

  const computeAuth = () => {
    if (authUserInfo && authUserInfo.isPassLogin) {
      return <>Login : {authUserInfo.userLogin}</>;
    } else {
      return <>Not Login</>;
    }
  };

  const start = <h2>Jira Info</h2>;

  const end = (
    <div className="flex align-items-center justify-content-start">
      <div className="font-bold" style={{ color: 'green' }}>
        {computeAuth()}
      </div>
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
