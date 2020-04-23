import React, { useMemo } from "react";
import Layout from "@/components/layout";

import "./index";

const Home = props => {
 const params = useMemo(() => ({
    title: "主页",
    isBack: false,
    isFooter: true,
    isHeader: true
 }),[])
  return (
    <Layout params={params}>
      <div className="loan-wrapper">
          我是融资页面
      </div>
    </Layout>
  );
};

export default Home;
