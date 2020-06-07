<template>
  <div class="container" id="service">
    <navBar />
    <div class="main">
      <van-button
        round
        type="info"
        :class="{solidBtn: item.isClick}"
        v-for="(item, index) in list"
        :key="index"
        @click="service(item, index)"
      >{{item.title}}</van-button>
    </div>
    <pop-weixin :showWeixin="showWeixin" :weixin="weixin" @sendShowweixin="getShow"></pop-weixin>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import popWeixin from "@/components/copyWeChatID.vue";
export default {
  name: "service",
  components: {
    navBar,
    popWeixin
  },
  data() {
    return {
      list: [],
      showWeixin: false,
      weixin: ""
    };
  },
  mounted() {
    this.$SERVER.seviceList().then(res => {
      this.list = res.data;
    });
  },
  methods: {
    service(item, i) {
      this.weixin = item.wechat_num;
      this.list.forEach((item, index) => {
        i == index ? (item.isClick = true) : (item.isClick = false);
      });
      this.showWeixin = true;
    },
    getShow(val) {
      this.showWeixin = val;
    }
  }
};
</script>

<style lang="less">
#service {
  font-size: 0.26rem;
  .main {
    padding: 0.78rem 0.32rem 0;
    .van-button {
      width: 47%;
      margin: 0 0.22rem 0.274rem 0;
      background: #fff;
      color: #333;
      font-size: 0.24rem;
      border: none;
      font-family: PingFang-SC-Bold;
      box-shadow: 0 0.02rem 0.12rem 0 rgba(0, 0, 0, 0.1);
    }
    .solidBtn {
      color: #fff;
    }
    .van-button:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>

