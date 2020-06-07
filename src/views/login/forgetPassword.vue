<template>
  <div class="container" id="forgetPassword">
    <navBar />
    <div class="main">
      <van-field
        type="tel"
        v-model="phone"
        clearable
        left-icon="phone-circle-o"
        placeholder="请输入手机号"
      />
      <van-field v-model="sms" center clearable placeholder="请输入验证码" left-icon="comment-o">
        <template #button>
          <van-button round type="info" style="width: 2.3rem;" class="solidBtn">获取验证码</van-button>
        </template>
      </van-field>
      <van-field type="password" v-model="pwd" clearable left-icon="bag-o" placeholder="请输入密码" />
      <van-field type="password" v-model="pwd2" clearable left-icon="bag-o" placeholder="请再次输入密码" />
      <div class="determineOpening">
        <van-button round type="info" style="width: 100%;" class="solidBtn">修改密码</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "forgetPassword",
  components: {
    navBar
  },
  data() {
    return {
      phone: "",
      sms: "",
      pwd: "",
      pwd2: ""
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
#forgetPassword {
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
      margin: 1rem auto;
      text-align: center;
    }
  }
}
</style>

