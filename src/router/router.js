import Vue from "vue";
import Router from "vue-router";
import {
  Toast
} from "vant";
Vue.use(Toast);
import $store from "../store/store.js";
// tarBar ----- 子页面
import Index from "@/views/index/index.vue";
// 内嵌组件

Vue.use(Router);

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [{
      path: "/",
      component: Index,
      children: [
        // 积分
        {
          path: "",
          name: "home",
          component: () => import("@/views/index/subviews/home.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title: "积分",
            isLogin: false,
            index: 0
          }
        },
        // 每日分享
        {
          path: "/dailyShare",
          name: "dailyShare",
          component: () => import("@/views/index/subviews/dailyShare.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title: "每日分享",
            isLogin: true,
            index: 0
          }
        },
        // 代理
        {
          path: "/agency",
          name: "agency",
          component: () => import("@/views/index/subviews/agency.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title: "代理",
            isLogin: true,
            index: 1
          }
        },
        // 分享
        {
          path: "/share",
          name: "share",
          component: () => import("@/views/index/subviews/share.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title: "分享",
            isLogin: true,
            index: 2
          }
        },
        // 我的
        {
          path: "/mine",
          name: "mine",
          component: () => import("@/views/index/subviews/mine.vue"),
          meta: {
            keepAlive: false,
            isTransition: true,
            title: "我的",
            isLogin: true,
            index: 3
          },
        }
      ]
    },

    // 公告
    {
      path: "/messageList",
      name: "messageList",
      component: () => import("@/views/message/messageList.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "公告",
        isLogin: true
      }
    },
    // 公告
    {
      path: "/messageDetail",
      name: "messageDetail",
      component: () => import("@/views/message/messageDetail.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "公告",
        isLogin: true
      }
    },
    // 积分兑换
    {
      path: "/creditsExchange",
      name: "creditsExchange",
      component: () => import("@/views/creditsExchange/creditsExchange.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "积分兑换",
        isLogin: true
      }
    },
    // 联系客服兑换
    {
      path: "/exchange",
      name: "exchange",
      component: () => import("@/views/creditsExchange/exchange.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "联系客服兑换",
        isLogin: true
      }
    },
    // 自助·填写报单 
    {
      path: "/writeDeclaration",
      name: "writeDeclaration",
      component: () => import("@/views/creditsExchange/writeDeclaration.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "自助·填写报单",
        isLogin: true
      }
    },
    // 我的订单
    {
      path: "/myOrder",
      name: "myOrder",
      component: () => import("@/views/order/myOrder.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "我的订单",
        isLogin: true
      }
    },
    // 帮好友开通账号  
    {
      path: "/setUpAccount",
      name: "setUpAccount",
      component: () => import("@/views/mine/setUpAccount.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "帮好友开通账号",
        isLogin: true
      }
    },
    // 资金明细 
    {
      path: "/financialDetails",
      name: "financialDetails",
      component: () => import("@/views/mine/financialDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "资金明细",
        isLogin: true
      }
    },
    // 申请提现
    {
      path: "/destoonFinanceCash",
      name: "destoonFinanceCash",
      component: () => import("@/views/mine/destoonFinanceCash.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "申请提现",
        isLogin: true
      }
    },
    // 我的成就 
    {
      path: "/achievement",
      name: "achievement",
      component: () => import("@/views/mine/achievement.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "我的成就",
        isLogin: true
      }
    },
    // 在线客服 
    {
      path: "/service",
      name: "service",
      component: () => import("@/views/mine/service.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "微信在线客服",
        isLogin: true
      }
    },
    // 个人资料 
    {
      path: "/personalData",
      name: "personalData",
      component: () => import("@/views/mine/personalData.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "个人资料",
        isLogin: true
      }
    },
    // 我的好友
    {
      path: "/friend",
      name: "friend",
      component: () => import("@/views/mine/friend.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "我的好友",
        isLogin: true
      }
    },
    // 单页 
    {
      path: "/danye",
      name: "danye",
      component: () => import("@/views/mine/danye.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "单页",
        isLogin: true
      }
    },
    // 今日业绩 
    {
      path: "/performance",
      name: "performance",
      component: () => import("@/views/mine/performance.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "我的业绩",
        isLogin: true
      }
    },
    // 我的团队 
    {
      path: "/teamFenRun",
      name: "teamFenRun",
      component: () => import("@/views/mine/teamFenRun.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "我的团队",
        isLogin: true
      }
    },
    // 软文详情 
    {
      path: "/softArticleDetails",
      name: "softArticleDetails",
      component: () => import("@/views/mine/softArticleDetails.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "软文详情",
        isLogin: true
      }
    },
    // 视频详情 
    {
      path: "/video",
      name: "video",
      component: () => import("@/views/mine/video.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "视频详情",
        isLogin: true
      }
    },
    // 充值协议 
    {
      path: "/topUpAgreement",
      name: "topUpAgreement",
      component: () => import("@/views/mine/topUpAgreement.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "充值协议",
        isLogin: true
      }
    },
    // 分享金 
    {
      path: "/shareGold",
      name: "shareGold",
      component: () => import("@/views/mine/shareGold.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "分享金",
        isLogin: true
      }
    },
    // 我的明细 
    {
      path: "/shareGoldItem",
      name: "shareGoldItem",
      component: () => import("@/views/mine/shareGoldItem.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "我的明细",
        isLogin: true
      }
    },
    // 商品详情 
    {
      path: "/goodsItem",
      name: "goodsItem",
      component: () => import("@/views/mine/goodsItem.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "商品详情",
        isLogin: true
      }
    },
    // 兑换 
    {
      path: "/exchangeGoods",
      name: "exchangeGoods",
      component: () => import("@/views/mine/exchangeGoods.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "兑换",
        isLogin: true
      }
    },
    // 预览图片 
    {
      path: "/imagesView",
      name: "imagesView",
      component: () => import("@/views/index/components/imagesView.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "分享",
        isLogin: true
      }
    },
    // 登录
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "登录",
        isLogin: false
      }
    },
    // 注册
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/login/register.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "注册",
        isLogin: false
      }
    },
    // 忘记密码
    {
      path: "/forgetPassword",
      name: "forgetPassword",
      component: () => import("@/views/login/forgetPassword.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title: "忘记密码",
        isLogin: false
      }
    },
  ]
});
router.beforeEach((to, from, next) => {
  if (to.name != "register" && to.name != "forgetPassword") {
    if (!window.navigator.userAgent.match(/APICloud/i)) {
      if (process.env.NODE_ENV === "production") {
        window.location.href = ""
      }
    }
  }
  if (to.meta.index != undefined) {
    $store.state.tabActiveIndex = to.meta.index
  }
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      if (from.name == "login") {
        router.push('/')
      } else {
        router.push('/login')
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(route => {})

export default router;