
import { Modal,Toast } from "antd-mobile";
import { settingPrivacy,isPlatform,deviceInfo } from "./base";
const Alert = Modal.alert;
import load from "@/axios/loading";
let loading = new load();
/**
 * 选择图片方法
 *
 * @param {*} objs
 *
 * objs
 *
 * -type            选择类型
 * -imageName       图片名称
 * -imageSize       图片大小（压缩目标值）
 * -thumbnailSize   图片缩略图大小
 */
export function imagePicker(objs) {

    if (isPlatform() === "web") {
        return new Promise(function(resolve, reject) {
            let resp = {
                status: "1000",
                data: {
                    path: "/user/data/saveAdress", //图片路径
                    base64: "data:image/png;base64,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" //缩略图，图片base64编码
                }
            };
            resolve(resp);
        });
    } else {
        return new Promise(function(resolve, reject) {
            window.YHAuthorize.callHandler('Privacy_ImagePicker', objs, (resp) => {
                if (resp.status === "1000") {
                    resolve(resp);
                } else {
                    reject(resp);
                    if (resp.status === "3001") { // 权限相关
                        let showMsg = "";
                        if (isPlatform() === "ios") {
                            showMsg = `无法上传图片，请授权相机及照片权限。`;
                        } else {
                            if(resp.type=='2'){
                                showMsg = `无法打开相册，请授权应用存储空间权限。`;
                            }else {
                                showMsg = `无法打开相机，请授权应用使用相机及存储空间权限。`;
                            }
                        }
                        Alert('', showMsg, [
                            { text: '取消', onPress: () => {} },
                            { text: '去设置', onPress: () => settingPrivacy() },
                        ]);
                    }
                }
            });
        });
    }
}

//获取设备信息
export function getDeviceInfo(){
    return deviceInfo();
}

//上传图片
export function uploadImage(objs) {
    if (isPlatform() === "web") {
      let resp = {
        status: "1000",
        data: {
          code: "0"
        }
      };
      return new Promise(function (resolve, reject) {
        resolve(resp);
      });
    } else {
      return new Promise(function (resolve, reject) {
        loading.show();
        window.YHAuthorize.callHandler("SDK_UpLoadImage", objs, resp => {
            loading.hide();
          if (resp.status === "1000") {
            // 请求成功
            if (resp.data.code == "200") {
              resolve(resp.data);
            } else {
              reject(resp.data);
              Toast.info(resp.data.message, 2);
            }
          } else {
            reject(resp);
            Toast.info("系统在开小差，请稍后再试。", 2);
          }
        });
      });
    }
  }

/**
 * 活体检测
 * @param {*} params 
 */
export function liveFace(params) {
    console.log(params)
    return new Promise(function(resolve, reject) {
        loading.show();
        window.YHAuthorize.callHandler("Page_LiveFace", params, resp => {
            loading.hide();
            if (resp.status === '1000') {
                resolve(resp);
            } else {
                reject(resp);
                if (resp.status === "3001") { // 权限相关
                    let showMsg = "";
                    if (isPlatform() === "ios") {
                        showMsg = `本应用暂时无法访问相机，请进入“设置-隐私-相机”进行授权。`;
                    } else {
                        showMsg = `暂时无法打开相机，请进入权限管理中授信本应用读取存储文件或照片。`;
                    }
                    Alert('', showMsg, [
                        { text: '取消', onPress: () => {} },
                        { text: '去设置', onPress: () => settingPrivacy() },
                    ]);
                }
            }
        });
    });
}

