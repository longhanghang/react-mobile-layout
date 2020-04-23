/*
 * @Author: yang bo
 * @Date: 2020-03-16 09:57:59
 * @LastEditors: yang bo
 * @LastEditTime: 2020-03-17 20:36:56
 * @Description: 
 */
import { combineReducers } from "redux";
import * as types from "../types/index.js";
import utils from "@/utils";
import deviceInfo from "./deviceInfo";
import userInfo from "./userInfo";
const appReducer = combineReducers({
  deviceInfo,
  userInfo
});
//重置start
const rootReducer = (state = getInitState(), action) => {
  if (action.type === types.SIGN_OUT) {
    let hash = "#/login";
    state = {deviceInfo:state.deviceInfo};
    utils.clear();
    window.location.hash = hash;
  }
  return appReducer(state, action);
};
export default rootReducer;
const getInitState = () => {
  return utils.get(utils.constants.REDUX_STATE);
};
