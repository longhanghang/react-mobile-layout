import React, { Component } from "react";
import { Toast } from "antd-mobile";
import { connect } from "react-redux";
import BScroll from "better-scroll";
import "./index.less";

@connect(state => ({ redux: state }))
class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "custom-scroll-" + parseInt(Math.random() * 1000),
      isLoad: true,
      text: "松开刷新",
      time: ""
    };
  }

  componentDidMount() {
    let wraper = document.querySelector("." + this.state.className);
    this.scroll = new BScroll(wraper, {
      click: true,
      scrollY: true
    });
    //下拉刷新滚动事件
    if (this.props.pullDown) {
      this.scroll.on("touchEnd", pos => {
        if (pos.y > 50) {
          this.setState({
            isLoad: true
          });
          this.props.pullDown && this.props.pullDown();
        } else {
          this.scroll.refresh();
        }
      });
    }

    if (this.props.pullUp) {
      this.scroll.on("scrollEnd", () => {
        // 滚动到底部 上拉加载
        if (this.scroll.maxScrollY == 0) {
          return;
        }
        if (this.scroll.y <= this.scroll.maxScrollY + 100) {
          if (!this.props.isMore) {
            return this.setState({
              isLoad: false
            });
          }
          this.props.pullUp();
        }
      });
    }
    this.initTime();
  }
  UNSAFE_componentWillReceiveProps() {
    if (this.props.isLoad) {
      this.setState({
        isLoad: true
      });
    }
  }
  componentWillUnmount() {
    this.scroll.destroy();
    this.scroll = null;
  }
  componentDidUpdate() {
    this.scroll.refresh();
  }
  initTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    h = h < 10 ? "0" + h : h;
    this.setState({
      time: h + ":" + m
    });
  }
  render() {
    let propsStyle = this.props.style || {};
    let deviceInfo =
      this.props.redux.deviceInfo && this.props.redux.deviceInfo.deviceInfo;
    const isHair = deviceInfo.isHair || false; // 是否适配刘海屏
    let isMine = window.location.hash === "#/mine";
    let style = {
      position: "absolute",
      top: isHair == "1" ? "1.68rem" : "1.28rem",
      left: "0",
      bottom: "1rem",
      width: "100%",
      ...propsStyle,
      zIndex: 11
    };

    return (
      <div className={this.state.className} style={style}>
        <div>
          {this.props.pullDown && (
            <div className="huojian">
              <div className={`huojian-box ${isMine ? "white" : ""}`}>
                {/* <embed src={require('../../images/huojian.svg')} width="60px" /> */}
                <span className="shuaxin">{this.state.text}</span>
                <span className="time">{this.state.time}</span>
              </div>
            </div>
          )}

          {this.props.children}
          {this.props.pullUp &&
            (this.props.isMore ? (
              <div className="pull-up">上拉加载更多...</div>
            ) : (
              ""
            ))}
          {!this.state.isLoad && this.props.pullUp && (
            <div className="pull-up">没有更多了...</div>
          )}
        </div>
        {
          // this.props.pullDown ?
          //     <div style={imgStle}>
          //         <img src={require('../../images/icon-loading.gif')} width="24px" />
          //         {/* <div>下拉刷新</div>  */}
          //     </div> : null
        }
      </div>
    );
  }
}

export default Page;
