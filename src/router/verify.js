import { lazy } from "react";

export default [
    {
        path:"/verify",
        component: lazy(() => import("@/pages/verify")), //对账
        exact: true,
        name: "对账"
    }
]