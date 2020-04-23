import React, { useMemo } from "react";
import Layout from "@/components/layout";
import "./index.less";


const BorrowReceiptList = props => {
  const params = useMemo(() => ({
    title: "借据清单",
    isBack: false,
    isFooter: true,
    isHeader: true
  }),[])
  return (
    <Layout params={params}>
      <div className="receipt-list">
          我是借据页面
      </div>
    </Layout>
  );
};

export default BorrowReceiptList;
