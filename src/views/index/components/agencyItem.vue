<template>
  <div class="agencyItem">
    <div class="infoBox" :style="'background-image: url('+ user_level.background_img +');'">
      <div class="userBox" v-if="userInfo.level != 1">
        <img :src="userInfo.avatar" alt />
        <span>{{userInfo.nickname}}</span>
      </div>
      <div class="approach" v-if="userInfo.level != 1">
        <span>途径</span>
        <span>充值</span>
        <span>邀请</span>
        <span>兑换</span>
      </div>
    </div>
    <div class="upgrade" v-if="userInfo.level == 1">
      <van-button
        round
        type="info"
        style="width: 48%;"
        class="solidBtn"
        @click="$emit('freeUpdate')"
      >免费升级</van-button>
      <van-button
        round
        type="info"
        style="width: 48%;"
        class="solidBtn"
        @click="$emit('upgradeDeposit')"
      >押金升级</van-button>
    </div>
    <div class="agentAdvantage">
      <ul>
        <li>
          <h4>{{user_level.request_one}}</h4>
          <div v-html="user_level.answer_one"></div>
        </li>
        <li>
          <h4>{{user_level.request_two}}</h4>
          <div v-html="user_level.answer_two"></div>
        </li>
      </ul>
    </div>
    <div class="integralPrice">
      <h4>积分价格(元/万积分)</h4>
      <table>
        <tr>
          <th>银行</th>
          <th>会员</th>
          <th>代理</th>
          <th>审核周期</th>
        </tr>
        <tr v-for="item in price_list" :key="item.id">
          <td>{{item.bank_name}}</td>
          <td>{{item.member_price}}</td>
          <td>{{item.agency_price}}</td>
          <td>{{item.apply_period}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "agencyItem",
  components: {},
  props: {
    price_list: [],
    user_level: {}
  },
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.userInfo = JSON.parse(this.$METHOD.getStore("userInfo"));
      this.userInfo.avatar = this.$envconfig.baseImgUrl + this.userInfo.avatar;
    }
  }
};
</script>

<style lang="less">
.agencyItem {
  .infoBox {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top center;
    border-radius: 0.2rem;
    width: 100%;
    margin-bottom: 0.3rem;
    height: 3.9rem;
    position: relative;
    .userBox {
      position: absolute;
      top: 0.3rem;
      left: 0.5rem;
      display: flex;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-right: 0.12rem;
      }
      span {
        font-size: 0.28rem;
        color: #fff;
        padding-top: 0.5rem;
      }
    }
    .approach {
      position: absolute;
      bottom: 0.8rem;
      left: 0.65rem;
      font-size: 0.3rem;
      span {
        color: #e5e8f1;
        margin-right: 0.1rem;
      }
      span:nth-child(1) {
        color: #050609;
      }
    }
  }
  .upgrade {
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .agentAdvantage {
    padding: 0 0.3rem;
    li {
      padding: 0.6rem 0 0 0.25rem;
      h4 {
        padding-left: 0.45rem;
        font-weight: bold;
        margin-bottom: 0.15rem;
        color: #000;
      }
      /* p {
        padding-left: 0.32rem;
        font-size: 0.24rem;
        color: #5d5d5d;
      } */
    }
  }
  .integralPrice {
    background: #fff;
    padding: 0 0.35rem 0.5rem;
    margin: 0.5rem 0;
    h4 {
      line-height: 0.94rem;
      text-align: center;
      width: 3.17rem;
      color: #054a9d;
      border-bottom: 0.05rem solid #054a9d;
      margin: 0 auto;
      font-weight: bold;
    }
    table {
      th {
        line-height: 0.8rem;
        color: #496ca6;
      }
      td {
        line-height: 0.6rem;
        border: 1px solid #e3e3e3;
      }
      td:nth-child(3) {
        color: #496ca6;
        font-weight: bold;
      }
    }
  }
}
</style>

