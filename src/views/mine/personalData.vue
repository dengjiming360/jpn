<template>
  <div class="container" id="personalData">
    <navBar />
    <div class="main">
      <div class="form">
        <div class="headPortrait">
          <img :src="avatarUrl" alt />
          <p>点击修改头像</p>
          <van-uploader :after-read="afterRead" />
        </div>
        <van-field v-model="form.nickname" label="昵称" clearable />
        <van-field v-model="form.wechat_num " label="微信号" placeholder="请输入您的微信号" clearable />
        <van-field v-model="form.realname " label="真实姓名" placeholder="请输入您的真实姓名" clearable />
        <van-field v-model="form.idcard " label="身份证号" placeholder="请输入您的身份证号" clearable />
        <van-field v-model="form.pay_account " label="支付宝帐号" placeholder="请输入您的支付宝帐号" clearable />
        <van-button
          block
          class="solidBtn"
          round
          type="info"
          style="width: 5.7rem;margin: 0.5rem auto 0;"
          @click="profile"
        >保存信息</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "personalData",
  components: {
    navBar
  },
  data() {
    return {
      avatarUrl: "",
      form: {
        uid: "",
        avatar: "",
        wechat_num: "",
        nickname: "",
        pay_account: "",
        realname: "",
        idcard: ""
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let info = JSON.parse(this.$METHOD.getStore("userInfo"));
      this.form.uid = info.id;
      this.form.avatar = info.avatar;
      this.avatarUrl = this.$envconfig.baseImgUrl + info.avatar;
      this.form.wechat_num = info.wechat_num;
      this.form.nickname = info.nickname;
      this.form.pay_account = info.pay_account;
      this.form.realname = info.realname;
      this.form.idcard = info.idcard;
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", file.file.name);
      this.$SERVER
        .upload(formData)
        .then(res => {
          this.$toast.success("上传成功");
          this.form.avatar = res.data.url;
          this.avatarUrl = this.$envconfig.baseImgUrl + res.data.url;
        })
        .catch(res => {
          this.form.avatar = "";
          this.avatarUrl = "";
        });
    },
    profile() {
      this.$SERVER.profile(this.form).then(res => {
        if (res.data.status == 1) {
          this.$toast.success(res.msg);
          this.$METHOD.setStore("userInfo", res.data.msg.userinfo);
          this.init();
        } else {
          this.$toast.fail(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="less">
#personalData {
  font-size: 0.26rem;
  .main {
    padding: 0.77rem 0.32rem 0;
    .form {
      padding: 0.66rem 0.4rem 1.1rem;
      background: #fff;
      .headPortrait {
        text-align: center;
        position: relative;
        img {
          width: 1.4rem;
          height: 1.4rem;
          border-radius: 50%;
          margin-bottom: 0.05rem;
        }
        p {
          width: 2rem;
          height: 0.42rem;
          line-height: 0.42rem;
          background-color: #f7f7f7;
          border-radius: 0.21rem;
          font-family: PingFang-SC-Medium;
          font-size: 0.26rem;
          color: #999;
          margin: 0 auto 0.6rem;
        }
        .van-uploader {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
        }
      }
      .van-cell {
        border: 0.02rem solid #f0f0f2;
        border-radius: 0.5rem;
        margin-bottom: 0.3rem;
        .van-field__label {
          border-right: 1px solid #f0f0f2;
          text-align: center;
        }
        .van-field__control {
          padding-left: 0.5rem;
        }
      }
      .van-checkbox {
        width: 84%;
        margin: 0.85rem auto 0.7rem;
        .van-checkbox__label {
          font-family: PingFang-SC-Medium;
          font-size: 0.24rem;
          color: #999999;
        }
      }
    }
  }
}
</style>

