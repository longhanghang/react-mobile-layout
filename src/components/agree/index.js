import React, { useMemo, memo, useState,useCallback } from 'react'
import './index.less'

const Argee = memo(function argee(props) {
    const [flag, setFlag] = useState(false)
    const onChange = useCallback(() => {
        props.onChange&&props.onChange(!flag)
        setFlag(!flag)
    })
    return (
        <div className="agreement" onClick={onChange}>
            <input type="checkbox" checked={flag} />
            <span>{props.children}</span>
        </div>
    )
})

export default Argee

