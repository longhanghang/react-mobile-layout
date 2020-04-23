import * as types from "../types";
const userInfo = (state = {}, { type, data }) => {
  switch (type) {
    case types.SET_USER_INFO: {
      return {
        ...state,
        ...data
      };
    }
    case types.SET_ACCOUNT_INFO:
      return {
        ...state,
        ...data
      };
    default:
      return state;
  }
};
export default userInfo;
