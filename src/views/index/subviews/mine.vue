<template>
  <div class="container" id="mine">
    <div class="mineTop" :style="'margin-top: ' + top + 'px'">
      <div class="setBox">
        <img
          src="~@/assets/images/mine/set.png"
          style="width: 0.4rem;"
          alt
          @click="showAction = true"
        />
        <img
          src="~@/assets/images/index/message.png"
          style="width: 0.5rem;"
          alt
          @click="$router.push('/messageList')"
        />
      </div>
      <div class="infoBox vip1" :style="'background-image: url('+ mineInfo.background_img +');'">
        <div class="avatarName" @click="$router.push('/personalData')">
          <img :src="mineInfo.avatar" alt />
          <span>{{mineInfo.nickname}}</span>
        </div>
        <div class="profit">
          <div @click="$router.push('/financialDetails')">
            <p>{{mineInfo.bill_sum}}</p>
            <p>累计盈利(元)</p>
          </div>
          <p @click="$router.push('/financialDetails')">查看资金明细</p>
        </div>
        <div class="profitList">
          <van-grid :border="false" :column-num="2" class="sudoku">
            <van-grid-item @click="$router.push('/financialDetails')">
              <p>{{mineInfo.balance}}</p>
              <p>可提现(元)</p>
            </van-grid-item>
            <!-- <van-grid-item>
              <p>2</p>
              <p>分享券(张)</p>
            </van-grid-item>-->
            <van-grid-item @click="$router.push('/shareGold')">
              <p style="color: #ffbc1c;">{{mineInfo.integral}}</p>
              <p>分享金(个)</p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="baseItem myOrder">
        <h4>我的订单</h4>
        <div class="myOrderBox">
          <van-grid :border="false" :column-num="3" class="sudoku">
            <van-grid-item @click="$router.push({name: 'myOrder', query: {type: 0}})">
              <p>{{mineInfo.order_sum}}</p>
              <p>全部订单</p>
            </van-grid-item>
            <van-grid-item @click="$router.push({name: 'myOrder', query: {type: 1}})">
              <p>{{mineInfo.order_applay}}</p>
              <p>审核中订单</p>
            </van-grid-item>
            <van-grid-item @click="$router.push({name: 'myOrder', query: {type: 2}})">
              <p>{{mineInfo.order_success}}</p>
              <p>成功订单</p>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="myOrderNav">
          <van-grid :border="false">
            <van-grid-item @click="$router.push('/friend')">
              <img src="~@/assets/images/mine/myOrderNav1.png" alt />
              <p>我的好友</p>
            </van-grid-item>
            <van-grid-item @click="$router.push('/teamFenRun')" v-show="showTuanDuiFenRun">
              <img src="~@/assets/images/mine/myOrderNav2.png" alt />
              <p>我的团队</p>
            </van-grid-item>
            <van-grid-item @click="$router.push('/performance')">
              <img src="~@/assets/images/mine/myOrderNav3.png" alt />
              <p>今日业绩</p>
            </van-grid-item>
            <van-grid-item @click="$router.push('/service')">
              <img src="~@/assets/images/mine/myOrderNav4.png" alt />
              <p>在线客服</p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div class="baseItem essentialTool">
        <h4>必备工具</h4>
        <div class="essentialToolList">
          <van-grid :border="false" :column-num="4">
            <van-grid-item @click="$router.push('/achievement')">
              <img src="~@/assets/images/mine/essentialTool1.png" alt />
              <p>我的成就</p>
            </van-grid-item>
            <van-grid-item @click="getInviter">
              <img src="~@/assets/images/mine/essentialTool2.png" alt />
              <p>我的邀请人</p>
            </van-grid-item>
            <van-grid-item @click="shareQrCode">
              <img src="~@/assets/images/mine/essentialTool9.png" alt />
              <p>分享二维码</p>
            </van-grid-item>
            <van-grid-item @click="customerServiceAgent">
              <img src="~@/assets/images/mine/essentialTool3.png" alt />
              <p>代理客服</p>
            </van-grid-item>
            <van-grid-item @click="$router.push('/setUpAccount')">
              <img src="~@/assets/images/mine/essentialTool4.png" alt />
              <p>帮好友开通账号</p>
            </van-grid-item>
            <van-grid-item @click="$router.push({name: 'danye', query: {type: 'business_cor'}})">
              <img src="~@/assets/images/mine/essentialTool7.png" alt />
              <p>商务合作</p>
            </van-grid-item>
            <van-grid-item @click="$router.push({name: 'danye', query: {type: 'mate_market'}})">
              <img src="~@/assets/images/mine/essentialTool5.png" alt />
              <p>其他</p>
            </van-grid-item>
            <van-grid-item @click="$router.push({name: 'danye', query: {type: 'about_me'}})">
              <img src="~@/assets/images/mine/essentialTool8.png" alt />
              <p>关于我们</p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model="showAction"
      :actions="actions"
      @select="onSelect"
      :close-on-click-action="true"
    />
    <pop-weixin :showWeixin="showWeixin" :weixin="weixin" @sendShowweixin="getShow"></pop-weixin>
  </div>
