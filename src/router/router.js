import login from "./login";
import home from "./home";
import iou from "./iou";
import mine from "./mine";
import verify from "./verify";
//合并模块
export default [
  ...login,
  ...home,
  ...iou,
  ...mine,
  ...verify
];
