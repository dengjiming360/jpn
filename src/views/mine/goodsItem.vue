<template>
  <div class="container" id="goodsItem">
    <navBar />
    <div class="main">
      <div class="goodsItemTop">
        <img :src="info.face_image" alt />
        <div class="sub_name">
          <p>{{info.sub_name}}</p>
          <p>销量:{{info.sales}}</p>
        </div>
        <div class="integral">
          <p>{{info.integral}}</p>
          <span>好享豆</span>
        </div>
      </div>
      <h4>商品详情</h4>
      <div class="goodDetail" v-html="info.content"></div>
    </div>
    <div class="notescontact">
      <div class="kefu" @click="kefu">
        <img src="~@/assets/images/creditsExchange/notescontact.png" alt />
        <span>客服</span>
      </div>
      <van-button
        class="solidBtn"
        round
        type="info"
        style="width: 5.3rem;"
        @click="$router.push({name:'exchangeGoods', query: {id: info.id}})"
      >立即兑换</van-button>
    </div>
    <pop-weixin :showWeixin="showWeixin" :weixin="weixin" @sendShowweixin="getShow"></pop-weixin>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import popWeixin from "@/components/copyWeChatID.vue";
export default {
  name: "goodsItem",
  components: {
    navBar,
    popWeixin
  },
  data() {
    return {
      info: {},
      showWeixin: false,
      weixin: ""
    };
  },
  mounted() {
    let pgoods_id = this.$route.query.id;
    this.$SERVER.goodsDetail(pgoods_id).then(res => {
      res.data.face_image = this.$envconfig.baseImgUrl + res.data.face_image;
      this.info = res.data;
    });
  },
  methods: {
    kefu() {
      this.weixin = this.info.wechat_num;
      this.showWeixin = true;
    },
    getShow(val) {
      this.showWeixin = val;
    }
  }
};
</script>

<style lang="less">
#goodsItem {
  font-size: 0.26rem;
  .main {
    .goodsItemTop {
      padding: 0.32rem;
      background: #fff;
      img {
        width: 100%;
        border-radius: 0.25rem;
        margin-bottom: 0.3rem;
      }
      .sub_name {
        margin-bottom: 0.3rem;
        p {
          margin-bottom: 0.15rem;
        }
      }
      .integral {
        display: flex;
        align-items: center;
        > p:nth-child(1) {
          font-size: 0.5rem;
          color: #ee0a24;
          margin-right: 0.1rem;
        }
      }
    }
    > h4 {
      margin: 0.2rem auto;
      width: 1.5rem;
      background: #0000ffa6;
      color: #fff;
      font-size: 0.24rem;
      line-height: 0.5rem;
      text-align: center;
      border-radius: 0.3rem;
    }
    .goodDetail {
      padding: 0.3rem;
    }
  }
  .notescontact {
    height: 1.38rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.3rem 0.2rem 0.7rem;
    .kefu {
      text-align: center;
      width: 0.63rem;
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>

