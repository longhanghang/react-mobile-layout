import React, { useState, useCallback } from "react";
import { InputItem, List, Toast,Tabs } from "antd-mobile";
import { createForm } from "rc-form";
import AgreementModal from "./modal";
import Button from "@components/button";
import Agree from "@components/agree";
import verCode from "@components/verCode";
import "./index.less";
import utils from "@/utils";

function Login(props) {
  const [isLogin, setIsLogin] = useState(true); //是登录还是注册
  const [isRead, setIsRead] = useState(false); //是否已已阅读
  const [isForget, setIsForget] = useState(true); //是否是忘记密码
  const [visible, setVisible] = useState(false); //设置弹框
  const { getFieldProps, validateFields, getFieldsValue,resetFields } = props.form;
  const { countDown, isClick, sendCode } = props.verCode;
  //获取验证码
  const getCode = useCallback(() => {
    if (isClick) {
      const { phone } = getFieldsValue();
      if (!utils.checkPhoneFun(phone)) return;
      sendCode();
    }
  }, [isClick, getFieldsValue,sendCode]);
  //立即注册
  const regist = useCallback(
    values => {
      const { password,} = values;
      if (!isRead) return Toast.info("请仔细阅读并同意用户服务协议");
      if (!utils.checkPassword(password)) return;
    },
    [isRead]
  );
  //关闭modal
  const closeHandle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  //切换登录和注册
  const changeLogin = useCallback((tab,index) => {  
    resetFields();
    setIsLogin(() => {
      return index == 0? true : false;
    });
  },[]);
  //短信登录
  const smsLogin = useCallback(
    values => {
      const { smsNumber, phone } = values;
      if (!utils.checkPhoneFun(phone)) return;
    },
    []
  );

  const next = useCallback(() => {
    validateFields((err, values) => {
      if (err) return;
      if (isForget&&isLogin) {
        return smsLogin(values);
      }
      if (isLogin) {
        login(values);
      } else {
        regist(values);
      }
    });
  }, [validateFields, isForget, isLogin, smsLogin, login, regist]);
  //点击登录
  const login = useCallback(
    values => {
      const { password, phone } = values;
      if (!utils.checkPhoneFun(phone)) return;
    },
    []
  );
  //忘记密码
  const forgetPassword = () => {
    setIsForget(!isForget);
  };
  //是否已阅读
  const readHandle = useCallback(flag => {
    setIsRead(flag);
  }, []);
  //产看用户协议
  const serviceArg = useCallback(
    e => {
      e.stopPropagation();
      closeHandle();
    },
    [closeHandle]
  );
  const tabs = [
    { title: '登陆', sub: '1' },
    { title: '注册', sub: '2' }
  ];
  return (
    <div className="login-wrapper">
      <div className="login-top">
        <img
          className="logo"
          src={require("../../common/images/logo.png")}
          alt="logo"
        />
        <div className = "app-name">
            惠商超
        </div>
      </div>
      <div className="main">
      <Tabs tabs={tabs}
      initialPage={0}
      onChange={(tab, index) => changeLogin(tab,index)}
    >
      <div>
              {isLogin&&<List>
                <InputItem
                  type="number"
                  placeholder="请输入手机号"
                  {...getFieldProps("phone", {
                    rules: [{ required: true, message: "请输入手机号" }]
                  })}
                  clear
                >
                  <img src={require("../../common/images/icon1@2x.png")} alt="" />
                </InputItem>
                {isForget?( <InputItem
                  placeholder="输入验证码"
                  {...getFieldProps("smsNumber", {
                    rules: [{ required: true, message: "获取验证码" }]
                  })}
                  maxLength={6}
                  minLength={6}
                  type="number"
                >
                  <img src={require("../../common/images/icon2@2x.png")} />
                  <a className="g-code" onClick={getCode}>
                    {isClick ? "获取验证码" : countDown}
                  </a>
                </InputItem>):( <InputItem
                  placeholder={
                    !isLogin ? "密码必须包含字母和数字长度6-20" : "输入登录密码"
                  }
                  type="password"
                  {...getFieldProps("password", {
                    rules: [{ required: true, message: "设置或输入登录密码" }]
                  })}
                  clear
                >
                  <img src={require("../../common/images/icon3@2x.png")} alt="" />
                </InputItem>)}
              </List>
              }<Button
            disable={utils.isDisable(getFieldsValue)}
            style={{ marginTop: "98px" }}
            onClick={next}
          >
            {isForget?"短信登陆":"密码登陆"}
          </Button>
      </div>
      <div>
      {(!isLogin)&& <List>
        <InputItem
          type="number"
          placeholder="请输入手机号"
          {...getFieldProps("phone", {
            rules: [{ required: true, message: "请输入手机号" }]
          })}
          clear
        >
          <img src={require("../../common/images/icon1@2x.png")} alt="" />
        </InputItem>
          <InputItem
            placeholder="输入验证码"
            {...getFieldProps("smsNumber", {
              rules: [{ required: true, message: "获取验证码" }]
            })}
            maxLength={6}
            minLength={6}
            type="number"
          >
            <img src={require("../../common/images/icon2@2x.png")} />
            <a className="g-code" onClick={getCode}>
              {isClick ? "获取验证码" : countDown}
            </a>
          </InputItem>
          <InputItem
            placeholder={
              !isLogin ? "密码必须包含字母和数字长度6-20" : "输入登录密码"
            }
            type="password"
            {...getFieldProps("password", {
              rules: [{ required: true, message: "设置或输入登录密码" }]
            })}
            clear
          >
            <img src={require("../../common/images/icon3@2x.png")} alt="" />
          </InputItem>
          <List.Item>
              <Agree onChange={readHandle}>
                已阅读并同意
                <a className="Agreement-a" onClick={serviceArg}>
                  《用户服务协议》
                </a>
              </Agree>
          </List.Item>
      </List>
      }
      <Button
    disable={utils.isDisable(getFieldsValue)}
    style={{ marginTop: "98px" }}
    onClick={next}
  >
    立即注册
  </Button>
      </div>
    </Tabs>
          <a className="register" onClick={forgetPassword}>
            {isLogin && (isForget ? "密码登陆" : "短信登录")}
          </a>
      </div>
      <AgreementModal visible={visible} onClose={closeHandle} />
    </div>
  );
}
export default verCode()(createForm()(Login));
