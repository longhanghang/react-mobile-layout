/*
 * @Author: yang bo
 * @Date: 2020-03-10 10:38:13
 * @LastEditors: yang bo
 * @LastEditTime: 2020-03-13 11:16:12
 * @Description: 
 */
import React, { memo } from "react";
import { Icon } from "antd-mobile";
//top
const Top = memo(props => {
  return (
    <div className="top">
      <div className="top-main">
        <div className="left"></div>
        <div className="center">
          <p>企业名称:{props.personalCenter.custName}</p>
          <p>法定代表人:{props.personalCenter.juriName}</p>
          <p>法定代表人手机号:{props.personalCenter.juriTel}</p>
        </div>
        {/* <div className="right">
          <Icon type="right" />
        </div> */}
      </div>
      {/* 这是个警告； 离开电脑得时候要锁屏 小心被认删库跑路 hhhhhhhh~ */}
    </div>
  );
});
export default Top;
