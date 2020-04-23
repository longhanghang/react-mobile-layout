import Axios from "@/axios/";
//获取个人中心
export const getUserInfo = params => {
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/my/info",
      params,
      isLoading: true
    }).then(res => {
      resolve(res.data);
    }, reject);
  });
};