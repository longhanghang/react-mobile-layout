import Axios from "@/axios";
import utils from "@/utils";
import { Toast } from "antd-mobile";
//获取短信验证码
export const getSmsCode = params => {
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/user/getSmsCode",
      params,
      isLoading: true
    }).then(res => {
      resolve(res);
    }, reject);
  });
};
//注册
export const register = params => {
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/user/regist",
      params,
      isLoading: true,
    }).then(res => {
      Toast.success("注册成功");
      resolve(res);
    }, reject);
  });
};

//账号密码登录
export const loginByAccount = params => {
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/user/loginByAccount",
      params,
      isLoading: true
    }).then(res => {
      resolve(res.data);
    }, reject);
  });
};
//短信验证码
export const loginBySMS = params => {
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/user/loginBySMS",
      params,
      isLoading: true
    }).then(res => {
      if (utils.isObject(res.data)) {
        resolve(res.data);
      } else {
        reject();
      }
    }, reject);
  });
};
