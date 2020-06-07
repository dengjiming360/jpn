<template>
  <div class="container" id="topUpAgreement">
    <navBar :share="true" ref="navbar" @WXShare="WXShare" />
    <div class="main">
      <div v-html="content.content"></div>
    </div>
    <weixin-share ref="weixinShare"></weixin-share>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import weixinShare from "@/components/weixinShare.vue";
export default {
  name: "topUpAgreement",
  components: {
    navBar,
    weixinShare
  },
  data() {
    return {
      content: {}
    };
  },
  mounted() {
    this.$SERVER.topUpAgreement().then(res => {
      this.content = res.data.info;
    });
  },
  methods: {
    WXShare() {
      this.$refs.weixinShare.showPop = true;
      this.$refs.weixinShare.imgUrlArr = this.$METHOD.tailoringString(
        this.content.images
      );
    }
  }
};
</script>

<style lang="less">
#topUpAgreement {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem;
    > div {
      background: #fff;
      padding: 0.3rem;
      border-radius: 0.25rem;
    }
  }
}
</style>

