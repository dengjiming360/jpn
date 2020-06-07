<template>
  <div class="container" id="softArticleDetails">
    <navBar :title="content.title" :share="true" ref="navbar" @WXShare="WXShare" />
    <div class="main">
      <div class="content" v-html="content.content"></div>
      <div v-for="(item, index) in imgArr" :key="index" class="imgArr">
        <img :src="item" alt />
      </div>
    </div>
    <weixin-share ref="weixinShare"></weixin-share>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import weixinShare from "@/components/weixinShare.vue";
export default {
  name: "softArticleDetails",
  components: {
    navBar,
    weixinShare
  },
  data() {
    return {
      content: {},
      imgArr: []
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.$SERVER.dynamicDetail(id).then(res => {
      if (res.code == 1) {
        this.content = res.data;
        let arr = [];
        if (res.data.images.indexOf(",") == -1) {
          let imgUrl = this.$envconfig.baseImgUrl + res.data.images;
          arr.push(imgUrl);
        } else {
          let a = res.data.images.split(",");
          a.forEach(item => {
            let imgUrl = this.$envconfig.baseImgUrl + item;
            arr.push(imgUrl);
          });
        }
        this.imgArr = arr;
      }
    });
  },
  methods: {
    WXShare() {
      this.$refs.weixinShare.showPop = true;
      this.$refs.weixinShare.imgUrlArr = this.$METHOD.tailoringString(
        this.content.images
      );
      this.$SERVER.addShareNum(this.content.id).then(res => {
        this.page = 1;
        this.list = [];
        this.onLoad();
      });
    }
  }
};
</script>

<style lang="less">
#softArticleDetails {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem;
    background: #fff;
    .content {
      margin-bottom: 0.3rem;
    }
    .imgArr {
      text-align: center;
      img {
        max-width: 100%;
      }
    }
  }
}
</style>