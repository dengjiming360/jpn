<template>
  <div class="container" id="performance">
    <navBar />
    <div class="main">
      <van-tabs
        class="gradientVanTabs"
        v-model="active"
        swipeable
        background="#39435a"
        title-inactive-color="#fff"
        title-active-color="#fff"
        animated
        sticky
        :border="false"
        @change="onChange"
      >
        <van-tab :title="item" v-for="(item, i) in tabs" :key="i">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <item v-for="items in list" :key="items.id" :val="items"></item>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import item from "@/views/mine/performanceItem.vue";
export default {
  name: "performance",
  components: {
    navBar,
    item
  },
  data() {
    return {
      tabs: ["今日业绩", "历史业绩"],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      this.$SERVER
        .todayPerform(
          JSON.parse(this.$METHOD.getStore("userInfo")).id,
          this.active + 1,
          this.page
        )
        .then(res => {
          if (res.code == 1) {
            res.data.forEach(item => {
              item.avatar = this.$envconfig.baseImgUrl + item.avatar;
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
    onChange(name, title) {
      this.page = 1;
      this.list = [];
      this.onLoad();
    }
  }
};
</script>

<style lang="less">
#performance {
  font-size: 0.26rem;
  .main {
    .gradientVanTabs {
      .van-list {
        background: #fff;
        border-radius: 0.25rem;
      }
      > div:first-child {
        position: fixed;
        width: 100%;
        z-index: 9;
      }
      .van-tabs__content {
        padding-top: 1rem;
      }
      .van-tab__pane {
        padding: 0.3rem 0.32rem;
      }
    }
  }
}
</style>

