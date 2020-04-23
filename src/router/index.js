import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import Loading from "@/components/loading";
import App from "../app";

import routers from "./router";
export default function IRouter() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <App>
          {routers.map(item => (
            <Route {...item} key={item.path} />
          ))}
          <Redirect from="/*" to="/login" />
        </App>
      </Suspense>
    </Router>
  );
}
