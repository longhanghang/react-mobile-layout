import React, { useMemo } from 'react';
import Layout from "@/components/layout";

const verify = props => {
    const params = useMemo(() => ({
        title: "个人中心",
        isHeader: true,
        isBack: false,
        isFooter: true
    }),[])
    return(
        <Layout params = {params}>
            <div className = "verify-wapper">
                我是对账页面
            </div>
        </Layout>
    )
}

export default verify;
