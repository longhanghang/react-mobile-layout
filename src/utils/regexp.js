import { Toast } from "antd-mobile";
export default {
  //身份证正则
  checkIDCardFun(card) {
    let Reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
    let flag = Reg.test(card);
    if (!flag) {
      Toast.info("身份证格式不正确");
    }
    return flag;
  },
  //邮箱正则
  checkEmailFun(email) {
    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let flag = emailReg.test(email);
    if (!flag) {
      Toast.info("邮箱格式不正确");
    }
    return flag;
  },
  //检测手机号格式
  checkPhoneFun(phoneValue) {
    let phoneReg = /^1[1-9]{1}\d{9}$/;
    let flag = phoneReg.test(phoneValue);
    if (!flag) {
      Toast.info("手机号码格式不正确");
    }
    return flag;
  },
  //检查银行卡号
  checkBankCardReg(num) {
    let reg = /^(62)\d{0,27}/;
    let flag = reg.test(num);
    !flag && Toast.info("银行卡号格式不正确");
    return flag;
  },
  //密码规则
  checkPassword(num) {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)^.{6,20}$/;
    let flag = reg.test(num);
    !flag && Toast.info("密码必须包含字母和数字长度6-20");
    return flag;
  }
};
