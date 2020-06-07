<template>
  <div class="container" id="home">
    <div class="banner" :style="'margin-top: ' + top + 'px'">
      <van-row type="flex" justify="space-between">
        <van-col span="9">
          <div class="dailyShare" @click="$router.push('/dailyShare')">
            <span>每日分享</span>
            <img src="~@/assets/images/index/gift.png" alt />
          </div>
        </van-col>
        <van-col span="9">
          <div class="message">
            <img src="~@/assets/images/index/message.png" alt @click="$router.push('/messageList')" />
          </div>
        </van-col>
      </van-row>
      <div
        class="bannerBox"
        :style="'background-image: url('+ banner.surface_image +');'"
        @click="$router.push({
          name: 'softArticleDetails',
          query: { id: banner.id }
        });"
      ></div>
    </div>
    <div class="main">
      <div class="con">
        <div
          class="trumpet"
          @click="$router.push({name: 'danye', query: {type: 'exchange_handle'}})"
        >
          <img src="~@/assets/images/index/trumpet.png" alt />
          积分兑换到底如何操作?
        </div>
        <div class="tencent">
          <p>
            <span>关注官方</span>
            <span>公众号</span>
          </p>
          <p>
            <span>及时了解更多优惠咨询</span>
            <van-button
              round
              type="info"
              size="mini"
              style="margin-left: 0.2rem; width: 1.5rem;"
              class="solidBtn"
              @click="$router.push({name: 'danye', query: {type: 'official_accounts'}})"
            >去关注</van-button>
          </p>
        </div>
        <div class="mySwipe">
          <h4>合作银行</h4>
          <van-swipe indicator-color="#e36210">
            <van-swipe-item v-for="(item, index) in bank_name_list" :key="index">
              <van-grid :border="false" :column-num="4">
                <van-grid-item
                  v-for="(items, i) in item"
                  :key="i"
                  @click="$router.push({name: 'creditsExchange', query: {id: items.id}})"
                >
                  <img class="bankImg" :src="items.bank_image" alt />
                  <span>{{items.bank_name}}</span>
                  <img
                    v-if="items.seconds_review == 1"
                    class="flagImg flagR aSecondTrial"
                    src="~@/assets/images/index/aSecondTrial.png"
                    alt
                  />
                </van-grid-item>
              </van-grid>
            </van-swipe-item>
          </van-swipe>
        </div>

        <div class="operator">
          <van-grid :column-num="3">
            <van-grid-item
              v-for="(item, index) in move_list"
              :key="index"
              @click="$router.push({name: 'creditsExchange', query: {id: item.id}})"
            >
              <img :src="item.bank_image" alt />
              <span>{{item.bank_name}}</span>
              <img
                v-if="item.seconds_review == 1"
                class="flagImg flagL aSecondTrial"
                src="~@/assets/images/index/aSecondTrial.png"
                alt
              />
            </van-grid-item>
          </van-grid>
        </div>
        <div class="newTeaching">
          <img
            :src="floor.surface_image"
            alt
            @click="$router.push({name: 'share', query: {active: 5}})"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      top: 0,
      banner: {},
      bank_name_list: [],
      move_list: [],
      floor: {}
    };
  },
  components: {},
  created() {},
  mounted() {
    this.init();
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
    }
  },
  deactivated() {},
  methods: {
    init() {
      this.$SERVER.index().then(res => {
        if (res.code == 1) {
          res.data.bank_name_list.forEach(item => {
            item.bank_image = this.$envconfig.baseImgUrl + item.bank_image;
          });
          res.data.move_list.forEach(item => {
            item.bank_image = this.$envconfig.baseImgUrl + item.bank_image;
          });
          res.data.banner.surface_image =
            this.$envconfig.baseImgUrl + res.data.banner.surface_image;
          res.data.floor.surface_image =
            this.$envconfig.baseImgUrl + res.data.floor.surface_image;
          this.banner = res.data.banner;
          this.floor = res.data.floor;
          this.bank_name_list = this.$METHOD.tailoringArray(
            res.data.bank_name_list,
            8
          );
          this.move_list = res.data.move_list;
        }
      });
    }
  },
  destroyed() {}
};
</script>

<style lang="less">
#home {
  font-size: 0.26rem;
  .banner {
    background: url("~@/assets/images/index/bannerBg.png") no-repeat top center;
    background-size: contain;
    padding: 0.3rem 0.32rem;
    .dailyShare {
      color: #fff;
      border-radius: 0.3rem;
      background: #4a5366;
      line-height: 0.54rem;
      width: 2.2rem;
      text-align: center;
      img {
        width: 0.6rem;
        vertical-align: bottom;
      }
    }
    .message {
      line-height: 0.54rem;
      text-align: right;
      img {
        width: 0.5rem;
        vertical-align: bottom;
      }
    }
    .bannerBox {
      width: 100%;
      height: 2.92rem;
      margin-top: 0.26rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: top center;
    }
  }
  .main {
    .con {
      padding: 0 0.32rem;
      .trumpet {
        font-size: 0.24rem;
        img {
          height: 0.4rem;
          vertical-align: bottom;
        }
      }
      .tencent {
        background: url("~@/assets/images/index/tencent.png") no-repeat top
          center;
        background-size: contain;
        height: 1.4rem;
        margin: 0.3rem 0;
        padding: 0.25rem 0 0 2.3rem;
        box-sizing: border-box;
        > p:first-child {
          font-size: 0.3rem;
          color: #333;
          font-weight: bold;
          margin-bottom: 0.1rem;
          > span {
            font-weight: bold;
          }
          > span:last-child {
            color: #ff5414;
          }
        }
        > p:last-child {
          display: flex;
          font-size: 0.24rem;
          color: #b3b3b3;
          justify-items: center;
          align-items: center;
        }
      }
      .van-grid-item__content {
        position: relative;
        .flagImg {
          position: absolute;

          width: 0.6rem;
        }
        .flagR {
          top: 0.1rem;
          right: 0.2rem;
        }
        .flagL {
          top: 0.2rem;
          left: 0.2rem;
        }
        .aSecondTrial {
          width: 0.6rem;
        }
        .notOnline {
          width: 0.8rem;
        }
      }
      .mySwipe {
        border-radius: 0.15rem;
        background-color: #fff;
        h4 {
          font-size: 0.3rem;
          font-weight: bold;
          text-align: center;
          line-height: 0.8rem;
        }
        .bankImg {
          width: 1.06rem;
        }
        .van-grid-item__content {
          padding: 0 0.16rem 0.36rem;
        }
        .van-swipe__indicators {
          bottom: 0.12rem;
          .van-swipe__indicator {
            background-color: #ccc;
          }
        }
      }
      .operator {
        margin: 0.27rem 0 0.33rem;
        img {
          width: 0.6rem;
        }
      }
      .newTeaching {
        img {
          width: 100%;
          margin-bottom: 0.22rem;
        }
      }
    }
  }
}
</style>

