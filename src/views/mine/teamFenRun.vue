<template>
  <div class="container" id="teamFenRun">
    <navBar />
    <div class="main">
      <van-tabs
        class="gradientVanTabs"
        v-model="active"
        swipeable
        background="#39435a"
        title-inactive-color="#fff"
        title-active-color="#fff"
        animated
        sticky
        :border="false"
        @change="tabFn"
      >
        <van-tab title="团队业绩" name="1">
          <div class="selectBox" @click="show = true">
            <span class="year">{{year1}}年</span>
            <van-icon name="arrow-down" size="0.4rem" color="#fff" />
          </div>
          <div class="conList">
            <van-cell :border="false" v-for="item in teamPerformance" :key="item.month">
              <template #title>
                <div>
                  <span>{{item.month}}</span>
                  <span>月</span>
                </div>
                <div>
                  <p>团队业绩</p>
                  <p>{{item.integral}}积分</p>
                </div>
              </template>
            </van-cell>
          </div>
        </van-tab>
        <van-tab title="团队分润" name="2">
          <div class="selectBox" @click="show = true">
            <span class="year">{{year2}}年</span>
            <van-icon name="arrow-down" size="0.4rem" color="#fff" />
          </div>
          <van-collapse v-model="activeName" accordion class="conList" :border="false">
            <van-collapse-item
              center
              v-for="(item, i) in teamFenRun"
              :key="item.month"
              :name="i + 1"
            >
              <template #title>
                <div>
                  <span>{{item.month}}</span>
                  <span>月</span>
                </div>
                <div>
                  <p>团队分润</p>
                  <p>{{item.month_price}}元</p>
                </div>
              </template>
              <ul class="unfoldInfo">
                <li v-for="(val, key, i) in item.days_price" :key="val.days">
                  <div>{{val.days}}日</div>
                  <div>{{val.profit}}元</div>
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="show" round position="bottom">
      <van-picker
        title="选择年"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "teamFenRun",
  components: {
    navBar
  },
  data() {
    return {
      year1: new Date().getFullYear(),
      year2: new Date().getFullYear(),
      columns: [],
      active: "1",
      activeName: "1",
      teamPerformance: [],
      teamFenRun: [],
      show: false
    };
  },
  mounted() {
    var myDate = new Date();
    var tYear = myDate.getFullYear();
    this.columns.push(tYear);
    for (let i = 1; i <= 5; i++) {
      this.columns.push(tYear - i);
    }
    this.getData(this.year1, this.active);
  },
  methods: {
    getData(year, type) {
      this.$SERVER
        .teamProfit(
          JSON.parse(this.$METHOD.getStore("userInfo")).id,
          year,
          type
        )
        .then(res => {
          if (this.active == "1") {
            this.teamPerformance = res.data.msg;
          } else {
            this.teamFenRun = res.data.msg;
          }
        });
    },
    tabFn(name, title) {
      if (title == "1") {
        this.getData(this.year1, name);
      } else {
        this.getData(this.year2, name);
      }
    },
    onConfirm(value, index) {
      if (this.active == "1") {
        this.year1 = value;
        this.getData(this.year1, this.active);
      } else {
        this.year2 = value;
        this.getData(this.year2, this.active);
      }
      this.show = false;
    }
  }
};
</script>

<style lang="less">
#teamFenRun {
  font-size: 0.26rem;
  .main {
    .van-tab__pane {
      padding: 0 0.32rem 0.5rem;
    }
    .selectBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 0.88rem;
      background-image: linear-gradient(90deg, #ff5313 0%, #ff9041 100%),
        linear-gradient(#ffffff, #ffffff);
      background-blend-mode: normal, normal;
      border-radius: 0.44rem;
      margin: 0.35rem 0;
      .year {
        font-family: PingFang-SC-Bold;
        font-size: 0.3rem;
        color: #ffffff;
      }
    }
    .conList {
      background-color: #ffffff;
      border-radius: 0.2rem;
      overflow: hidden;
      .van-cell {
        padding: 0 0.32rem 0 0;
      }
      .van-cell__title {
        display: flex;
        > div {
          height: 1.5rem;
          box-sizing: border-box;
        }
        > div:first-child {
          background: #4d5978;
          width: 1.5rem;
          line-height: 1.5rem;
          text-align: center;
        }
        > div:last-child {
          width: 75%;
          padding: 0.3rem 0 0 0.52rem;
        }
        span {
          font-family: PingFang-SC-Bold;
          color: #ffffff;
        }
        span:first-child {
          font-size: 0.44rem;
        }
        span:last-child {
          font-size: 0.26rem;
        }
        p:first-child {
          font-family: PingFang-SC-Medium;
          font-size: 0.26rem;
          color: #999999;
        }
        p:last-child {
          font-family: PingFang-SC-Bold;
          font-size: 0.34rem;
          color: #333333;
        }
      }
      .van-collapse-item__content {
        padding: 0;
      }
      .unfoldInfo {
        li {
          display: flex;
          align-items: center;
          > div {
            height: 0.7rem;
            line-height: 0.7rem;
            font-size: 0.24rem;
          }
          > div:nth-child(1) {
            color: #b3b8c5;
            text-align: center;
            width: 1.6rem;
            background: #45506c;
          }
          > div:nth-child(2) {
            color: #999999;
            width: 75%;
            padding-left: 0.52rem;
            background: #fafafa;
          }
        }
      }
    }
  }
}
</style>

