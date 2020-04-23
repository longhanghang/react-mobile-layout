import * as types from "../types/index.js";

export const setUserInfo = data => {
  return {
    type: types.SET_USER_INFO,
    data
  };
};

export const setAccountInfo = data => {
  return {
    type: types.SET_ACCOUNT_INFO,
    data
  };
};
//退出登录
export const signOut = () => {
  return {
    type: types.SIGN_OUT
  };
};
