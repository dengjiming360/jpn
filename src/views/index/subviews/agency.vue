<template>
  <div class="container" id="agency">
    <navBar :title="title" :goback="false" />
    <div class="main">
      <div class="carousel">
        <van-swipe
          class="my-swipe"
          :loop="false"
          :initial-swipe="initialSwipe"
          @change="onChange"
          :touchable="touchable"
        >
          <van-swipe-item>
            <member-item :price_list="price_list" :user_level="user_level_huiyuan" ref="member"></member-item>
          </van-swipe-item>
          <van-swipe-item>
            <agency-item
              :price_list="price_list"
              :user_level="user_level_daili"
              @freeUpdate="freeUpdate"
              @upgradeDeposit="upgradeDeposit"
              ref="agency"
            ></agency-item>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <van-popup v-model="upgrade" closeable round>
      <div class="basePop popupUpgrade">
        <h4>免费升级</h4>
        <div>
          <div class="popupUpgradeTop">
            <p>邀请升级</p>
            <van-button
              round
              type="info"
              size="small"
              class="solidBtn"
              @click="invitationUpgrade"
            >去完成</van-button>
          </div>
          <div class="popupUpgradeBtm">
            <p>直接邀请{{upgradeData.invite_upgrade}}个有效用户，免费升级代理</p>
            <p>
              <span>已邀请：</span>
              <span>{{upgradeData.already_invite_upgrade}}/{{upgradeData.invite_upgrade}}</span>
            </p>
          </div>
        </div>
        <div>
          <div class="popupUpgradeTop">
            <p>兑换升级</p>
            <van-button
              round
              type="info"
              size="small"
              class="solidBtn"
              @click="$router.push('/')"
            >去完成</van-button>
          </div>
          <div class="popupUpgradeBtm">
            <p>自己累积兑换{{upgradeData.exchange_upgrade}}积分，免费升级代理</p>
            <p>
              <span>已兑换：</span>
              <span>{{upgradeData.already_exchange_upgrade}}/{{upgradeData.exchange_upgrade}}</span>
            </p>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showDeposit" closeable round>
      <div class="basePop popupZhifu">
        <h4>押金升级</h4>
        <div class="content">
          <div v-html="depositData.content"></div>
          <van-checkbox
            v-model="checked"
            checked-color="#ff611e"
            style="margin: 0.5rem auto 0;max-width: 3.25rem;"
          >
            <p>
              我已同意
              <span
                @click.stop="$router.push('/topUpAgreement')"
                style="color: cornflowerblue;"
              >《充值协议》</span>
            </p>
          </van-checkbox>
          <van-button
            round
            type="info"
            class="solidBtn"
            style="width: 100%;margin-top: 0.3rem;"
            @click="depositPrepaidPhone"
          >押金充值</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import agencyItem from "@/views/index/components/agencyItem.vue";
