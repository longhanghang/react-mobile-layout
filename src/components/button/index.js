import React, { memo } from "react";
import "./index.less";
const Button = memo(function Button(props) {
  return (
    <div className="button button-x-yh" style={props.style}>
      <button
        disabled={props.disable}
        onClick={props.onClick}
        className={props.disable ? "disabled" : ""}
        style={props.buttonStyle}
      >
        {props.children || props.title}
      </button>
    </div>
  );
});
export default Button;
