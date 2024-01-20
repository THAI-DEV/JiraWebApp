import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const initUserInfo = {
  userLogin: '',
  isPassLogin: false,
};

// export const counterAtom = atom(initUserInfo);

//* sessionStorage
const sessionStore = createJSONStorage(() => sessionStorage);
export const authUserInfoAtom = atomWithStorage('AuthUserInfo', initUserInfo, sessionStore);

//* Optional

export const loginTitleAtom = atom((get) => {
  if (get(authUserInfoAtom).isPassLogin) {
    return 'Logout';
  }

  return 'Login';
});

export const actionLoginAtom = atom(null, (_get, set, payload, loginVal) => {
  let newUserInfo;

  if (payload === 'pass') {
    newUserInfo = {
      userLogin: loginVal,
      isPassLogin: true,
    };
  }

  if (payload === 'fail') {
    newUserInfo = {
      userInfo: loginVal,
      isPassLogin: false,
    };
  }

  set(authUserInfoAtom, newUserInfo);
});

export const resetLoginAtom = atom(null, (_get, set) => {
  const newUserInfo = {
    userInfo: '',
    isPassLogin: false,
  };

  set(authUserInfoAtom, newUserInfo);
});
