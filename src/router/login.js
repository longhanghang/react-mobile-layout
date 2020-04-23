import { lazy } from "react";

export default [
  {
    path: "/login",
    component: lazy(() => import("@/pages/login")),
    exact: true,
    name: "登录"
  },
];
