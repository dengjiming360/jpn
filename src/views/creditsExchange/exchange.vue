<template>
  <div class="container" id="exchange">
    <navBar />
    <div class="main">
      <div class="mainCon">
        <div class="step">
          <div class="stepBox">
            <img src="~@/assets/images/creditsExchange/cash_01.png" alt />
            <div class="stepArrow">兑换成</div>
            <img src="~@/assets/images/creditsExchange/cash_02.png" alt />
            <div class="stepArrow">平台报单</div>
            <img src="~@/assets/images/creditsExchange/cash_03.png" alt />
          </div>
          <div class="stepBox">
            <span>积分</span>
            <span>实物/票券</span>
            <span>现金</span>
          </div>
        </div>
        <div class="faceValue">
          <div class="tableShow" ref="tableShow" :class="{show: showTable}">
            <table class="faceValueTable">
              <caption>等级越高回购价格越高，详情见“代理”板块</caption>
              <tr>
                <th>积分数</th>
                <th>兑换商品</th>
                <th>兑换次数</th>
                <th class="vipPrice">会员价</th>
                <th>代理价</th>
              </tr>
              <tbody>
                <tr v-for="(item, i) in level_price" :key="i">
                  <td>{{item.intergral}}</td>
                  <td>{{item.bank_name}}</td>
                  <td>{{item.num}}</td>
                  <td class="vipPrice">{{item.member_price}}</td>
                  <td>{{item.agency_price}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-show="showOpen && level_price.length > 2" @click="showTable = true">点击展开更多面值</p>
          <p v-show="showOpen && showTable" @click="showTable = false">点击隐藏</p>
        </div>
        <div class="exchangeBtn">兑换步骤详情</div>
        <div class="process" v-html="info.content"></div>
      </div>
      <div class="notescontact">
        <div class="kefu" @click="kefu">
          <img src="~@/assets/images/creditsExchange/notescontact.png" alt />
          <span>客服</span>
        </div>
        <van-button
          class="solidBtn"
          round
          type="info"
          style="width: 5.3rem;"
          @click="declaration"
        >{{info.types == 1 ? "联系客服报单" : "自助报单"}}</van-button>
      </div>
    </div>

    <pop-weixin :showWeixin="showWeixin" :weixin="weixin" @sendShowweixin="getShow"></pop-weixin>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import popWeixin from "@/components/copyWeChatID.vue";
export default {
  name: "exchange",
  components: {
    navBar,
    popWeixin
  },
  data() {
    return {
      showTable: false,
      info: {},
      showOpen: true,
      showWeixin: false,
      weixin: "",
      level_price: []
    };
  },
  mounted() {
    let ec_id = this.$route.query.id;
    this.$SERVER.inteExdeail(ec_id).then(res => {
      this.info = res.data;
      this.level_price = res.data.level_price;
    });
  },
  methods: {
    declaration() {
      if (this.info.types == 1) {
        this.weixin = this.info.get_service.wechat_num;
        this.showWeixin = true;
      } else {
        this.$router.push({
          name: "writeDeclaration",
          query: { id: this.info.id }
        });
      }
    },
    getShow(val) {
      this.showWeixin = val;
    },
    kefu() {
      this.weixin = this.info.get_service.wechat_num;
      this.showWeixin = true;
    }
  }
};
</script>

<style lang="less">
#exchange {
  font-size: 0.26rem;
  .main {
    .mainCon {
      padding: 0.3rem 0.32rem;
      > div {
        background-color: #ffffff;
        border-radius: 0.2rem;
        margin-bottom: 0.3rem;
      }
      .step {
        padding: 0.52rem 0.36rem;
        .stepBox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          .stepArrow {
            height: 0.41rem;
            line-height: 0.41rem;
            width: 1.12rem;
            background: url("~@/assets/images/creditsExchange/arrow.png")
              no-repeat right top;
            background-size: cover;
            font-size: 0.22rem;
            color: #f54c46;
            padding-right: 0.2rem;
          }
          img {
            width: 1.12rem;
            margin-bottom: 0.2rem;
          }
          span {
            font-size: 0.26rem;
            font-family: PingFang-SC-Heavy;
            letter-spacing: 0.01rem;
            color: #333333;
            font-weight: bold;
          }
          span:nth-child(1) {
            margin-left: 0.3rem;
          }
          span:nth-child(3) {
            margin-right: 0.3rem;
          }
        }
      }
      .faceValue {
        .tableShow {
          height: 4rem;
          overflow: hidden;
          .faceValueTable {
            caption {
              border: 1px solid #f2f2f5;
              border-top-left-radius: 0.24rem;
              border-top-right-radius: 0.24rem;
              padding: 0.3rem 0;
              background-color: #f4e5aa;
              font-size: 0.26rem;
              letter-spacing: 0.01rem;
              color: #d17e02;
            }
            .vipPrice {
              color: #ff5e1c;
            }
            th {
              border-bottom: 1px solid #f2f2f5;
              color: #999999;
              font-size: 0.26rem;
            }
            td {
              color: #333333;
              font-size: 0.24rem;
            }
            th,
            td {
              padding: 0.3rem 0;
              border-right: 1px solid #f2f2f5;
            }
            tr th:first-child,
            tr td:first-child {
              border-left: 1px solid #f2f2f5;
            }

            tr th:last-child,
            tr td:last-child {
              border-right: 1px solid #f2f2f5;
            }

            tr td:first-child,
            tr td:nth-child(2),
            tr td:nth-child(3),
            tr td:nth-child(4),
            tr td:last-child {
              border-bottom: 1px solid #f2f2f5;
            }

            tr:first-child th:first-child {
              border-top-left-radius: 0.24rem;
            }

            tr:first-child th:last-child {
              border-top-right-radius: 0.24rem;
            }

            tr:last-child td:first-child {
              border-bottom-left-radius: 0.24rem;
            }

            tr:last-child td:last-child {
              border-bottom-right-radius: 0.24rem;
            }
          }
        }
        .tableShow.show {
          height: auto;
        }
        > p {
          height: 1.09rem;
          line-height: 1.09rem;
          text-align: center;
          font-size: 0.26rem;
          color: #4875b9;
        }
      }
      .exchangeBtn {
        width: 3rem;
        height: 0.79rem;
        line-height: 0.9rem;
        background: url("~@/assets/images/creditsExchange/btn.png") no-repeat
          top center;
        background-size: cover;
        font-size: 0.3rem;
        text-align: center;
        color: #ffffff;
        margin: 0.55rem auto 0.3rem;
      }
      .process {
        padding: 0.43rem 0.2rem;
      }
    }
    .notescontact {
      height: 1.38rem;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem 0.3rem 0.2rem 0.7rem;
      .kefu {
        text-align: center;
        width: 0.63rem;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>