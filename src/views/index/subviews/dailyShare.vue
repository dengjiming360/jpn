<template>
  <div class="container" id="dailyShare">
    <weixin-share ref="weixinShare"></weixin-share>
    <navBar :message="true" />
    <div class="main">
      <div class="shareImmediately">
        <van-grid :gutter="10">
          <van-grid-item
            v-for="(item, i) in info.conf_list"
            :key="item.name"
            :class="{active: i + 1 <= sign.continue_day}"
          >
            <p>{{i + 1}}</p>
            <p>{{item.value}}元</p>
          </van-grid-item>
        </van-grid>
        <div class="cumulativeEarn">
          <p>
            <span>{{sign.continue_day ? info.conf_list[sign.continue_day - 1].value : "0.00"}}</span>
            <span>元</span>
          </p>
          <p>用户价格</p>
          <p>累计赚取：{{sign.sign_points}}元</p>
        </div>
        <van-row class="shareNow" type="flex" justify="space-between">
          <van-col span="12" style="color: #999;">连续分享，收益更多</van-col>
          <van-col span="12" style="text-align: right;">
            <van-button
              round
              type="info"
              size="small"
              class="solidBtn"
              @click="qiandao"
            >{{sign.continue_day >= 1 ? "继续分享" : "立即去分享"}}</van-button>
          </van-col>
        </van-row>
      </div>
      <div class="todayShare">
        <h4>
          <span>今日分享</span>
          <span>（连续分享，收益更多）</span>
        </h4>
        <div class="txt" v-html="share_article.content"></div>
        <img :src="share_article.surface_image" alt class="validity" />
      </div>
    </div>
    <div class="sharingRules" v-show="showSharingRules">
      <div class="sharingRulesAlert">
        <img class="gift" src="~@/assets/images/index/gift.png" alt />
        <h4>每日分享规则</h4>
        <p>身份不同奖励不同</p>
        <div v-html="info.rule"></div>
        <van-button
          class="solidBtn"
          round
          block
          type="info"
          style="margin-top: 1.8rem;"
          @click="showSharingRules = false"
        >好的</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import weixinShare from "@/components/weixinShare.vue";
export default {
  name: "dailyShare",
  components: {
    navBar,
    weixinShare
  },
  data() {
    return {
      showSharingRules: false,
      info: {},
      share_article: {},
      sign: {}
    };
  },
  created() {
    this.init();
  },
  deactivated() {},
  methods: {
    init() {
      this.$SERVER
        .dailyShare(JSON.parse(this.$METHOD.getStore("userInfo")).id)
        .then(res => {
          res.data.share_article.surface_image =
            this.$envconfig.baseImgUrl + res.data.share_article.surface_image;
          this.info = res.data;
          this.share_article = res.data.share_article;
          this.sign = res.data.sign;
        });
    },
    qiandao() {
      this.$refs.weixinShare.showPop = true;
      this.$refs.weixinShare.imgUrlArr = this.$METHOD.tailoringString(
        this.share_article.images
      );
      this.$SERVER
        .qiandao(JSON.parse(this.$METHOD.getStore("userInfo")).id)
        .then(res => {
          this.init();
        });
    }
  },
  destroyed() {}
};
</script>

<style lang="less">
#dailyShare {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem;
    .shareImmediately {
      background: #fff;
      margin-bottom: 0.3rem;
      padding: 0.3rem 0.32rem 0.4rem;
      border-radius: 0.25rem;
      .active {
        .van-grid-item__content {
          background-color: #ff5c1a;
          p {
            color: #fff;
          }
        }
      }
      .van-grid-item__content {
        background-color: #f5f5f7;
        border-radius: 0.15rem;
        p {
          font-weight: bold;
        }
      }
      .cumulativeEarn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0 0.48rem 0;
        border-bottom: 1px solid #e8e8eb;
        margin-left: 10px;
        > p:nth-child(1) {
          color: #ff5e1c;
          > span:nth-child(1) {
            font-size: 0.52rem;
          }
        }
        > p:nth-child(2) {
          background: url("~@/assets/images/index/price.png") no-repeat top
            center;
          background-size: cover;
          color: #fff;
          width: 1.72rem;
          height: 0.44rem;
          line-height: 0.44rem;
          text-align: center;
        }
        > p:nth-child(3) {
          color: #333;
        }
      }
      .shareNow {
        align-items: center;
        margin: 0.36rem 0 0 10px;
      }
    }
    .todayShare {
      background: #fff;
      padding: 0 0.32rem 0.5rem;
      border-radius: 0.25rem;
      h4 {
        line-height: 0.98rem;
        border-bottom: 1px solid #e8e8eb;
        span:nth-child(1) {
          font-weight: bold;
          font-size: 0.28rem;
        }
        span:nth-child(2) {
          color: #999;
        }
      }
      .txt {
        margin: 0.4rem 0 0.3rem;
      }
      .validity {
        max-width: 100%;
      }
    }
  }
  .sharingRules {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    .sharingRulesAlert {
      width: 60%;
      position: absolute;
      top: 3rem;
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      border-radius: 0.25rem;
      padding: 0.8rem 0.5rem;
      .gift {
        position: absolute;
        top: -1.4rem;
        left: 50%;
        transform: translateX(-50%);
        height: 2.5rem;
      }
      h4 {
        margin-bottom: 0.22rem;
        font-size: 0.38rem;
        font-weight: bold;
        text-align: center;
      }
      > p {
        color: #999999;
        text-align: center;
        margin-bottom: 0.65rem;
      }
    }
  }
}
</style>

