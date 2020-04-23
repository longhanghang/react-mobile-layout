import Axios from "@/axios";
function file(file, userId, type) {
  const formData = new FormData();
  formData.append("fileMap", file);

  userId && formData.append("userId", userId);
  type && formData.append("type", type);
  return formData;
}
//OCR识别营业执照
export const businessLicense = formData => {
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/api/dhd/ocr/business_license",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      params: formData,
      isLoading: true
    }).then(res => {
      resolve(res.data);
    }, reject);
  });
};
//OCR识别身份证
export const idCard = (e, userId, type) => {
  return new Promise(async (resolve, reject) => {
    Axios.post({
      url: "/api/dhd/ocr/id_card",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      params: file(e, userId, type),
      isLoading: true
    }).then(res => {
      resolve(res.data);
    }, reject);
  });
};
//人证比对接口
export const selfieIdnumberVerification = params => {
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/api/dhd/selfieIdnumberVerification",
      params,
      isLoading: true
    }).then(res => {
      resolve(res.data);
    }, reject);
  });
};
//开关
export const getOcrOnOff = params => {
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/hscParam/ocrSwitch",
      params,
      isLoading: true
    }).then(res => {
        resolve(res.data);
    }, reject);
  });
};
