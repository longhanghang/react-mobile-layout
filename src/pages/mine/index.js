import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "@/components/layout";
import Top from "./top";
import List from "./list";
import Button from "@components/button";
import { signOut } from "@/redux/action";
import "./index.less";
const Mine = props => {
  const [personalCenter, setPersonalCenter] = useState({});
  const dispatch = useDispatch();
  const params = useMemo(
    () => ({
      title: "个人中心",
      isHeader: false,
      isBack: false,
      isFooter: true
    }),
    []
  );
  const selectHandle = useCallback(
    url => {
      props.history.push(url);
    },
    [props.history]
  );
  //退出登录
  const signOutHandle = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);
  return (
    <Layout params={params}>
      <div className="mine-wrapper">
        <Top personalCenter={personalCenter} />
        <List onClick={selectHandle} />
        <Button style={{ marginTop: ".88rem" }} onClick={signOutHandle}>
          退出
        </Button>
      </div>
    </Layout>
  );
};

export default Mine;
