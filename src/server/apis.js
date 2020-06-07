import Axios from "./axios";

class Api extends Axios {
  /**
   * 获取商品数据
   * @param {Object} params typeid
   */

  // 上传
  async upload(params) {
    return await this.axios("POST", "ajax/upload", params);
  }
  // 首页
  async index(params) {
    return await this.axios("POST", "index/index", params);
  }
  // 公告列表
  async noticeList(params) {
    return await this.axios("POST", "index/noticeList", params);
  }
  // 公告详情
  async noticeInfo(notice_id) {
    return await this.axios("GET", "index/noticeInfo?notice_id=" + notice_id);
  }
  // 积分兑换
  async integarlExchange(bank_id) {
    return await this.axios("GET", "index/integarlExchange?bank_id=" + bank_id);
  }
  // 兑换详情
  async inteExdeail(ec_id) {
    return await this.axios("GET", "index/InteExdeail?ec_id=" + ec_id);
  }
  // 代金券
  async getExchangeGoods(ec_id) {
    return await this.axios("GET", "index/getExchangeGoods?ec_id=" + ec_id);
  }
  // 立即兑换
  async baoOrder(params) {
    return await this.axios("POST", "index/baoOrder", params);
  }
  // 分享-列表
  async dynamicList(type, page, limit) {
    return await this.axios("GET", "share/dynamicList?type=" + type + "&page=" + page + "&limit=" + limit);
  }
  // 分享-分类
  async getCategory(params) {
    return await this.axios("POST", "share/getCategory", params);
  }
  // 软文详情
  async dynamicDetail(id) {
    return await this.axios("GET", "share/dynamicDetail?id=" + id);
  }
  // 增加分享次数
  async addShareNum(id) {
    return await this.axios("GET", "share/addShareNum?id=" + id);
  }
  // 兑换积分计算
  async integralComp(bankId, integral) {
    return await this.axios("GET", "index/integralComp?bank_id=" + bankId + "&integral=" + integral);
  }
  // 代理
  async agency(params) {
    return await this.axios("POST", "agency/index", params);
  }
  // 每日分享
  async dailyShare(uid) {
    return await this.axios("GET", "index/dailyShare?uid=" + uid);
  }
  // 每日分享-分享
  async qiandao(uid) {
    return await this.axios("GET", "index/qiandao?uid=" + uid);
  }
  // 登陆
  async login(account, password) {
    return await this.axios("GET", "user/login?account=" + account + "&password=" + password);
  }
  // 注册
  async register(account, password, code, spread_code) {
    return await this.axios("GET", "user/register?account=" + account + "&password=" + password + "&code=" + code + "&spread_code=" + spread_code);
  }
  // 重置密码
  async resetpwd(account, newpassword, captcha) {
    return await this.axios("GET", "user/resetpwd?account=" + account + "&newpassword=" + newpassword + "&captcha=" + captcha);
  }
  // 发送验证码
  async getSms(account, event) {
    return await this.axios("GET", "Sms/send?account=" + account + "&event=" + event);
  }
  // 个人中心
  async person(uid) {
    return await this.axios("GET", "person/user?uid=" + uid);
  }
  // 修改个人资料
  async profile(params) {
    return await this.axios("POST", "user/profile", params);
  }
  // 我的订单
  async myOrder(uid, type, page) {
    return await this.axios("GET", "person/myOrder?uid=" + uid + "&type=" + type + "&page=" + page);
  }
  // 资金明细
  async billRecord(uid, type, page) {
    return await this.axios("GET", "person/billRecord?uid=" + uid + "&type=" + type + "&page=" + page);
  }
  // 免费升级
  async freeUpgrade(params) {
    return await this.axios("POST", "agency/freeUpgrade", params);
  }
  // 获取押金升级金额
  async cashUpgrade() {
    return await this.axios("GET", "agency/cashUpgrade?type=cash_upgrade");
  }
  // 押金升级回调
  async cashUpgradeHandel(uid, order_no) {
    return await this.axios("GET", "agency/cashUpgradeHandel?uid=" + uid + "&order_no=" + order_no);
  }
  // 充值协议
  async topUpAgreement() {
    return await this.axios("GET", "agency/cashUpgrade?type=recharge_agreement");
  }
  // 可兑商品
  async goodsList() {
    return await this.axios("POST", "person/goodsList");
  }
  // 商品详情
  async goodsDetail(pgoods_id) {
    return await this.axios("GET", "person/goodsDetail?pgoods_id=" + pgoods_id);
  }
  // 商品详情
  async orderList(page, uid) {
    return await this.axios("GET", "person/orderList?page=" + page + "&uid=" + uid);
  }
  // 兑换
  async creatOrder(pgoods_id, uid) {
    return await this.axios("GET", "person/creatOrder?pgoods_id=" + pgoods_id + "&uid=" + uid);
  }
  // 提现申请 
  async applay(params) {
    return await this.axios("POST", "person/applay", params);
  }
  // 在线客服
  async seviceList(params) {
    return await this.axios("POST", "person/seviceList", params);
  }
  // 我的邀请人 
  async myinvite(uid) {
    return await this.axios("GET", "person/myinvite?uid=" + uid);
  }
  // 单页
  async danye(type) {
    return await this.axios("GET", "agency/danye?type=" + type);
  }
  // 我的业绩  1=>今日业绩;2=>昨日业绩
  async todayPerform(uid, type, page) {
    return await this.axios("GET", "person/todayPerform?uid=" + uid + "&type=" + type + "&page=" + page);
  }
  // 我的成就
  async MyAchievements(uid) {
    return await this.axios("GET", "person/MyAchievements?uid=" + uid);
  }
  // 我的好友
  async myTeam(uid, type, page) {
    return await this.axios("GET", "person/myTeam?uid=" + uid + "&type=" + type + "&page=" + page);
  }
  // 我的好友=>搜索
  async teamSearch(uid, account) {
    return await this.axios("GET", "person/teamSearch?uid=" + uid + "&account=" + account);
  }
  // 最低提现金额
  async getLowPrice() {
    return await this.axios("POST", "person/getLowPrice");
  }
  // 下载图片 
  async qrcode(params) {
    return await this.axios("POST", "share/qrcode", params);
  }
  // 代理客服
  async agentService() {
    return await this.axios("GET", "person/agentService");
  }
  // 申请奖励
  async applyfor(uid) {
    return await this.axios("GET", "person/applyfor?uid=" + uid);
  }
  // 支付宝支付
  async user_alipay(uid) {
    return await this.axios("GET", "Agency/user_alipay?uid=" + uid);
  }
  // 我的团队
  async teamProfit(uid, year, type) {
    return await this.axios("GET", "person/teamProfit?uid=" + uid + "&year=" + year + "&type=" + type);
  }
}
export default new Api();