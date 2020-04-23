import { lazy } from "react";

export default [
    {
        path: "/mine",
        component: lazy(() => import("@/pages/mine")), //个人中心
        exact: true,
        name: "个人中心"
    },
]
