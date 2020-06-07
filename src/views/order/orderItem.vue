
<template>
  <div class="orderItem">
    <div>
      <div>
        <p>{{val.bank_name}}</p>
        <p>{{val.add_time_text}}</p>
      </div>
      <van-button
        round
        type="info"
        style="width: 1.8rem;"
        size="small"
        class="solidBtn"
        v-if="val.apply_status == 1"
      >审核中</van-button>
      <van-button
        round
        type="info"
        style="width: 1.8rem;"
        size="small"
        class="successBtn"
        v-if="val.apply_status == 2"
      >审核成功</van-button>
      <van-button
        round
        type="info"
        style="width: 1.8rem;"
        size="small"
        class="errorBtn"
        v-if="val.apply_status == 3"
      >审核失败</van-button>
    </div>
    <div>
      <div>
        <p>{{val.integral}}</p>
        <p>使用积分</p>
      </div>
      <div>
        <p>{{val.price}}元</p>
        <p>兑换金</p>
      </div>
      <div>
        <p>{{val.apply_period}}</p>
        <p>审核周期</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderItem",
  components: {},
  props: {
    val: {}
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.orderItem {
  background-color: #ffffff;
  border-radius: 0.2rem;
  padding: 0 0.33rem;
  margin-bottom: 0.2rem;
  > div {
    height: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      p:first-child {
        font-family: PingFang-SC-Bold;
        font-size: 0.3rem;
        color: #333333;
        margin-bottom: 0.05rem;
      }
      p:last-child {
        font-family: PingFang-SC-Medium;
        font-size: 0.26rem;
        color: #999999;
      }
    }
  }
  > div:last-child {
    justify-content: space-between;
    border-top: 0.01rem solid #f0f0f2;
  }
}
</style>