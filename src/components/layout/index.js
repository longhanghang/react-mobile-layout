import React, { memo, useEffect, useRef, useMemo, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Icon, PullToRefresh } from "antd-mobile";
import "./index.less";
import { useSelector } from "react-redux";
const rightIcon = require("@common/images/bangzhu@2x.png");
const Layout = memo(function Layout(props) {
  let { deviceInfo = {} } = useSelector(state => state.deviceInfo);
  const ListenerKey = "NavigationBarReturnListener";
  // const [state, setState] = useState(1)
  let {
    isHeader,
    isHair = deviceInfo.isHair == 1 ? true : false,
    isFooter,
    isBack,
    back,
    title,
    rightButton = "",
    rightButtonCall
  } = props.params || {};

  const backHandle = () => {
    if (back) {
      return back();
    }
    props.history.go(-1);
  };
  const rightAction = () => {
    if (rightButtonCall) {
      rightButtonCall();
    }
  };
  useEffect(() => {
    if (window.YHAuthorize) {
      window.YHAuthorize.View.addEventListener(
        ListenerKey,
        navigationBarReturnEvent,
        false
      );
    }
    return () => {
      if (window.YHAuthorize) {
        window.YHAuthorize.View.removeEventListener(
          ListenerKey,
          navigationBarReturnEvent,
          false
        );
      }
    };
  }, []);
  const navigationBarReturnEvent = () => {
    if (!isBack) {
      return;
    }
    backHandle();
  };
  const onRefresh = useCallback(() => {
    props.params.onRefresh && props.params.onRefresh();
  }, []);
  return (
    <div className="layout">
      {isHeader && (
        <header
          className={`header ${isHair ? "hair-header" : "putong-header"}`}
        >
          <div className="header-main">
            {isBack && (
              <a className="left" onClick={backHandle}>
                <Icon size="md" type="left" />
              </a>
            )}

            <h1>{title}</h1>
            {
              <a className="right" onClick={rightAction}>
                {rightButton}
              </a>
            }
          </div>
        </header>
      )}
      <section className="main ">
        {props.params.isRefresh ? (
          <PullToRefresh
            direction="down"
            refreshing={props.params.refreshing}
            distanceToRefresh={window.devicePixelRatio * 25}
            damping={150}
            onRefresh={onRefresh}
          >
            {props.children}
          </PullToRefresh>
        ) : (
          props.children
        )}
      </section>
      {isFooter && (
        <nav className="nav">
          <NavLink to={"/home"} activeClassName="active">
            <i className="loan-icon"></i>
            融资
          </NavLink>
          <NavLink to={"/iou"} activeClassName="active">
            <i className="borrowReceiptList-icon"></i>
            借据
          </NavLink>
          {
            <NavLink to={"/verify"} activeClassName="active">
              <i className="verify-icon"></i>
              对账
            </NavLink>
          }
          <NavLink to={"/mine"} activeClassName="active">
            <i className="mine-icon"></i>
            我的
          </NavLink>
        </nav>
      )}
    </div>
  );
});
export default withRouter(Layout);