</template>
<script>
import popWeixin from "@/components/copyWeChatID.vue";
import vueQr from "vue-qr";
export default {
  name: "mine",
  components: { popWeixin },
  data() {
    return {
      top: 0,
      showAction: false,
      actions: [
        { name: "修改登陆密码" },
        { name: "退出登陆" },
        { name: "检查更新" }
      ],
      mineInfo: {},
      showWeixin: false,
      weixin: "",
      showTuanDuiFenRun: false
    };
  },
  mounted() {
    JSON.parse(this.$METHOD.getStore("userInfo")).level == 3
      ? (this.showTuanDuiFenRun = true)
      : (this.showTuanDuiFenRun = false);
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
    }
    this.$SERVER
      .person(JSON.parse(this.$METHOD.getStore("userInfo")).id)
      .then(res => {
        res.data.background_img =
          this.$envconfig.baseImgUrl + res.data.background_img;
        res.data.icon_img = this.$envconfig.baseImgUrl + res.data.icon_img;
        res.data.avatar = this.$envconfig.baseImgUrl + res.data.avatar;
        this.mineInfo = res.data;
      });
  },
  methods: {
    shareQrCode() {
      this.$SERVER.danye("share_img").then(res => {
        this.$router.push({
          name: "imagesView",
          query: { url: res.data.images }
        });
      });
    },
    onSelect(item) {
      if (item.name == "退出登陆") {
        this.$store.commit("setToken", null);
        this.$METHOD.removeStore("userInfo");
        this.$METHOD.removeStore("token");
        this.$router.push("/login");
      } else if (item.name == "修改登陆密码") {
        this.$router.push({
          name: "register",
          query: { templateName: "重置密码" }
        });
      } else if (item.name == "检查更新") {
        this.checkUpdate();
      }
      this.show = false;
    },
    getInviter() {
      this.$SERVER
        .myinvite(JSON.parse(this.$METHOD.getStore("userInfo")).id)
        .then(res => {
          if (res.data.status == 0) {
            this.$toast.fail(res.data.msg);
          } else {
            this.weixin = res.data.msg;
            this.showWeixin = true;
          }
        });
    },
    getShow(val) {
      this.showWeixin = val;
    },
    customerServiceAgent() {
      if (JSON.parse(this.$METHOD.getStore("userInfo")).level == 1) {
        this.$toast("非代理身份,请添加在线客服了解详情");
      } else {
        this.$SERVER.agentService().then(res => {
          this.weixin = res.data;
          this.showWeixin = true;
        });
      }
    },
    // 手动检查更新
    checkUpdate() {
      let that = this;
      if (window.navigator.userAgent.match(/APICloud/i)) {
        var mam = api.require("mam");
        mam.checkUpdate(function(ret, err) {
          if (ret) {
            var result = ret.result;
            if (result.update == true && result.closed == false) {
              that.$dialog
                .confirm({
                  title: "更新提示",
                  message:
                    "有新版本啦！<br/>最新版本:" +
                    result.version +
                    "<br/>更新描述:<br/>" +
                    result.updateTip +
                    "<br/>发布时间:" +
                    result.time
                })
                .then(() => {
                  if (api.systemType == "android") {
                    api.download(
                      {
                        url: result.source,
                        report: true
                      },
                      function(ret, err) {
                        if (ret && 0 == ret.state) {
                          /* 下载进度 */
                          api.toast({
                            msg: "正在下载应用" + ret.percent + "%",
                            duration: 2000
                          });
                        }
                        if (ret && 1 == ret.state) {
                          /* 下载完成 */
                          var savePath = ret.savePath;
                          api.installApp({
                            appUri: savePath
                          });
                        }
                      }
                    );
                  }
                  if (api.systemType == "ios") {
                    api.installApp({
                      appUri: result.source
                    });
                  }
                })
                .catch(() => {});
            } else {
              that.$dialog
                .alert({
                  title: "提示",
                  message: "暂无更新"
                })
                .then(() => {});
            }
          } else {
            that.$dialog
              .alert({
                title: "提示",
                message: err.msg
              })
              .then(() => {});
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
#mine {
  font-size: 0.26rem;
  .qrImg {
    opacity: 0;
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
  .mineTop {
    background: url("~@/assets/images/index/bannerBg.png") no-repeat top center;
    background-size: contain;
    padding: 0 0.3rem;
    background-color: #f5f5f5;
    .setBox {
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        margin-left: 0.45rem;
      }
    }
    .infoBox {
      background-color: #ffffff;
      border-radius: 0.2rem;
      position: relative;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      .avatarName {
        position: absolute;
        top: -0.21rem;
        left: 0.32rem;
        display: flex;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          margin-right: 0.12rem;
        }
        span {
          font-size: 0.28rem;
          color: #333333;
          padding-top: 0.5rem;
        }
      }
      .profit {
        display: flex;
        justify-content: space-between;
        padding: 1.3rem 0.6rem 0.3rem 0.65rem;
        align-items: flex-end;
        > p {
          text-decoration: underline;
          font-size: 0.24rem;
          color: #4d5a78;
        }
        > div {
          p:nth-child(1) {
            font-family: Bahnschrift;
            font-size: 0.54rem;
            color: #ff5e1c;
          }
          p:nth-child(2) {
            font-size: 0.24rem;
            color: #666666;
          }
        }
      }
      .profitList {
        padding-bottom: 0.3rem;
        p:nth-child(1) {
          font-family: Bahnschrift;
          font-size: 0.4rem;
          color: #333333;
        }
        p:nth-child(2) {
          font-family: PingFang-SC-Medium;
          font-size: 0.24rem;
          color: #666666;
        }
      }
    }
    .infoBox.vip1 {
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;
      .profitList {
        .van-grid-item__content {
          border: none;
          background-color: transparent;
        }
        p:nth-child(1) {
          color: #724825;
        }
        p:nth-child(2) {
          color: #ab7e59;
        }
      }
    }
  }
  .main {
    .baseItem {
      padding: 0.45rem 0.25rem 0;
      > h4 {
        font-family: PingFang-SC-Bold;
        font-size: 0.3rem;
        color: #333333;
        margin-bottom: 0.24rem;
      }
    }
    .myOrder {
      .myOrderBox {
        background-color: #ffffff;
        border-radius: 0.2rem;
        padding: 0.44rem 0;
        p:nth-child(1) {
          font-family: Bahnschrift;
          font-size: 0.4rem;
          color: #333333;
          margin-bottom: 0.15rem;
        }
        p:nth-child(2) {
          font-family: PingFang-SC-Medium;
          font-size: 0.24rem;
          color: #666666;
        }
      }
      .myOrderNav {
        background-color: #ffffff;
        border-radius: 0.2rem;
        margin-top: 0.3rem;
        overflow: hidden;
        img {
          height: 0.5rem;
          display: block;
          margin-bottom: 0.2rem;
        }
        p {
          font-family: PingFang-SC-Medium;
          font-size: 0.24rem;
          color: #666666;
        }
      }
    }
    .essentialTool {
      margin-bottom: 0.47rem;
      .essentialToolList {
        background-color: #ffffff;
        border-radius: 0.2rem;
        padding: 0.1rem 0;
        .van-grid-item__content {
          padding: 0.1rem 0;
        }
        img {
          width: 1.08rem;
          display: block;
        }
        p {
          font-family: PingFang-SC-Medium;
          font-size: 0.24rem;
          color: #666666;
        }
      }
    }
  }
}
</style>

