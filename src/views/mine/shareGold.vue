<template>
  <div class="container" id="shareGold" v-touch:right="backBefore">
    <div class="top" :style="'padding-top:' + top + 'px'"></div>
    <div class="main">
      <div class="shareGoldContent">
        <van-row>
          <van-col
            offset="22"
            span="4"
            class="rule"
            @click="$router.push({name: 'danye', query: {type: 'platform_rule'}})"
          >规则</van-col>
        </van-row>
        <div class="myShareGold">
          <div class="myShareGoldTop">
            <p>{{shareGold}}</p>
            <van-button round type="info" size="small" class="shareGoldBtn">我的分享金</van-button>
          </div>
          <div class="myShareGoldBtm" @click="$router.push('/shareGoldItem')">
            <van-icon name="orders-o" />
            <span>我的明细</span>
            <!-- <p></p> -->
            <!-- <p>
              <van-icon name="orders-o" />我的订单
            </p>-->
          </div>
        </div>
        <div class="canGoods">
          <h4>可兑商品</h4>
          <ul>
            <li
              v-for="item in list"
              :key="item.id"
              @click.stop="$router.push({name: 'goodsItem', query: {id: item.id}})"
            >
              <img :src="item.face_image" alt />
              <div>
                <div>{{item.name}}</div>
                <div>
                  <span>{{item.integral}}</span>
                  <span>分享金</span>
                </div>
                <div>
                  <!-- <span>三方回购价：¥{{item.purchase}}</span> -->
                  <van-button
                    round
                    type="info"
                    size="small"
                    class="shareGoldBtn"
                    @click.stop="$router.push({name: 'goodsItem', query: {id: item.id}})"
                  >立即兑换</van-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "shareGold",
  components: {},
  data() {
    return {
      top: "",
      shareGold: "",
      list: []
    };
  },
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 30;
      this.searchEmptyShow = true;
    }
    this.shareGold = JSON.parse(this.$METHOD.getStore("userInfo")).integral;

    this.$SERVER.goodsList().then(res => {
      res.data.forEach(item => {
        item.face_image = this.$envconfig.baseImgUrl + item.face_image;
      });
      this.list = res.data;
    });
  },
  methods: {
    backBefore() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
#shareGold {
  font-size: 0.26rem;
  .main {
    .shareGoldContent {
      background: url("~@/assets/images/mine/shareGoldBg.png") no-repeat top
        center;
      background-size: cover;
      padding: 0.3rem;
      min-height: 100%;
      .rule {
        font-family: PingFang-SC-Medium;
        font-size: 0.28rem;
        color: #ffffff;
        line-height: 0.8rem;
      }
      .myShareGold {
        border-radius: 0.2rem;
        background: rgba(53, 23, 142, 0.7);
        margin-top: 1.6rem;
        .myShareGoldTop {
          padding: 0.66rem 0 0.5rem 0.83rem;
          p {
            margin-bottom: 0.15rem;
            font-family: Bahnschrift;
            font-size: 0.7rem;
            color: #ffffff;
          }
        }
        .myShareGoldBtm {
          display: flex;
          font-family: PingFang-SC-Medium;
          font-size: 0.26rem;
          color: #c9bdf8;
          align-items: center;
          justify-content: center;
          line-height: 1.17rem;
          border-top: 0.01rem solid #7e6fb9;
          .van-icon {
            // vertical-align: middle;
            margin-right: 0.05rem;
          }
          /* p {
            text-align: center;
            width: 100%;
          } */
          /* p:first-child {
            border-right: 0.01rem solid #7e6fb9;
          } */
        }
      }
      .canGoods {
        margin-top: 0.2rem;
        h4 {
          font-family: HYQiHei-HES;
          font-size: 0.46rem;
          color: #ffffff;
          text-align: center;
          line-height: 1.3rem;
        }
        ul {
          li {
            background-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0rem 0.02rem 0.24rem 0rem rgba(48, 18, 136, 0.44);
            border-radius: 0.2rem;
            margin-bottom: 0.3rem;
            padding: 0.2rem 0.32rem 0.2rem 0.2rem;
            display: flex;
            > img {
              width: 1.8rem;
              height: 1.8rem;
              border-radius: 0.1rem;
            }
            > div {
              padding-left: 0.4rem;
              padding-top: 0.1rem;
              width: 5rem;
              > div:nth-child(1) {
                font-family: PingFang-SC-Bold;
                font-size: 0.3rem;
                color: #ffffff;
              }
              > div:nth-child(2) {
                > span:nth-child(1) {
                  font-family: PingFang-SC-Bold;
                  font-size: 0.48rem;
                  color: #f9e2ac;
                }
                > span:nth-child(2) {
                  font-family: PingFang-SC-Medium;
                  font-size: 0.24rem;
                  color: #f9e2ac;
                }
              }
              > div:nth-child(3) {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                height: 0.56rem;
                /* > span {
                  font-family: PingFang-SC-Medium;
                  font-size: 0.24rem;
                  color: #c9bdf8;
                } */
              }
            }
          }
        }
      }
    }
  }
}
</style>

