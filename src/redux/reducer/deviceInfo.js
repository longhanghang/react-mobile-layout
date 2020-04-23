
import * as types from "../types/index.js";

const deviceInfo = (state = {},{ type,data }) => {
    switch(type){
        case types.SET_DEVICE_INFO:
            return {
                ...state,
                deviceInfo:data
            };
            default:
                return state;
    }
}
export default deviceInfo;


