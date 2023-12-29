import { useState, useRef } from 'react';

import { useAtom, useSetAtom } from 'jotai';

import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { NonBreakingSpace } from '../../components/NonBreakingSpace.jsx';

import { ADMIN_USER, ADMIN_PASSWORD } from './../../cont/app-config.js';

import { actionLoginAtom, resetLoginAtom, authUserInfoAtom } from '../../store/store.js';

function LoginPage() {
  const toast = useRef(null);

  //* TAG ---- Atom (begin) ----
  const setActionLogin = useSetAtom(actionLoginAtom);
  // const [, actionLogin] = useAtom(actionLoginAtom);

  const setResetLogin = useSetAtom(resetLoginAtom);
  //const [, resetLogin] = useAtom(resetLoginAtom);

  const [authUserInfo] = useAtom(authUserInfoAtom);
  //* TAG ---- Atom (end) ----

  const showPopupMsg = (typeMsg, title, msg, delayMilisec) => {
    toast.current.show({ severity: typeMsg, summary: title, detail: msg, life: delayMilisec });
  };

  //* TAG ---- State (begin) ----
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  //* TAG ---- State (end) ----

  //* TAG ---- Handler (begin) ----
  function clearHandler() {
    setLogin('');
    setPassword('');
  }
  function loginHandler() {
    if (login === ADMIN_USER && password === ADMIN_PASSWORD) {
      setActionLogin('pass', login);
      showPopupMsg('success', 'Info', 'Login Success', 5000);
      window.location.href = '#/app001';
    } else {
      setActionLogin('fail', login);
      showPopupMsg('error', 'Error', 'Login Fail', 5000);
    }
  }

  function logoutHandler() {
    setResetLogin();
  }
  //* TAG ---- Handler (end) ----

  return (
    <>
      <Card title="Login" className="text-center">
        <div className="m-0">
          <div className="col">
            <label className="font-bold">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Login : </label>
            <InputText value={login} onChange={(e) => setLogin(e.target.value)} />
          </div>

          <div className="col">
            <label className="font-bold">Password : </label>
            <InputText value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>
          <div className="col">
            <Button severity="success" label="Login" onClick={loginHandler} disabled={authUserInfo.isPassLogin} />
            <NonBreakingSpace num={5} />
            <Button severity="secondary" label="Clear" onClick={clearHandler} disabled={authUserInfo.isPassLogin} />
            <NonBreakingSpace num={5} />
            <Button severity="danger" label="Logout" onClick={logoutHandler} disabled={!authUserInfo.isPassLogin} />
          </div>
        </div>
      </Card>

      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
    </>
  );
}

export default LoginPage;
