<template>
  <div class="container" id="shareGoldItem">
    <navBar />
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="shareGoldItem" v-for="item in list" :key="item.id">
          <div>
            <p>{{item.name}}</p>
            <p>{{item.add_time_text}}</p>
          </div>
          <span>+{{item.price}}</span>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "shareGoldItem",
  components: {
    navBar
  },
  data() {
    return {
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
        .orderList(
          this.page,
          JSON.parse(this.$METHOD.getStore("userInfo")).id
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
    }
  }
};
</script>

<style lang="less">
#shareGoldItem {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem 0.8rem;
    .shareGoldItem {
      height: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.7rem 0 0.6rem;
      background: #fff;
      margin-bottom: 0.3rem;
      border-radius: 0.25rem;
      span {
        font-family: PingFang-SC-Bold;
        font-size: 0.4rem;
        color: #ff5e1c;
      }
      span.outlay {
        color: #999999;
      }
      p:first-child {
        font-family: PingFang-SC-Medium;
        font-size: 0.3rem;
        letter-spacing: 0rem;
        margin-bottom: 0.1rem;
      }
      p:last-child {
        font-family: PingFang-SC-Medium;
        font-size: 0.24rem;
        color: #999999;
      }
    }
  }
}
</style>

