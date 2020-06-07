<template>
  <div class="weixinShare">
    <van-overlay :show="showPop" z-index="9999">
      <van-nav-bar
        title="微信"
        left-text="关闭"
        @click-left="onClickLeft"
        :style="'margin-top:' + top + 'px;'"
      />
      <div ref="capture" style="padding: 0.3rem 0;">
        <van-swipe class="my-swipe" :show-indicators="false">
          <van-swipe-item v-for="(item, i) in imgUrlArr" :key="i">
            <img :src="item" alt class="imgBox" />
          </van-swipe-item>
        </van-swipe>
        <div class="qrcodeBox">
          <vue-qr :text="vueQrTxt" :size="100"></vue-qr>
          <p>邀请人: {{account}}</p>
        </div>
      </div>
      <div style="margin-top: 0.5rem;">
        <van-button round type="info" icon="wechat" @click="WEIXINShare">微信分享</van-button>
        <van-button round type="info" icon="wechat" @click="PYQShare">朋友圈分享</van-button>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import html2canvas from "html2canvas";
export default {
  name: "weixinShare",
  components: { vueQr },
  data() {
    return {
      showPop: false,
      vueQrTxt: "",
      account: "",
      imgUrlArr: [],
      top: 0
    };
  },
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top += 25;
    }
    if (systemType == "ios") {
      this.top += 30;
      this.searchEmptyShow = true;
    }
    this.vueQrTxt =
      this.$envconfig.baseImgUrl +
      "/index/index/share?spread=" +
      JSON.parse(this.$METHOD.getStore("userInfo")).account;
    this.account = JSON.parse(this.$METHOD.getStore("userInfo")).account;
  },
  methods: {
    onClickLeft() {
      this.showPop = false;
    },
    WEIXINShare() {
      this.generatorImage("session");
    },
    PYQShare() {
      this.generatorImage("timeline");
    },
    //点击生成图片
    generatorImage(scene) {
      let that = this;
      html2canvas(that.$refs.capture, { useCORS: true }).then(canvas => {
        that.$SERVER
          .qrcode({ base64_img: canvas.toDataURL() })
          .then(response => {
            let url = that.$envconfig.baseImgUrl + response.data;
            let imgName = new Date().getTime();
            api.download(
              {
                url: url, // 图片地址
                savePath: "fs://" + imgName + ".jpg", // 图片存储路径
                report: true,
                cache: true,
                allowResume: true
              },
              function(res, err) {
                if (res.state == 1) {
                  var wx = api.require("wx");
                  wx.shareImage(
                    {
                      apiKey: "wx3296cb6866fecb83",
                      scene: scene,
                      // thumb: "fs://" + imgName + ".jpg",
                      contentUrl: "fs://" + imgName + ".jpg"
                    },
                    function(ret, err) {
                      if (ret.status) {
                        that.$toast.success("分享成功");
                      } else {
                        that.$toast.fail("分享失败");
                      }
                      that.showPop = false;
                    }
                  );
                } else {
                }
              }
            );
          });
      });
    }
  }
};
</script>

<style lang="less">
.weixinShare {
  .van-overlay {
    text-align: center;
    background: #fff;
    .van-nav-bar {
      border-bottom: 1px solid #ccc;
      margin-bottom: 0.3rem;
    }
    .my-swipe {
      .van-swipe-item {
        .imgBox {
          max-width: 55%;
        }
      }
    }
    .van-button {
      background-color: #4caf50;
      border: 0.02rem solid #4caf50;
      margin: 0 0.3rem;
    }
  }
}
</style>