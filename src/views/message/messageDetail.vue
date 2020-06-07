<template>
  <div class="container" id="messageDetail">
    <navBar :share="true" ref="navbar" @WXShare="WXShare" />
    <div class="main">
      <div class="info">
        <div class="itemList">
          <img :src="info.icon_image" alt />
          <div>
            <div class="notice">{{info.title}}</div>
            <div class="explain">{{info.add_time_text}}</div>
          </div>
        </div>
        <div class="content" v-html="info.content"></div>
      </div>
    </div>
    <weixin-share ref="weixinShare"></weixin-share>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import weixinShare from "@/components/weixinShare.vue";
export default {
  name: "messageDetail",
  components: {
    navBar,
    weixinShare
  },
  data() {
    return {
      info: {}
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.$SERVER.noticeInfo(id).then(res => {
      if (res.code == 1) {
        res.data.icon_image = this.$envconfig.baseImgUrl + res.data.icon_image;
        this.info = res.data;
      }
    });
  },
  methods: {
    WXShare() {
      this.$refs.weixinShare.showPop = true;
      this.$refs.weixinShare.imgUrlArr = this.$METHOD.tailoringString(
        this.info.icon_image
      );
    }
  }
};
</script>

<style lang="less" scoped>
#messageDetail {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem;
    .info {
      background: #fff;
      padding: 0.3rem;
      border-radius: 0.25rem;
      .itemList {
        background: #fff;
        border-radius: 0.25rem;
        display: flex;
        padding: 0.2rem 0.35rem 0.2rem 0.25rem;
        display: flex;
        > img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          margin-right: 0.25rem;
        }
        .notice {
          font-size: 0.28rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.1rem;
        }
        .explain {
          color: #b3b3b3;
        }
      }
    }
  }
}
</style>