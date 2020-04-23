
//平台判断
export function isPlatform() {
  let platform = "",
    u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    platform = "android";
  } else if (u.indexOf("iPhone") > -1) {
    platform = "ios";
  } else {
    platform = "web";
  }
  return platform;
}

/**
 * 打开设置界面
 */
export function settingPrivacy() {
    return new Promise(function(resolve, reject) {
      window.YHAuthorize.callHandler("Device_Setting", "", resp => {
        resolve(resp);
      });
    });
  }

/**
 * 获取设备信息
 */
export function deviceInfo() {
  if (isPlatform() === "web") {
    return new Promise(function(resolve, reject) {
      let _mockData = {
        status: "1000",
        data: {
          uuid: "100000",
          system_name: "web",
          isHair: 1,
          jpush_id:"",
          phone_platform:"小米"
        }
      };
      resolve(_mockData);
    });
  } else {
    return new Promise(function(resolve, reject) {
      window.YHAuthorize.callHandler("Device_Environment", "", resp => {
        if (resp.status === "1000" || resp.status === 1000) {
          resolve(resp);
        } else {
          reject();
        }
      });
    });
  }
}


/**
 * 上传图片
 * 
*/

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
        window.YHAuthorize.callHandler("SDK_UpLoadImage", objs, resp => {
          Toast.hide();
          if (resp.status === "1000") {
            // 请求成功
            if (resp.data.code === "0") {
              // 请求成功
              resolve(resp.data);
            } else {
              resolve(resp.data);
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




