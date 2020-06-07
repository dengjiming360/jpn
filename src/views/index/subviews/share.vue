<template>
  <div class="container" id="share">
    <div :style="'padding-top: ' + top + 'px;background: #fff;'"></div>
    <div class="main">
      <van-tabs
        class="whiteVanTabs"
        v-model="active"
        swipeable
        sticky
        background="#39435a"
        title-inactive-color="#fff"
        title-active-color="#fff"
        animated
        :offset-top="top"
      >
        <van-tab v-for="item in tabs" :key="item.id" :title="item.name" :name="item.id">
          <videoModule v-if="item.name == '视频'" :active="active" :share_advert="share_advert"></videoModule>
          <copywriting
            ref="copywriting"
            :active="active"
            :share_advert="share_advert"
            :addNum="addNum"
            @openShare="openShare"
            v-else
          ></copywriting>
        </van-tab>
      </van-tabs>
    </div>
    <weixin-share ref="weixinShare"></weixin-share>
  </div>
</template>
<script>
import copywriting from "@/views/index/components/copywriting.vue";
import videoModule from "@/views/index/components/videoModule.vue";
import weixinShare from "@/components/weixinShare.vue";
export default {
  name: "share",
  components: {
    copywriting,
    videoModule,
    weixinShare
  },
  data() {
    return {
      top: 0,
      active: 1,
      tabs: [],
      share_advert: {},
      itemData: {},
      addNum: false
    };
  },
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
    }
    this.$route.query.active
      ? (this.active = this.$route.query.active)
      : (this.active = 1);
    this.$SERVER.getCategory().then(res => {
      if (res.code == 1) {
        this.tabs = res.data;
      } else {
        this.tabs = [];
      }
    });
    this.$SERVER.danye("share_advert").then(res => {
      res.data.surface_image =
        this.$envconfig.baseImgUrl + res.data.surface_image;
      this.share_advert = res.data;
    });
  },
  methods: {
    openShare(data) {
      this.itemData = data;
      this.$refs.weixinShare.showPop = true;
      this.$refs.weixinShare.imgUrlArr = this.$METHOD.tailoringString(
        this.itemData.images
      );
    }
  }
};
</script>

<style lang="less">
#share {
  font-size: 0.26rem;
  .videoBox {
    width: 100%;
    height: 5rem;
  }
}
</style>