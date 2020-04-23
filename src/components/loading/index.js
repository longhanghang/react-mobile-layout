import React, { memo } from "react";
import { Icon } from "antd-mobile";
import "./index.less";
const Loading = memo(function Loading(props) {
  return (
    <div className="loading-wrapper">
      <div className="loading-icon">
        <Icon type="loading" size="lg" />
      </div>
    </div>
  );
});
export default Loading;
