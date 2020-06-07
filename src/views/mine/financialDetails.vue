<template>
  <div class="container" id="financialDetails">
    <navBar />
    <div class="main">
      <div class="detailTitle">
        <div>
          <p>{{bill_sum}}</p>
          <p>累计盈利(元)</p>
        </div>
        <div>
          <p>{{cash}}</p>
          <p>可提现(元)</p>
        </div>
      </div>
      <van-tabs
        class="gradientVanTabs"
        v-model="active"
        swipeable
        background="#fff"
        title-inactive-color="#333"
        title-active-color="#333"
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
      <van-button
        round
        block
        type="info"
        style="width: 6rem;margin: 0.9rem auto 0;"
        class="solidBtn"
        @click="$router.push({name: 'destoonFinanceCash', query: {cash: cash}})"
      >立即提现</van-button>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import item from "@/views/mine/financialDetailsItem.vue";
export default {
  name: "financialDetails",
  components: {
    navBar,
    item
  },
  data() {
    return {
      tabs: ["全部", "积分", "分享", "分润", "支出"],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      bill_sum: "",
      cash: ""
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      this.$SERVER
        .billRecord(
          JSON.parse(this.$METHOD.getStore("userInfo")).id,
          this.active,
          this.page
        )
        .then(res => {
          this.bill_sum = res.data.bill_sum;
          this.cash = res.data.cash;
          res.data.list.forEach(item => {
            this.list.push(item);
          });
          // 加载状态结束
          this.loading = false;
          this.page++;
          // 数据全部加载完成
          if (res.data.list && res.data.list.length <= 0) {
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
#financialDetails {
  font-size: 0.26rem;
  .main {
    padding: 0 0.32rem 0.8rem;
    .detailTitle {
      display: flex;
      align-items: center;
      height: 1.8rem;
      background-image: linear-gradient(90deg, #353e54 0%, #4d5a78 100%),
        linear-gradient(#ffffff, #ffffff);
      background-blend-mode: normal, normal;
      border-radius: 0.2rem;
      margin: 0.3rem 0;
      > div {
        width: 50%;
        padding-left: 0.7rem;
        p:first-child {
          font-family: Bahnschrift;
          font-size: 0.5rem;
          color: #ffffff;
        }
        p:last-child {
          font-family: PingFang-SC-Regular;
          font-size: 0.24rem;
          color: #e5e5eb;
        }
      }
    }
    .gradientVanTabs {
      > div:first-child {
        border-radius: 0.2rem;
        overflow: hidden;
      }
      .van-tabs__content {
        background: #fff;
        margin-top: 0.1rem;
        border-radius: 0.2rem;
      }
      .van-list {
        height: 7.55rem;
        overflow: auto;
      }
    }
  }
}
</style>

