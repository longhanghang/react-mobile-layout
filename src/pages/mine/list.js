/*
 * @Author: yang bo
 * @Date: 2020-03-10 10:38:13
 * @LastEditors: yang bo
 * @LastEditTime: 2020-03-20 16:21:08
 * @Description: 
 */
import React, { memo, useMemo } from "react";
import { List } from "antd-mobile";
const Item = List.Item;
const img = {
  icon1: require("@common/images/comp.png"),
  icon2: require("@common/images/creitd.png"),
  icon3: require("@common/images/login1.png")
};
//top
const ListWrapper = memo(props => {
  const lists = useMemo(
    () => [
      {
        path: "/modifyPassword",
        icon: img.icon1,
        title: "登录密码",
        extra: "修改"
      },
      // {
      //   path: "/chargePerson",
      //   icon: img.icon1,
      //   title: "授权经办人",
      //   extra: ""
      // },
      // {
      //   path: "/modaifyCard",
      //   icon: img.icon2,
      //   title: "修改认证银行卡",
      //   extra: "修改"
      // },
      {
        path: "/invoice",
        icon: img.icon2,
        title: "开具发票",
        extra: ""
      },
      // {
      //   path: "/modifyMarriage",
      //   icon: img.icon2,
      //   title: "婚姻状况/补传婚姻证明",
      //   extra: "修改"
      // },
      // {
      //   path: "/reCredit",
      //   icon: img.icon2,
      //   title: "重新发起授信申请",
      //   extra: ""
      // }
      // {
      //   path: "/modifyPaymentAccount",
      //   icon: img.icon3,
      //   title: "收款账户",
      //   extra: "同收款人-建设银行-尾号2033"
      // }
    ],
    []
  );
  return (
    <div className="bottom">
      <List>
        {lists.map((item, index) => (
          <Item
            arrow="horizontal"
            extra={item.extra}
            key={index}
            onClick={() => props.onClick(item.path)}
          >
            <img src={item.icon} alt="" /> {item.title}
          </Item>
        ))}
      </List>
    </div>
  );
});
export default ListWrapper;
