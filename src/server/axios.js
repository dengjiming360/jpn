import Vue from "vue";
import axios from "axios";
import qs from "qs";
import envconfig from "./envconfig.js";
import router from "@/router/router.js";
import store from "../store/store";
import {
  Toast
} from "vant";
Vue.use(Toast);

// 状态码错误信息
const codeMessage = {
  1: "请求成功",
  0: "请求失败",
  401: "请登录后操作"
};

// 发起请求前
axios.interceptors.request.use(
  config => {
    if (config.LOADINGHIDE) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "加载中..."
      });
    }
    // qs转换
    if (config.method.toUpperCase() != "GET") {
      if (Object.prototype.toString.call(config.data) !== '[object FormData]') config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    Toast.fail("加载超时");
    return Promise.reject(error);
  }
);
// 发起请求后
axios.interceptors.response.use(
  res => {
    Toast.clear();
    return res;
  },
  error => {
    Toast.clear();
    if (error) {
      // 请求配置发生的错误
      if (!error.response) {
        return console.log("error", error.message);
      }

      // 获取状态码
      const status = error.response.status;
      const errortext = codeMessage[status] || error.response.statusText;

      // 提示错误信息
      Toast.fail(errortext);
    }
    return Promise.reject(error);
  }
);

export default class Axios {
  axios(method, url, params, config) {
    return new Promise((resolve, reject) => {
      if (typeof params !== "object") params = {};
      let _option = Object.assign({
          method,
          url,
          baseURL: envconfig.baseURL,
          timeout: 30000,
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          // withCredentials: true, //是否携带cookies发起请求
        },
        config
      );
      // 添加token
      _option.headers = {
        ..._option.headers,
        token: store.state.token || "",
        // userid: store.state.userInfo.userid || ""
        // Cookie: "JSESSIONID=" + window.localStorage.getItem('Cookie')
      };

      // 处理get、post传参问题
      method.toUpperCase() != "GET" ?
        // (_option.data = {...params,...{token:store.state.token}}) :
        (_option.data = Object.prototype.toString.call(params) === '[object FormData]' ? params : {
          ...params,
          // ...{
          //   token: store.state.token
          // }
        }) :
        (_option.params = params);
      // 请求成功后服务器返回二次处理
      axios.request(_option).then(
        res => {
          if (res.data.code == 1) {
            resolve(res.data);
          } else {
            Toast.fail(res.data.msg);
            reject(res.data)
          }
        },
        error => {
          if (error.response) {
            reject(error.response.data);
          } else {
            reject(error);
          }
        }
      );
    });
  }
}