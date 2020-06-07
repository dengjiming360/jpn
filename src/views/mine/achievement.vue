<template>
  <div class="container" id="achievement">
    <navBar />
    <div class="main">
      <h6>直接兑换积分的汇总合计</h6>
      <div class="detailTitle">
        <div>
          <p>{{info.sum}}</p>
          <p>累计盈利(元)</p>
        </div>
        <div>
          <p>{{info.sum2}}</p>
          <p>累计积分</p>
        </div>
      </div>
      <div class="baseItem">
        <div class="identity">
          <van-grid :border="false" :column-num="3" class="sudoku">
            <van-grid-item>
              <p>当前身份</p>
              <p>{{level == 1 ? "会员" : "代理"}}</p>
            </van-grid-item>
            <van-grid-item>
              <p>晋升方式</p>
              <p>{{info.upgrade_type}}</p>
            </van-grid-item>
            <van-grid-item>
              <p>操作</p>
              <van-button
                class="solidBtn"
                round
                type="info"
                size="mini"
                style="width: 1.5rem;"
                v-if="parseInt(info.sum2) >= parseInt(info.agency_apply_reward_integral) && info.upgrade_type == '充值' && info.is_already == 1"
                @click="applyfor"
              >申请奖励</van-button>
              <p v-else>申请奖励</p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div class="explain">
        <div>
          <div class="flag"></div>
          <p>如果当前身份是通过充值升级的，兑换达标（各身份达标情况如下图）可以申请相应奖励</p>
          <table>
            <tr>
              <!-- <th>黄金会员</th> -->
              <th>代理</th>
            </tr>
            <tr>
              <!-- <td>300万积分</td> -->
              <td>{{info.agency_apply_reward_integral}}积分</td>
            </tr>
          </table>
        </div>
        <div>
          <div class="flag"></div>
          <p>
            仅退还当前身份的奖励。
            <br />
            如果当前身份是通过购买升级的，兑换达标{{info.agency_apply_reward_integral}}积分可以申请相应奖励。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "achievement",
  components: {
    navBar
  },
  data() {
    return {
      level: "",
      info: {}
    };
  },
  mounted() {
    let obj = JSON.parse(this.$METHOD.getStore("userInfo"));
    this.level = obj.level;
    this.$SERVER.MyAchievements(obj.id).then(res => {
      this.info = res.data;
    });
  },
  methods: {
    applyfor() {
      this.$SERVER
        .applyfor(JSON.parse(this.$METHOD.getStore("userInfo")).id)
        .then(res => {
          if (res.data.status == 0) {
            this.$toast.fail(res.data.msg);
          }
        });
    }
  }
};
</script>

<style lang="less">
#achievement {
  font-size: 0.26rem;
  .main {
    padding: 0 0.32rem 0.8rem;
    > h6 {
      line-height: 0.9rem;
      font-family: PingFang-SC-Medium;
      font-size: 0.26rem;
      color: #999999;
      padding-left: 0.2rem;
    }
    .detailTitle {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.3rem;
      text-align: center;
      > div {
        width: 48%;
        background-image: linear-gradient(90deg, #353e54 0%, #4d5a78 100%),
          linear-gradient(#ffffff, #ffffff);
        background-blend-mode: normal, normal;
        border-radius: 0.2rem;
        padding: 0.47rem 0;
        p:first-child {
          font-family: Bahnschrift;
          font-size: 0.5rem;
          color: #ffffff;
        }
        p:last-child {
          font-family: PingFang-SC-Regular;
          font-size: 0.24rem;
          color: #e5e5eb;
        }
      }
    }
    .identity {
      background-color: #ffffff;
      border-radius: 0.2rem;
      padding: 0.44rem 0;
      p:nth-child(1) {
        font-family: PingFang-SC-Medium;
        font-size: 0.26rem;
        color: #999999;
        margin-bottom: 0.15rem;
      }
      p:nth-child(2) {
        font-family: PingFang-SC-Medium;
        font-size: 0.3rem;
        color: #333333;
      }
      .sudoku {
        .van-grid-item__content {
          padding: 0 0.16rem;
        }
        .van-grid-item {
          .van-grid-item__content {
            border-right: 1px solid #e8e8eb;
          }
        }
        .van-grid-item:last-child {
          .van-grid-item__content {
            border-right: none;
          }
        }
      }
    }
    .explain {
      margin-top: 0.92rem;
      > div {
        padding: 0 0.18rem;
        margin-bottom: 0.4rem;
        position: relative;
        .flag {
          position: absolute;
          top: 0.06rem;
          left: 0;
          width: 0.08rem;
          height: 0.3rem;
          background-image: linear-gradient(90deg, #ff5313 0%, #ff9041 100%),
            linear-gradient(#ff5e1c, #ff5e1c);
          background-blend-mode: normal, normal;
          border-radius: 0.04rem;
        }
        > p {
          font-family: PingFang-SC-Medium;
          font-size: 0.26rem;
          line-height: 0.4rem;
          color: #999999;
        }
        table {
          background: #fff;
          margin-top: 0.2rem;
          td,
          th {
            line-height: 0.6rem;
            border: 1px solid #f5f5f7;
          }
          th {
            font-family: PingFang-SC-Medium;
            font-size: 0.26rem;
            color: #47536f;
          }
          td {
            font-family: PingFang-SC-Medium;
            font-size: 0.26rem;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>

