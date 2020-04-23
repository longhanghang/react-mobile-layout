import React from "react"
const verCode = (count = 60) => WrapComponent =>
  class Index extends React.Component {
    constructor(props) {
      super(props);
      this.timer = null;
      this.state = {
        countDown: count, //倒计时默认60
        isClick: true //是否可以点击
      };
      this.TIMERLOCAL = "TIMERLOCAL" + window.location.hash;
    }
    UNSAFE_componentWillMount() {
      let timerLocal = window.localStorage.getItem(this.TIMERLOCAL);
      if (timerLocal) {
        timerLocal = JSON.parse(timerLocal);
        let nowTime = new Date().getTime();
        let c = nowTime - timerLocal.nowTime;
        if (c <= timerLocal.countDown) {
          this.setState(
            {
              countDown: parseInt((timerLocal.countDown - c) / 1000),
              isClick: false
            },
            () => {
              this.start();
            }
          );
        } else {
          window.localStorage.removeItem(this.TIMERLOCAL);
        }
      }
    }
    setLocal(timer) {
      window.localStorage.setItem(this.TIMERLOCAL, JSON.stringify(timer));
    }
    //发送验证码的方法
    sendCode = () => {
      this.start();
    };
    setTimeEndFun = (timeEndFun) => {
      this.timeEndFun = timeEndFun
    }
    //开始倒计时
    start = () => {
      this.setState({
        isClick: false
      })
      this.timer = setInterval(() => {
        this.setState(
          {
            countDown: this.state.countDown - 1
          },
          () => {
            this.judgeEnd(this.state.countDown);
          }
        );
      }, 1000);
    };
    //判断是否停止
    judgeEnd = countDown => {
      if (countDown <= 0) {
        clearInterval(this.timer);
        this.timer = null;
        window.localStorage.removeItem(this.TIMERLOCAL);
        this.setState({
          isClick: true,
          countDown: count
        });

        return;
      }
      this.setLocal({
        countDown: this.state.countDown * 1000,
        nowTime: new Date().getTime()
      });
    };
    componentWillUnmount() {
      clearInterval(this.timer);
      this.timer = null;
    }
    render() {
      let { countDown, isClick } = this.state;
      return (
        <WrapComponent
          {...this.props}
          verCode={{
            countDown: countDown + "秒后重试",
            isClick,
            sendCode: this.sendCode,
            setTimeEndFun: this.setTimeEndFun
          }}
        />
      );
    }
  };
export default verCode;
