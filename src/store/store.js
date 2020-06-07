import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    tabActiveIndex: 0, // 当前一级导航
    systemType: "", // 系统类型 ios/Android
    navAn: "slide-left",
    // qiniuaddr: "http://95youhe.com/" // 七牛地址
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {}
});