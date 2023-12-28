import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const initUserInfo = {
  userLogin: '',
  isPassLogin: false,
};

// export const counterAtom = atom(initUserInfo);

//* sessionStorage
const sessionStore = createJSONStorage(() => sessionStorage);
export const authUserInfoAtom = atomWithStorage('AuthUserInfoJotai', initUserInfo, sessionStore);

//* Optional

export const actionLogin = atom(null, (get, set, payload, loginVal) => {
  //   let userInfo = get(authUserInfoAtom);
  let newUserInfo;

  if (payload === 'login pass') {
    newUserInfo = {
      userLogin: loginVal,
      isPassLogin: true,
    };
  }

  if (payload === 'login fail') {
    newUserInfo = {
      userInfo: loginVal,
      isPassLogin: false,
    };
  }

  set(authUserInfoAtom, newUserInfo);
});

export const resetLogin = atom(null, (get, set) => {
  //   const userInfo = get(authUserInfoAtom);
  const newCounter = {
    userInfo: '',
    isPassLogin: false,
  };

  set(authUserInfoAtom, newCounter);
});
