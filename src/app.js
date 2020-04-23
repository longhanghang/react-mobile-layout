import React, { Component } from "react";
import { withRouter, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { setDeviceInfo } from "@redux/action";
import "@common/js/init";
import "@common/css/init";
import { initBridgeByYh, getDeviceInfoByYh } from "@/nativetools";
import utils from "@/utils";
import "@common/css/app.less";

@connect(
  state => ({ reduxState: state }),
  dispatch => {
    return {
      saveDeviceInfo: data => {
        dispatch(setDeviceInfo(data));
      }
    };
  }
)
class App extends Component {
  componentDidMount() {
    document.body.addEventListener("touchstart", e => {
      if (e.target.tagName === "INPUT") {
        this.inputItem = e.target;
      }
    });
    document.body.addEventListener("touchend", e => {
      if (e.target.tagName !== "INPUT" || e.target.type === "file") {
        if (this.inputItem) {
          this.inputItem.blur();
          this.inputItem = null;
        }
      }
    });
    //初始化brige,获取设备信息
    initBridgeByYh(() => {
      getDeviceInfoByYh().then(resp => {
        this.props.saveDeviceInfo(resp.data);
      });
    });
  }

  UNSAFE_componentWillReceiveProps(props) {
    const reduxState = props.reduxState;
    if (reduxState !== this.props.reduxState) {
      if (utils.isObject(reduxState)) {
        utils.set(utils.constants.REDUX_STATE, reduxState);
      }
    }
  }
  prePathname = "";
  isParent(pathname) {
    if (
      pathname === "/home" ||
      pathname === "/iou" ||
      pathname === "/verify" ||
      pathname === "/mine"
    ) {
      if (
        this.prePathname === "/home" ||
        this.prePathname === "/iou" ||
        this.prePathname === "/verify" ||
        this.prePathname === "/mine"
      ) {
        this.prePathname = pathname;
        return true;
      }
    }
    this.prePathname = pathname;
  }
  render() {
    const { location, history } = this.props;
    const ANIMATION_MAP = {
      PUSH: "forward",
      POP: "back"
    };
    return (
      <TransitionGroup
        childFactory={child =>
          React.cloneElement(child, {
            classNames: this.isParent(location.pathname)
              ? "fade"
              : ANIMATION_MAP[history.action]
          })
        }
      >
        <CSSTransition key={location.pathname} timeout={300} exit={false}>
          <Switch location={location} key={location.pathname}>
            {this.props.children}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);
