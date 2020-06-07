<template>
  <div class="container" id="register">
    <navBar :title="templateName" />
    <div class="main">
      <van-field
        type="tel"
        v-model="account"
        clearable
        left-icon="phone-circle-o"
        placeholder="请输入手机号"
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
      <van-field
        type="password"
        v-model="passwordConfirm"
        clearable
        left-icon="bag-o"
        placeholder="请再次输入密码"
      />
      <van-field
        type="tel"
        v-model="spread_code"
        clearable
        left-icon="phone-circle-o"
        placeholder="请输入邀请人手机号"
        v-if="templateName == '注册'"
      />
      <div class="determineOpening">
        <p v-if="templateName == '注册'">
          注册即同意
          <span>《用户协议》</span>
        </p>
        <van-button
          round
          type="info"
          style="width: 100%;"
          class="solidBtn"
          v-if="templateName == '注册'"
          @click="submit"
        >立即注册</van-button>
        <van-button
          round
          type="info"
          style="width: 100%;"
          class="solidBtn"
          v-else
          @click="submit"
        >重置密码</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import regexUtil from "regex-util";
export default {
  name: "register",
  components: {
    navBar
  },
  data() {
    return {
      templateName: "注册",
      account: "",
      code: "",
      password: "",
      passwordConfirm: "",
      spread_code: "",
      checkNumDisabled: false,
      countDown: 60,
      timer: null
    };
  },
  mounted() {
    this.templateName = this.$route.query.templateName;
  },
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
        let event = "";
        this.templateName == "注册"
          ? (event = "register")
          : (event = "resetpwd");
        this.$SERVER
          .getSms(this.account, event)
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
      if (this.password != this.passwordConfirm) {
        this.$toast.fail("两次密码输入不一致,请重新输入");
        return;
      }
      if (this.templateName == "注册") {
        this.$SERVER
          .register(
            this.account,
            this.passwordConfirm,
            this.code,
            this.spread_code
          )
          .then(res => {
            this.$toast.success(res.msg);
            this.$store.commit("setToken", null);
            this.$METHOD.removeStore("userInfo");
            this.$METHOD.removeStore("token");
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          });
      } else {
        this.$SERVER
          .resetpwd(this.account, this.passwordConfirm, this.code)
          .then(res => {
            this.$toast.success(res.msg);
            this.$store.commit("setToken", null);
            this.$METHOD.removeStore("userInfo");
            this.$METHOD.removeStore("token");
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          });
      }
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="less">
#register {
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

