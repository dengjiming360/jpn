<template>
  <div class="container" id="danye">
    <navBar :title="info.title" :share="true" ref="navbar" @WXShare="WXShare" />
    <div class="main">
      <div v-html="info.content"></div>
    </div>
    <weixin-share ref="weixinShare"></weixin-share>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import weixinShare from "@/components/weixinShare.vue";
export default {
  name: "danye",
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
    this.$SERVER.danye(this.$route.query.type).then(res => {
      this.info = res.data;
    });
  },
  methods: {
    WXShare() {
      this.$refs.weixinShare.showPop = true;
      this.$refs.weixinShare.imgUrlArr = this.$METHOD.tailoringString(
        this.info.images
      );
    }
  }
};
</script>

<style lang="less">
#danye {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem;
  }
}
</style>





