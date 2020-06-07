<template>
  <div class="container" id="writeDeclaration">
    <navBar />
    <div class="main">
      <div class="info">
        <div class="infoTit">请提交正确的券码等信息，恶意提交无关券码，一经核实将扣款或封号</div>
        <div class="form">
          <div
            class="coupon"
            v-for="(item,i ) in ticketList"
            :key="i"
            :class="{active: item.isCheck}"
            @click="checkTicket(item, i)"
          >{{item.bank_name}}</div>
          <van-field v-model="form.redeem_code" label="兑换码" placeholder="复制卡号和密码" />
          <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead">
            <van-button
              icon="photo"
              class="solidBtn"
              round
              type="info"
              style="margin: 0px 0px 0.3rem 0.2rem;"
            >上传图片</van-button>
          </van-uploader>
          <van-field v-model="form.remark " label="备注" placeholder="无特殊情况请勿填写" />
        </div>
      </div>
      <div class="submitBox">
        <!-- <van-button class="addCardVoucher" icon="plus" type="primary">添加卡券</van-button> -->
        <p>一次性报单20单以上，可直接联系客服报单</p>
        <van-button class="solidBtn" round type="info" size="large" @click="exchange">立即兑换</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "writeDeclaration",
  components: {
    navBar
  },
  data() {
    return {
      ticketList: [],
      fileList: [],
      form: {
        product_id: "",
        redeem_code: "",
        remark: "",
        image: "",
        uid: ""
      }
    };
  },
  mounted() {
    this.form.uid = JSON.parse(this.$METHOD.getStore("userInfo")).id;
    let ec_id = this.$route.query.id;
    this.$SERVER.getExchangeGoods(ec_id).then(res => {
      if (res.code == 1) {
        res.data.forEach(item => {
          item.isCheck = false;
        });
        this.ticketList = res.data;
      } else {
        this.ticketList = [];
      }
    });
  },
  methods: {
    checkTicket(val, i) {
      this.ticketList.forEach((item, index) => {
        if (i == index) {
          item.isCheck = true;
          this.form.product_id = item.id;
        } else {
          item.isCheck = false;
        }
      });
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", file.file.name);
      this.$SERVER.upload(formData).then(res => {
        if (res.code == 1) {
          this.$toast.success("上传成功");
          this.form.image = res.data.url;
        } else {
          this.$toast.fail("上传失败");
          this.form.image = "";
        }
      });
    },
    exchange() {
      if (!this.form.product_id) {
        this.$toast.fail("请选择卡券");
        return;
      }
      if (!this.form.redeem_code) {
        this.$toast.fail("请填写兑换码");
        return;
      }
      this.$SERVER.baoOrder(this.form).then(res => {
        if (res.code == 1) {
          this.$toast.success(res.msg);
          setTimeout(() => {
            this.$router.push({ name: "myOrder", query: { type: 0 } });
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="less">
#writeDeclaration {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem;
    .info {
      margin-bottom: 0.8rem;
      background-color: #ffffff;
      border-radius: 0.2rem;
      .infoTit {
        background: #f4e5aa;
        padding: 0.15rem 0.5rem;
        font-size: 0.24rem;
        color: #d17e02;
        border-radius: 0.24rem 0.24rem 0 0;
      }
      .form {
        padding: 0.42rem 0.4rem;
        .coupon {
          height: 0.7rem;
          line-height: 0.7rem;
          text-align: center;
          padding: 0 0.48rem;
          border: 0.02rem solid #384258;
          border-radius: 0.5rem;
          font-size: 0.28rem;
          color: #333333;
          display: inline-block;
          margin-bottom: 0.3rem;
          margin-right: 0.2rem;
        }
        .coupon.active {
          background: #384158;
          color: #fff;
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
      }
    }
    .submitBox {
      text-align: center;
      /* .addCardVoucher {
        background: #fff;
        border: 0.01rem solid #424e69;
        color: #424e69;
        border-radius: 0.5rem;
        margin-bottom: 0.65rem;
      } */
      p {
        font-size: 0.24rem;
        color: #ff5e1c;
        margin-bottom: 0.32rem;
      }
    }
  }
}
</style>