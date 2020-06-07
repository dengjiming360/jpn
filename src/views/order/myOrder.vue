<template>
  <div class="container" id="myOrder">
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
            <order-item v-for="items in list" :key="items.order_id" :val="items"></order-item>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import orderItem from "@/views/order/orderItem.vue";
export default {
  name: "myOrder",
  components: {
    navBar,
    orderItem
  },
  data() {
    return {
      tabs: ["全部", "审核中", "审核成功", "审核失败"],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  mounted() {
    this.$route.query.type
      ? (this.active = this.$route.query.type)
      : (this.active = 0);
  },
  methods: {
    onLoad() {
      this.$SERVER
        .myOrder(
          JSON.parse(this.$METHOD.getStore("userInfo")).id,
          this.active,
          this.page
        )
        .then(res => {
          res.data.forEach(item => {
            this.list.push(item);
          });
          // 加载状态结束
          this.loading = false;
          this.page++;
          // 数据全部加载完成
          if (res.data && res.data.length <= 0) {
            this.finished = true;
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
#myOrder {
  font-size: 0.26rem;
  .main {
    .gradientVanTabs {
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

