/**
 * 环境配置文件
 */
let baseURL; // 接口前缀
let baseImgUrl; // 图片前缀

// 干一些线上才要做的事情
if (process.env.NODE_ENV === "production") {
  // baseURL = "http://dxhjj.cn/api/"; // 线上(接口前缀)
  // baseImgUrl = "http://dxhjj.cn"; // 线上(图片前缀)

  baseURL = "http://47.110.136.190/api/"; // ip(接口前缀)
  baseImgUrl = "http://47.110.136.190"; // ip(图片前缀)

}

// 干一些测试时不可告人的事情
if (process.env.NODE_ENV === "development") {
  // 接口前缀
  // baseURL = "/api/"; // pc
  // baseURL = "http://192.168.0.120:81/api/"; // 本地(app)
  baseURL = "http://47.110.136.190/api/"; // ip(app)
  // baseURL = "http://dxhjj.cn/api/"; // 线上(app)

  // 图片前缀
  // baseImgUrl = "http://192.168.0.120:81"; // 本地
  baseImgUrl = "http://47.110.136.190"; // ip
  // baseImgUrl = "http://dxhjj.cn"; // 线上
}
export default {
  baseURL,
  baseImgUrl
};