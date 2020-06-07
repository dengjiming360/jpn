
<template>
  <van-popup v-model="weixinshou" closeable id="copyWeChatID">
    <div class="popupSer">
      <h4>微信号：{{weixin}}</h4>
      <div class="popupBtn">点击下方按钮完成复制，前去微信粘贴</div>
      <img src="~@/assets/images/mine/weixin.jpg" alt />
      <van-button round type="info" style="width: 4rem;" class="solidBtn" @click="toAdd">前去添加</van-button>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "copyWeChatID",
  props: {
    showWeixin: "",
    weixin: ""
  },
  data() {
    return {
      weixinshou: false
    };
  },
  watch: {
    showWeixin(newVal, oldVal) {
      this.weixinshou = newVal;
    },
    weixinshou(newVal, oldVal) {
      this.$emit("sendShowweixin", newVal);
    }
  },
  methods: {
    toAdd() {
      var that = this;
      if (this.weixin) {
        if (window.navigator.userAgent.match(/APICloud/i)) {
          var clipBoard = api.require("clipBoard");
          clipBoard.set(
            {
              value: that.weixin
            },
            function(ret, err) {
              if (ret) {
                that.$toast.success("复制成功");
                var systemType = that.$store.state.systemType;
                if (systemType == "android") {
                  api.openApp(
                    {
                      androidPkg: "com.tencent.mm",
                      mimeType: "text/html",
                      uri: "wechat://"
                    },
                    function(ret, err) {}
                  );
                }
                if (systemType == "ios") {
                  api.openApp(
                    {
                      iosUrl: "wx3296cb6866fecb83://"
                    },
                    function(ret, err) {}
                  );
                }
              } else {
                that.$toast.fail("复制失败，请重试");
              }
            }
          );
        }
      } else {
        this.$toast.fail("复制失败，微信号为空");
      }
    }
  }
};
</script>

<style lang="less">
#copyWeChatID {
  border-radius: 0.2rem;
  .popupSer {
    width: 5.9rem;
    background-color: #ffffff;
    padding-top: 0.8rem;
    padding-bottom: 0.46rem;
    text-align: center;
    > h4 {
      font-family: PingFang-SC-Bold;
      font-size: 0.4rem;
      color: #333333;
      padding: 0.2rem 0;
    }
    .popupBtn {
      width: 5rem;
      line-height: 0.5rem;
      background-image: linear-gradient(90deg, #ff5313 0%, #ff9041 100%),
        linear-gradient(#ffffff, #ffffff);
      background-blend-mode: normal, normal;
      border-radius: 0.25rem;
      margin: 0 auto 0.45rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.26rem;
      color: #ffffff;
    }
    > img {
      width: 4.5rem;
      margin-bottom: 0.35rem;
    }
  }
}
</style>