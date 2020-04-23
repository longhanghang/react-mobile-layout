import { lazy } from "react";

export default [
    {
        path: "/iou",
        component: lazy(() => import("@/pages/iou")),
        exact: true,
        name: "借据清单"
    },
]
