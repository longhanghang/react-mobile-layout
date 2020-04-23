import { lazy } from "react";
export default [
  {
    path: "/home",
    component: lazy(() => import("@/pages/home")),
    exact: true,
    name: "首页"
  },
];
