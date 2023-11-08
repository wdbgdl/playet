// 引入mockjs
import Mock from "mockjs";
import { scrollData } from "./index";

Mock.setup({
  timeout: 700,
});

/** post请求添加表格数据 */
Mock.mock("/tv", "get", () => {
  return {
    code: "200",
    message: "success",
    result: scrollData,
  };
});

/** post请求添加表格数据 */
Mock.mock("/likeTv", "get", () => {
  return {
    code: "200",
    message: "success",
    result: scrollData,
  };
});

/** post请求添加表格数据 */
Mock.mock("/recordList", "get", () => {
  return {
    code: "200",
    message: "success",
    result: scrollData,
  };
});
