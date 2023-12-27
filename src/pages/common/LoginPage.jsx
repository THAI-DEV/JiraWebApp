import { ADMIN_USER, ADMIN_PASSWORD } from './../../cont/app-config.js';
function LoginPage() {
  return (
    <>
      <h3>Login</h3>
      <div>{ADMIN_USER}</div>
      <div>{ADMIN_PASSWORD}</div>
    </>
  );
}

export default LoginPage;
