<template>
  <div class="container" id="setUpAccount">
    <navBar />
    <div class="main">
      <van-field
        type="tel"
        v-model="account"
        clearable
        left-icon="phone-circle-o"
        placeholder="请输入好友手机号"
      />
      <van-field v-model="code" center clearable placeholder="请输入验证码" left-icon="comment-o">
        <template #button>
          <van-button
            round
            type="info"
            style="width: 2.3rem;"
            class="solidBtn"
            @click="sendchecknum"
            :disabled="checkNumDisabled"
          >
            <span v-if="checkNumDisabled">{{countDown}}秒后重试</span>
            <span v-else>获取验证码</span>
          </van-button>
        </template>
      </van-field>
      <van-field
        type="password"
        v-model="password"
        clearable
        left-icon="bag-o"
        placeholder="请输入密码"
      />
      <div class="determineOpening">
        <p>直接帮好友开通，推荐人就是自己</p>
        <van-button round type="info" style="width: 100%;" class="solidBtn" @click="submit">确定开通</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import regexUtil from "regex-util";
export default {
  name: "setUpAccount",
  components: {
    navBar
  },
  data() {
    return {
      account: "",
      code: "",
      password: "",
      checkNumDisabled: false,
      countDown: 60,
      timer: null
    };
  },
  mounted() {},
  methods: {
    sendchecknum() {
      if (regexUtil.isPhone(this.account)) {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.$SERVER
          .getSms(this.account, "register")
          .then(res => {
            this.$toast.success("验证码发送成功！");
          })
          .catch(res => {
            this.code = "";
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$toast.fail("请输入正确的手机号码");
      }
    },
    submit() {
      if (!regexUtil.isPhone(this.account)) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if (this.code.length == 0) {
        this.$toast.fail("请填写验证码");
        return;
      }
      if (this.password.length == 0) {
        this.$toast.fail("请填写密码");
        return;
      } else if (this.password.length < 6) {
        this.$toast.fail("请输入6位或6位以上密码");
        return;
      }
      this.$SERVER
        .register(
          this.account,
          this.password,
          this.code,
          JSON.parse(this.$METHOD.getStore("userInfo")).account
        )
        .then(res => {
          this.$toast(res.msg);
        });
    }
  }
};
</script>

<style lang="less">
#setUpAccount {
  font-size: 0.26rem;
  .main {
    padding: 2.4rem 0.8rem;
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

