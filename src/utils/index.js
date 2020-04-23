import checkType from "./checkType";
import regexp from "./regexp";
import useEffectAsync from "./hooks";
import storage from "./storage";
import photoCompress from "./compress";
const htmlPath = location.pathname;
let utils = {
  type: htmlPath.includes("/dbr.html") ? "04" : "02", // 02是法人，04是担保人
  constants: {
    proType: {
      "1": "PXD01007", //纳爱斯
      "2": "PXD01001" //准的订货贷产品号
    },
    REDUX_STATE: "REDUX_STATE",
    DHD_USER_TOKEN: "DHD_USER_TOKEN",
    PDF_URL: PROD ? "https://xdma.yonghui.cn/bgateway" : "http://10.253.129.127", //pdf下载地址
    LINK_FACE_HOST: PROD
      ? "http://109.244.32.32:10005/dhd_linkface"
      : "http://10.253.129.11:10005"
    // "http://109.244.32.32:10005/dhd_linkface"
  },
  //获取url参数
  getUrlParam(paraName, props) {
    let url = props.location.search;
    let arrObj = url.split("?");
    if (arrObj.length > 1) {
      let arrPara = arrObj[1].split("&");
      let arr;
      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr !== null && arr[0] == paraName) {
          return arr[1];
        }
      }
      return "";
    }
  },
  //中间号码变星号
  replaceStar(str) {
    if (typeof str !== "string") {
      return "";
    }
    let length = str.length;
    if (length < 7) {
      return str;
    }
    let star = "*".repeat(length - 7);
    return str.replace(/^(\d{3})\d*(\d{4})|(x)$/, `$1${star}$2`);
  },
  //是否是disable
  isDisable(getFieldsValue) {
    let values = Object.values(getFieldsValue());
    if (values.length === 0) {
      return true;
    }
    return values.filter(Boolean).length !== values.length;
  },
  //金钱格式化
  formatMoney(str) {
    if (!str) {
      return "";
    }
    if (str === "0.00") {
      return str;
    }
    str += "";
    return str.replace(/\B(?=(\d{3})+\b)/g, ",").replace(/^0*/, "");
  },
  throttle(method, delay = 200) {
    let timer = null;
    return function() {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        method.apply(context, args);
      }, delay);
    };
  },

  replace(str, obj) {
    str = str
      .replace(/font-size:\s*(\d+?px)/g, function() {
        let $2 = arguments[1];
        let num = $2.slice(0, -2);
        num *= 2;
        return "font-size:" + num / 100 + "rem";
      })
      .replace(/\{([\s\S]+?)\}/g, function() {
        return obj[arguments[1]] || "";
      });
    return str;
  },
  useEffectAsync,
  photoCompress,
  formData(e, type) {
    const file = e.target.files[0];
    // const bl = await utils.photoCompress(file);
    const formData = new FormData();
    formData.append(type, file);
    return formData;
  },
  formatLoanRate(rate) {
    return (rate / 360).toFixed(3);
  }
};

utils = Object.assign(utils, checkType, regexp, storage);
export default utils;
