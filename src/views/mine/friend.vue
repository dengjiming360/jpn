<template>
  <div class="container" id="friend">
    <navBar :skill="true" />
    <div class="main">
      <div class="detailTitle">
        <div>
          <p>{{direct_num}}</p>
          <p>直属队员</p>
        </div>
        <div>
          <p>{{indirect_num}}</p>
          <p>间接队员</p>
        </div>
      </div>
      <van-field type="tel" v-model="search" center clearable placeholder="请填写好友手机号">
        <template #button>
          <van-button round type="info" style="width: 1.9rem;" class="solidBtn" @click="toSearch">搜索</van-button>
        </template>
      </van-field>
      <van-tabs
        class="gradientVanTabs"
        v-model="active"
        swipeable
        background="#fff"
        title-inactive-color="#333"
        title-active-color="#333"
        animated
        sticky
        :border="false"
        @change="onChange"
      >
        <van-tab :title="item" v-for="(item, i) in tabs" :key="i">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <item v-for="items in list" :key="items.id" :val="items"></item>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import item from "@/views/mine/friendItem.vue";
export default {
  name: "friend",
  components: {
    navBar,
    item
  },
  data() {
    return {
      tabs: ["全部", "代理", "有效会员", "待激活会员"],
      active: 0,
      list: [],
      loading: false,
      finished: false,
      search: "",
      page: 1,
      noSearch: true,
      direct_num: 2,
      indirect_num: 1
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      this.$SERVER
        .myTeam(
          JSON.parse(this.$METHOD.getStore("userInfo")).id,
          this.active,
          this.page
        )
        .then(res => {
          this.direct_num = res.data.direct_num;
          this.indirect_num = res.data.indirect_num;
          res.data.list.forEach(item => {
            item.avatar = this.$envconfig.baseImgUrl + item.avatar;
            this.list.push(item);
          });
          // 加载状态结束
          this.loading = false;
          this.page++;
          // 数据全部加载完成
          if (res.data.list && res.data.list.length <= 0) {
            this.finished = true;
          }
        });
    },
    onChange(name, title) {
      if (this.noSearch) {
        this.page = 1;
        this.list = [];
        this.onLoad();
      }
    },
    toSearch() {
      if (this.search.length == 0) {
        this.onChange();
      } else {
        this.noSearch = false;
        this.active = 0;
        this.$SERVER
          .teamSearch(
            JSON.parse(this.$METHOD.getStore("userInfo")).id,
            this.search
          )
          .then(res => {
            this.noSearch = true;
            res.data.forEach(item => {
              item.avatar = this.$envconfig.baseImgUrl + item.avatar;
            });
            this.list = res.data;
          });
      }
    }
  }
};
</script>

<style lang="less">
#friend {
  font-size: 0.26rem;
  .main {
    padding: 0 0.32rem 0.8rem;
    .detailTitle {
      display: flex;
      align-items: center;
      height: 1.8rem;
      background-image: linear-gradient(90deg, #353e54 0%, #4d5a78 100%),
        linear-gradient(#ffffff, #ffffff);
      background-blend-mode: normal, normal;
      border-radius: 0.2rem;
      margin: 0.3rem 0;
      text-align: center;
      > div {
        width: 50%;
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
    .van-cell {
      border-radius: 0.45rem;
      margin-bottom: 0.3rem;
      padding: 0 0 0 0.5rem;
      line-height: 0.9rem;
    }
    .gradientVanTabs {
      > div:first-child {
        border-radius: 0.2rem;
        overflow: hidden;
      }
      .van-tabs__content {
        background: #fff;
        margin-top: 0.1rem;
        border-radius: 0.2rem;
      }
      .van-list {
        height: 7.55rem;
        overflow: auto;
      }
    }
  }
}
</style>

