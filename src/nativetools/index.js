import { initBridge } from "./bridge";
import { imagePicker,getDeviceInfo,uploadImage,liveFace } from "./service";

/**
 选择图片
 type: 1相机 2相册
 返回
 * @param {*} objs
 */
function chooseImageByYh(objs) {
    let _params = {
      type: objs.type,
      imageName: objs.imageName || `${new Date().getTime()}.png`,
      imageSize: objs.imageSize || 200 * 2014, // 图片大小 （0 表示不压缩，100*1024 表示 100Kb）
      thumbnailSize: objs.thumbnailSize || 10 * 1024 // 缩略图大小（0表示不压缩，不建议, 10*1024 表示 100Kb）
    };
    return imagePicker(_params);
  }
/*
初始化bridge
*/
function initBridgeByYh(successCallback){
      return initBridge(successCallback);
  }
/*
获取设备信息
*/
function getDeviceInfoByYh(){
       return getDeviceInfo();
  }

/*
  上传图片
*/
function uploadImageByYh(objs){
    let params = objs;
    return uploadImage(params);
}

/*活体检测*/
function doLiveFaceByYh(objs){
    let _params = {};
    _params.needUpload = objs.needUpload;
    if (objs.needUpload) {
      _params.url = objs.url;
      _params.header = {
        "Auth-Header": objs.header
      };
      _params.params = objs.params;
    }
    return liveFace(_params);
}
export {
chooseImageByYh,
initBridgeByYh,
getDeviceInfoByYh,
uploadImageByYh,
doLiveFaceByYh
}