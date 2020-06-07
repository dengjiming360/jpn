<template>
  <div class="videoModule">
    <div class="baseBanner">
      <img :src="share_advert.surface_image" alt />
    </div>
    <div class="videoList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="30"
      >
        <van-grid gutter="0.18rem" :column-num="2">
          <van-grid-item v-for="(item, i) in list" :key="i" @click="broadcast(item.id)">
            <div
              class="imgBox"
              :style="'background-image: url('+ item.surface_image +');'"
              @click.stop="$router.push({name: 'video', query: {id: item.id}})"
            ></div>
            <div class="videoListTxt">
              <p>{{item.title}}</p>
              <p>播放量：{{item.share_num}}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  name: "videoModule",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  props: {
    active: "",
    share_advert: {}
  },
  methods: {
    onLoad() {
      this.$SERVER.dynamicList(this.active, this.page, 10).then(res => {
        if (res.code == 1) {
          res.data.forEach(item => {
            item.surface_image =
              this.$envconfig.baseImgUrl + item.surface_image;
            this.list.push(item);
          });
          // 加载状态结束
          this.loading = false;
          this.page++;
          // 数据全部加载完成
          if (res.data && res.data.length <= 0) {
            this.finished = true;
          }
        }
      });
    },
    broadcast(id) {
      this.$router.push({
        name: "video",
        query: { id: id }
      });
      this.$SERVER.addShareNum(id).then(res => {
        if (res.code == 1) {
          this.page = 1;
          this.list = [];
          this.onLoad();
        }
      });
    }
  }
};
</script>
<style lang="less">
.videoModule {
  padding: 0 0.3rem 0.52rem;
  .baseBanner {
    margin: 0.3rem 0;
    text-align: center;
    img {
      max-width: 100%;
      border-radius: 0.2rem;
    }
  }
  .videoList {
    .van-grid-item__content {
      padding: 0;
    }
    .van-grid-item__content--center {
      align-items: baseline;
      border-radius: 0.25rem;
    }
    .imgBox {
      height: 2.4rem;
      width: 100%;
      border-radius: 0.25rem;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .videoListTxt {
      padding: 0.3rem 0.25rem;
      p:nth-child(1) {
        margin-bottom: 0.1rem;
        font-size: 0.28rem;
        color: #333;
      }
      p:nth-child(2) {
        font-size: 0.24rem;
        color: #999999;
      }
    }
  }
}
</style>