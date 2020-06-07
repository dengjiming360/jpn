<template>
  <div class="container" id="creditsExchange">
    <navBar />
    <div class="main">
      <div class="rule">
        <h4>选择以下方法中的一种去兑换</h4>
        <p>可兑：积分可兑现金可在下方算一算</p>
        <ul>
          <li v-for="(item, index) in info.list" :key="index">
            <div class="titleTop">
              <img
                class="recommend"
                src="~@/assets/images/creditsExchange/recommend.png"
                alt
                v-if="item.is_recomm == 1"
              />
              <div class="title">
                <span>{{item.title}}</span>
                <van-button
                  class="solidBtn"
                  round
                  type="info"
                  size="small"
                  @click="$router.push({name:'exchange', query: {id: item.id}})"
                >立即兑换</van-button>
              </div>
              <table class="ruleTable">
                <tr>
                  <th>优势</th>
                  <th>起兑单位</th>
                  <th>兑换次数</th>
                  <th>积分价值</th>
                </tr>
                <tr>
                  <td class="advantage">{{item.advantage}}</td>
                  <td>{{item.lowest_integral}}</td>
                  <td>{{item.change_num}}</td>
                  <td>{{item.integral_value}}元/万</td>
                </tr>
              </table>
            </div>
            <div class="kedui">
              <p>
                <span>可兑：</span>
                <span class="gaoliang" v-if="item.kedui">{{item.kedui}}</span>
                <span v-else>积分可兑现金可在下方算一算</span>
              </p>
              <p v-if="item.shengyu">
                <span>剩余：</span>
                <span class="gaoliang">{{item.shengyu}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="math">
        <h4>算一算</h4>
        <van-field type="number" v-model="integral" center clearable placeholder="请输入你的积分">
          <template #button>
            <van-button round type="info" size="small" class="solidBtn" @click="toMath">算一算</van-button>
          </template>
        </van-field>
        <div class="agency">
          <img src="~@/assets/images/creditsExchange/icon.png" alt />
          <p>升级代理可获得更高的价格</p>
          <p class="updateStatus" @click="$router.push('/agency')">立即去升级身份</p>
        </div>
      </div>
      <div class="query">
        <!-- <div>
          <div>
            <p>短信查询积分</p>
            <p>使用银行预留的手机号，编辑短信“CXJF”发送到95533，查询积分。</p>
          </div>
          <img src="~@/assets/images/creditsExchange/phone.png" alt />
        </div>
        <div>
          <div>
            <p>电话查询积分</p>
            <p>拨打95533>2>电话银行密码>卡号后4位>1>1>3</p>
          </div>
          <img src="~@/assets/images/creditsExchange/messages.png" alt />
        </div>-->
        <div @click="kefu">
          <div>
            <p>积分查询</p>
            <p>客服提供1:1专业查询兑换服务</p>
          </div>
          <img src="~@/assets/images/creditsExchange/kefu.png" alt />
        </div>
      </div>
    </div>
    <pop-weixin :showWeixin="showWeixin" :weixin="weixin" @sendShowweixin="getShow"></pop-weixin>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import popWeixin from "@/components/copyWeChatID.vue";
export default {
  name: "creditsExchange",
  components: {
    navBar,
    popWeixin
  },
  data() {
    return {
      info: {},
      integral: "",
      bank_id: "",
      showWeixin: false,
      weixin: ""
    };
  },
  mounted() {
    this.bank_id = this.$route.query.id;
    this.$SERVER.integarlExchange(this.bank_id).then(res => {
      res.data.list.forEach((item, index) => {
        item.kedui = "";
        item.shengyu = "";
      });
      this.info = res.data;
    });
  },
  methods: {
    toMath() {
      if (!this.integral) {
        this.$toast.fail("请输入积分");
        return;
      }
      this.$SERVER.integralComp(this.bank_id, this.integral).then(res => {
        if (res.code == 1) {
          this.info.list.forEach((items, i) => {
            res.data.forEach((item, index) => {
              if (i == index) {
                items.kedui = item.kedui;
                items.shengyu = item.shengyu;
              }
            });
          });
        }
      });
    },
    getShow(val) {
      this.showWeixin = val;
    },
    kefu() {
      this.weixin = this.info.wechat_num;
      this.showWeixin = true;
    }
  }
};
</script>

<style lang="less">
#creditsExchange {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem;
    > div {
      background-color: #ffffff;
      border-radius: 0.2rem;
      padding: 0.4rem 0.2rem;
      margin-bottom: 0.3rem;
    }
    .rule {
      > h4 {
        font-size: 0.3rem;
        color: #333333;
        padding-left: 0.1rem;
        margin-bottom: 0.1rem;
      }
      > p {
        font-size: 0.26rem;
        color: #999999;
        padding-left: 0.1rem;
      }
      > ul {
        li {
          .titleTop {
            border-radius: 0.2rem;
            background-image: linear-gradient(90deg, #353e54 0%, #4d5a78 100%),
              linear-gradient(#e9545e, #e9545e);
            background-blend-mode: normal, normal;
            margin-top: 0.3rem;
            position: relative;
            overflow: hidden;
          }
          .recommend {
            position: absolute;
            top: 0;
            left: -0.15rem;
            width: 1rem;
          }
          .title {
            height: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0.16rem 0 0.52rem;
            span {
              font-family: PingFang-SC-Bold;
              font-size: 0.3rem;
              color: #ffffff;
            }
          }
          .ruleTable {
            border-collapse: separate;
            th,
            td {
              color: #c4cad9;
              padding: 0.15rem 0;
              border-top: 1px solid #838da4;
            }
            tr th:first-child,
            tr td:first-child {
              border-left: 1px solid #838da4;
            }

            tr th:last-child,
            tr td:last-child {
              border-right: 1px solid #838da4;
            }

            tr td:first-child,
            tr td:nth-child(2),
            tr td:nth-child(3),
            tr td:last-child {
              border-bottom: 1px solid #838da4;
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
            .advantage {
              color: #ffffff;
            }
          }
          .kedui {
            display: flex;
            flex-wrap: wrap;
            font-size: 0.22rem;
            padding: 0.1rem 0.1rem;
            p {
              .gaoliang {
                color: #136cc5;
              }
            }
          }
        }
      }
    }
    .math {
      > h4 {
        font-size: 0.3rem;
        color: #333333;
        margin-bottom: 0.35rem;
        padding-left: 0.1rem;
      }
      .van-cell {
        padding: 0;
        .van-field__body {
          background: #f0eff5;
          border-radius: 0.5rem;
          .van-field__control {
            line-height: 0.88rem;
            padding-left: 0.5rem;
          }
          .van-button {
            line-height: 0.88rem;
            height: 0.88rem;
            width: 2.3rem;
            font-size: 0.3rem;
          }
        }
      }
      .agency {
        display: flex;
        align-items: center;
        padding-left: 0.1rem;
        margin-top: 0.3rem;
        img {
          width: 0.3rem;
          margin-right: 0.13rem;
        }
        p {
          font-size: 0.26rem;
          color: #999999;
        }
        .updateStatus {
          text-decoration: underline;
          color: #ff5e1c;
          margin-left: 0.05rem;
        }
      }
    }
    .query {
      padding: 0 0.3rem;
      > div {
        height: 2.1rem;
        border-bottom: 1px solid #f0eff5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 0.9rem;
          margin-right: 0.42rem;
        }
        > div {
          width: 65%;
          p:first-child {
            font-size: 0.3rem;
            color: #333333;
            margin-bottom: 0.2rem;
          }
          p:last-child {
            font-size: 0.26rem;
            color: #999999;
          }
        }
      }
      > div:last-child {
        border: none;
      }
    }
  }
}
</style>