import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Router from "./router"; //全局引入Router文件
import store from "@redux/store";

// import "@common/js/init";
// import "@common/css/init";
if (DEV) {
  const VConsole = require("vconsole");
  new VConsole();
}

let ele = document.getElementById("root");
if (module.hot) {
  module.hot.accept("./router/router", function() {
    let Router = require("./router/router").default;
    renderDom(Router);
  });
}
function renderDom(Router) {
  ReactDOM.render(
    <Provider store={store}>
      <Router />
    </Provider>,
    ele
  );
}
renderDom(Router);
