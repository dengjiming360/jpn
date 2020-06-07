<template>
  <div class="container" id="exchangeGoods">
    <navBar />
    <div class="main">
      <van-card
        :desc="info.integral + '好享豆'"
        :title="info.name"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      >
        <template #tags>
          <span>销量:{{info.sales}}</span>
        </template>
      </van-card>
    </div>
    <van-submit-bar button-text="兑换" @submit="onSubmit">
      <template #default>
        <p class="total">
          合计:
          <span>{{info.integral}}</span>
          分享豆
        </p>
      </template>
    </van-submit-bar>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "exchangeGoods",
  components: {
    navBar
  },
  data() {
    return {
      info: {}
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
    onSubmit() {
      this.$SERVER
        .creatOrder(
          this.info.id,
          JSON.parse(this.$METHOD.getStore("userInfo")).id
        )
        .then(res => {
          if (res.data.status == 0) {
            this.$toast.success(res.data.msg);
          } else {
            this.$toast.success(res.msg);
            let obj = JSON.parse(this.$METHOD.getStore("userInfo"));
            obj.balance = res.data.balance;
            obj.integral = res.data.integral;
            this.$METHOD.setStore("userInfo", obj);
            setTimeout(() => {
              this.$router.push("/shareGoldItem");
            }, 1000);
          }
        });
    }
  }
};
</script>

<style lang="less">
#exchangeGoods {
  font-size: 0.26rem;
  .main {
    .van-card__content {
      > div {
        padding: 0.4rem 0 0 0;
      }
    }
    .van-card__price-currency {
      display: none;
    }
  }
  .total {
    margin-right: 0.3rem;
    span {
      color: red;
    }
  }
}
</style>

