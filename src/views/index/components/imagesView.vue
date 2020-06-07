<template>
  <div class="container" id="imagesView">
    <navBar :download="true" @download="generatorImage" />
    <div class="main" ref="capture">
      <van-swipe class="my-swipe" indicator-color="white" @change="onChange">
        <van-swipe-item v-for="(item, i) in imgUrl" :key="i">
          <div style="height: 100%;">
            <img :src="item" alt class="imgBox" />
            <div class="qrcodeBox">
              <vue-qr :text="vueQrTxt" :size="100"></vue-qr>
              <p>邀请人: {{account}}</p>
            </div>
          </div>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{imgUrl.length}}</div>
        </template>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import vueQr from "vue-qr";
import html2canvas from "html2canvas";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "imagesView",
  components: { vueQr, navBar },
  data() {
    return {
      imgUrl: [],
      vueQrTxt: "",
      account: "",
      current: 0
    };
  },
  mounted() {
    if (this.$route.query.url.indexOf(",") == -1) {
      this.imgUrl.push(this.$route.query.url);
    } else {
      let arr = this.$route.query.url.split(",");
      arr.forEach(item => {
        item = this.$envconfig.baseImgUrl + item;
        this.imgUrl.push(item);
      });
    }
    this.vueQrTxt =
      this.$envconfig.baseImgUrl +
      "/index/index/share?spread=" +
      JSON.parse(this.$METHOD.getStore("userInfo")).account;
    this.account = JSON.parse(this.$METHOD.getStore("userInfo")).account;
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    //点击生成图片
    generatorImage() {
      let that = this;
      html2canvas(this.$refs.capture, { useCORS: true }).then(canvas => {
        this.$SERVER.qrcode({ base64_img: canvas.toDataURL() }).then(res => {
          var filename = new Date().getTime() + ".jpg";
          var url = this.$envconfig.baseImgUrl + res.data;
          api.download(
            {
              url: url,
              savePath: "fs://" + filename
            },
            function(ret, err) {
              if (ret.state == 1) {
                api.saveMediaToAlbum(
                  {
                    path: "fs://" + filename
                  },
                  function(ret, err) {
                    if (ret && ret.status) {
                      that.$toast.success("保存成功");
                    } else {
                      that.$toast.fail("保存失败");
                    }
                  }
                );
              } else {
                that.$toast.fail("保存失败");
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
#imagesView {
  font-size: 0.26rem;
  .main {
    background: #fff;
    .my-swipe {
      height: 100%;
      text-align: center;
      .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .imgBox {
      width: 80%;
      max-height: 70%;
      margin-top: 0.5rem;
    }
  }
}
</style>





