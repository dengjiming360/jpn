<template>
  <div class="container" id="destoonFinanceCash">
    <navBar />
    <div class="main">
      <van-field label="真实姓名:" type="text" v-model="form.realname" readonly />
      <van-field label="身份证号:" type="text" v-model="form.id_card" readonly />
      <van-field label="支付宝:" type="text" v-model="form.pay_account" readonly />
      <van-field label="提现金额:" type="number" v-model="form.meony" :placeholder="'可提现余额:' + cash" />
      <div class="determineOpening">
        <van-button round type="info" style="width: 100%;" class="solidBtn" @click="submit">提现</van-button>
        <p>最低提现金额: {{lowPrice}}元</p>
      </div>
      <div v-html="rule.content"></div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import regexUtil from "regex-util";
export default {
  name: "destoonFinanceCash",
  components: {
    navBar
  },
  data() {
    return {
      cash: "",
      form: {
        realname: "",
        id_card: "",
        pay_account: "",
        meony: "",
        uid: ""
      },
      lowPrice: 0,
      rule: {}
    };
  },
  mounted() {
    this.cash = this.$route.query.cash;
    this.form.uid = JSON.parse(this.$METHOD.getStore("userInfo")).id;
    this.form.realname = JSON.parse(this.$METHOD.getStore("userInfo")).realname;
    this.form.id_card = JSON.parse(this.$METHOD.getStore("userInfo")).idcard;
    this.form.pay_account = JSON.parse(
      this.$METHOD.getStore("userInfo")
    ).pay_account;
    this.$SERVER.getLowPrice().then(res => {
      this.lowPrice = parseInt(res.data);
    });
    this.$SERVER.danye("guide_page").then(res => {
      this.rule = res.data;
    });
  },
  methods: {
    submit() {
      if (this.form.realname.length == 0) {
        this.$toast.fail("前往个人资料添加真实姓名");
        return;
      }
      if (this.form.id_card == 0) {
        this.$toast.fail("前往个人资料添加身份证号");
        return;
      }
      if (this.form.pay_account == 0) {
        this.$toast.fail("前往个人资料添加支付宝账号");
        return;
      }
      if (this.form.meony == 0) {
        this.$toast.fail("请输入提现金额");
        return;
      }
      if (parseInt(this.form.meony) < this.lowPrice) {
        this.$toast.fail("提现金额不能小于最低提现金额");
        return;
      }
      this.$SERVER.applay(this.form).then(res => {
        if (res.data.status == 1) {
          this.$toast.success(res.data.msg);
          let obj = JSON.parse(this.$METHOD.getStore("userInfo"));
          obj.balance = res.data.balance;
          this.$METHOD.setStore("userInfo", obj);
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        } else {
          this.$toast.fail(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less">
#destoonFinanceCash {
  font-size: 0.26rem;
  .main {
    padding: 0.8rem;
    .van-cell {
      border-radius: 0.45rem;
      margin-bottom: 0.3rem;
      padding: 0 0 0 0.5rem;
      line-height: 0.9rem;
    }
    .determineOpening {
      margin: 0 auto;
      text-align: center;
      > p {
        font-family: PingFang-SC-Medium;
        font-size: 0.26rem;
        color: #333333;
        margin: 0.6rem 0 0.55rem;
      }
    }
  }
}
</style>

