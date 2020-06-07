<template>
  <div id="app">
    <!-- 全局组件 -->
    <transition name="van-fade">
      <autoLaunch v-if="show" @complete="complete" />
    </transition>
    <transition :name="transitionName">
      <keep-alive :max="10" :include="keepAlive">
        <router-view v-if="!show"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
/* eslint-disable */
import router from "./router/router.js";
import autoLaunch from "@/components/autoLaunch/autoLaunch.vue";
export default {
  name: "App",
  components: {
    autoLaunch
  },
  data() {
    return {
      show: true,
      transitionName: "",
      keepAlive: [],
      id: ""
    };
  },
  created() {
    var that = this;
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    this.setRouteKeepAlive(router.options.routes);
    // 记录路由,动态给定动画
    this.$navigation.on("forward", to => {
      this.transitionName = to.route.meta.isTransition ? "slide-left" : "";
    });
    this.$navigation.on("back", (to, from) => {
      if (to.route.meta.isTransition || from.route.meta.isTransition) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    });
    this.setVux();
    if (window.navigator.userAgent.match(/APICloud/i)) {
      api.setStatusBarStyle({
        style: "dark",
        color: "rgba(255,255,255,0)"
      });
      that.$store.state.systemType = api.systemType;
      //关闭启动图
      api.removeLaunchView({
        animation: { type: "fade", duration: 0 }
      });
      var push = api.require("push");
      push.setListener(function(ret, err) {
        if (ret) {
          //仅提示音
          api.notification({
            sound: "default",
            notify: {
              title: "通知",
              content: ret.data
            }
          });
        }
      });
    }

    if (this.$METHOD.getStore("first")) {
      this.show = false;
    }
  },
  mounted() {},
  sockets: {
    connect() {
      this.id = this.$socket.id;
      this.$socket.emit("setRoom", {
        roomId: JSON.parse(this.$METHOD.getStore("userInfo")).id
      }); //监听connect事件
    },
    message(data) {
      //监听message事件，方法是后台定义和提供的
      console.log(123456);
      api.notification({
        notify: {
          title: "通知标题",
          content: data
        }
      });
      console.log(data);
    }
  },
  methods: {
    complete() {
      this.show = false;
    },
    setRouteKeepAlive(routes) {
      routes.map(item => {
        if (item.children && Array.isArray(item.children)) {
          this.setRouteKeepAlive(item.children);
        } else {
          if (item.meta && item.meta.keepAlive) {
            this.keepAlive.push(item.name);
          }
        }
      });
    },
    setVux() {
      if (this.$METHOD.getStore("token")) {
        this.$store.state.token = this.$METHOD.getStore("token");
      }
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "PingFang-SC-Medium", "Microsoft YaHei", Helvetica, Tahoma, Arial,
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  height: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 450ms;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 800;
}
.slide-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
</style>
