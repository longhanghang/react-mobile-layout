import React from 'react'
import './index.less'
//button 按钮
function Button(props) {
    return (
        <div className="border-button">
            <button style={props.style}>
                {props.children}
            </button>
        </div>

    )
}
export default Button