import memberItem from "@/views/index/components/memberItem.vue";
export default {
  name: "agency",
  components: {
    navBar,
    agencyItem,
    memberItem
  },
  data() {
    return {
      title: "会员",
      touchable: true,
      initialSwipe: 0,
      price_list: [],
      user_level_daili: {},
      user_level_huiyuan: {},
      upgrade: false,
      upgradeData: {},
      showDeposit: false,
      checked: false,
      depositData: {}
    };
  },
  mounted() {
    this.$SERVER.agency().then(res => {
      this.price_list = res.data.price_list;
      res.data.user_level.forEach(item => {
        item.icon_img = this.$envconfig.baseImgUrl + item.icon_img;
        item.background_img = this.$envconfig.baseImgUrl + item.background_img;
        if (JSON.parse(this.$METHOD.getStore("userInfo")).level == 1) {
          if (item.name == "会员") {
            this.user_level_huiyuan = item;
          }
          if (item.name == "代理") {
            this.user_level_daili = item;
          }
        }
        if (JSON.parse(this.$METHOD.getStore("userInfo")).level == 2) {
          if (item.name == "会员") {
            this.user_level_huiyuan = item;
          }
          if (item.name == "代理") {
            this.user_level_daili = item;
          }
        }
        if (JSON.parse(this.$METHOD.getStore("userInfo")).level == 3) {
          if (item.name == "会员") {
            this.user_level_huiyuan = item;
          }
          if (item.name == "代理商") {
            this.user_level_daili = item;
          }
        }
      });
    });
    this.init();
  },
  methods: {
    init() {
      if (JSON.parse(this.$METHOD.getStore("userInfo")).level == 1) {
        this.initialSwipe = 0;
        this.touchable = true;
      } else {
        this.initialSwipe = 1;
        this.touchable = false;
      }
      this.onChange(this.initialSwipe);
    },
    onChange(index) {
      if (index == 0) {
        this.title = "会员";
      } else {
        this.title = "代理";
      }
    },
    invitationUpgrade() {
      this.$router.push({ name: "share", query: { active: 1 } });
      this.upgrade = false;
    },
    depositPrepaidPhone() {
      let that = this;
      if (this.checked) {
        // 获取后台orderInfo及商户网站唯一订单号
        this.$SERVER
          .user_alipay(JSON.parse(this.$METHOD.getStore("userInfo")).id)
          .then(res => {
            // 调用支付宝客户端支付
            var aliPayPlus = api.require("aliPayPlus");
            aliPayPlus.payOrder(
              {
                orderInfo: res.data.orderInfo
              },
              function(ret, err) {
                switch (ret.code) {
                  case "9000":
                    // 支付成功回调
                    that.$SERVER
                      .cashUpgradeHandel(
                        JSON.parse(that.$METHOD.getStore("userInfo")).id,
                        res.data.order_no
                      )
                      .then(res => {
                        let obj = JSON.parse(that.$METHOD.getStore("userInfo"));
                        obj.level = res.data.level;
                        that.$METHOD.setStore("userInfo", obj);
                        that.init();
                        that.$refs.member.init();
                        that.$refs.agency.init();
                        that.$toast.success(res.data.msg);
                      });
                    break;
                  case "8000":
                    that.$toast.fail("正在处理中");
                    break;
                  case "6004":
                    that.$toast.fail("正在处理中");
                    break;
                  case "4000":
                    that.$toast.fail("支付失败");
                    break;
                  case "5000":
                    that.$toast.fail("重复请求");
                    break;
                  case "6001":
                    that.$toast.fail("取消支付");
                    break;
                  case "6002":
                    that.$toast.fail("网络连接出错");
                    break;
                }
              }
            );
          });
        this.showDeposit = false;
      } else {
        this.$toast.fail("请阅读《充值协议》,并勾选");
      }
    },
    freeUpdate() {
      this.$SERVER
        .freeUpgrade()
        .then(res => {
          this.upgradeData = res.data;
          this.upgrade = true;
        })
        .catch(res => {
          this.upgradeData = {};
        });
    },
    upgradeDeposit() {
      this.$SERVER
        .cashUpgrade()
        .then(res => {
          this.depositData = res.data.info;
          this.checked = false;
          this.showDeposit = true;
        })
        .catch(res => {
          this.depositData = {};
        });
    }
  }
};
</script>

<style lang="less">
#agency {
  font-size: 0.26rem;
  .main {
    .carousel {
      padding: 0.3rem;
      .my-swipe {
        .van-swipe__indicators {
          display: none;
        }
      }
    }
  }
  .van-popup {
    .basePop {
      width: 5.9rem;
      background-color: #ffffff;
      padding-bottom: 0.46rem;
      h4 {
        line-height: 0.8rem;
        padding-top: 0.3rem;
        background: cornflowerblue;
        color: #fff;
        text-align: center;
        font-size: 0.35rem;
      }
    }
    .popupUpgrade {
      > div {
        padding: 0.3rem;
        border-bottom: 0.01rem solid #ccc;
      }
      > div:last-child {
        border: none;
      }
      .popupUpgradeTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        p {
          color: cornflowerblue;
          font-size: 0.3rem;
          font-family: "PingFang-SC-Bold";
        }
      }
      .popupUpgradeBtm {
        p:first-child {
          font-size: 0.24rem;
          color: #333;
          margin-bottom: 0.1rem;
        }
        p:last-child {
          font-size: 0.26rem;
          color: cornflowerblue;
          span:last-child {
            color: #ff5313;
          }
        }
      }
    }
    .popupZhifu {
      padding-bottom: 0.2rem;
      .content {
        padding: 0.3rem;
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
  }
}
</style>

