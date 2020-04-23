import Axios from "@/axios";

//获取对账数据
export const getVerifyList = params => {
    return new Promise((resolve, reject) => {
      Axios.post({
        url: "/reconciliation/creat",
        params,
        isLoading: true
      }).then(res => {
          resolve(res.data);
      }, reject);
    });
  };