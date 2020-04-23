import Axios from "@/axios";
import utils from "@/utils";
import {uploadImageByYh} from "@/nativetools";
import { useSelector } from "react-redux";
//OCR识别身份证
export const upload = async (e, type, isCompress) => {
  let file = null;
  if (isCompress) {
    file = await utils.photoCompress(e.target.files[0]);
  } else {
    file = e.target.files[0];
  }
  const formData = new FormData();
  formData.append(type, file);
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/api/hsc/ocr/idCard",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      params: formData,
      isLoading: true
    }).then(res => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const result = e.target.result;
        resolve({
          url: res.data[type],
          base64: result,
          file: file
        });
      };
      reader.readAsDataURL(file);
    }, reject);
  });
};
//上传视频
export const uploadVideo = (files, imgFile) => {
  const formData = new FormData();
  const renameReportFile = new File([files], "FRHTVIEW.mp4", {
    type: files.type
  });
  formData.append("FRHTVIEW", renameReportFile);
  formData.append("FRHTIMG", imgFile);
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/api/dhd/file/upload",
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
export const uploadImg = async (e, type) => {
  const file = e.target.files[0];
  const formData = new FormData();
  const bl = await utils.photoCompress(file);
  formData.append(type, bl);
  // formData.append(type, file);
  return new Promise((resolve, reject) => {
    Axios.post({
      url: "/api/hsc/ocr/idCard",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      params: files,
      isLoading: true
    }).then(res => {
      resolve(res.data);
    }, reject);
  });
};

function blobToDataURL(blob) {
  return new Promise(resolve => {
    const a = new FileReader();
    a.onload = function(e) {
      // callback(e.target.result);
      resolve(e.target.result);
    };

    a.readAsDataURL(blob);
  });
}
export const downLoadPre = (url, path) => {
  return Axios.get({
    url,
    params: { path }
  }).then(async blob => {
    const url = window.URL.createObjectURL(blob);
    // const url = await blobToDataURL(blob);
    // url = "data:image/png;base64," + blob;
    // // console.log( ""url, 111111);
    return url;
  });
};

//ocr识别身份--原生

export const uploadNative = (e) => {
  let imageArray = [{
    name: e.name,
    path: e.data.path,
    params: {}
}]

let paramObjs = {
  url: e.url,
  method: "POST",
  header: {
      "Content-Type": 'multipart/form-data',
      'Auth-Header':e.appUserToken,
  },
  imageArray: imageArray
}
 return uploadImageByYh(paramObjs);
} 
