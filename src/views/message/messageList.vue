<template>
  <div class="container" id="messageList">
    <navBar />
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="30"
      >
        <div
          class="itemList"
          v-for="(item, i) in list"
          :key="i"
          @click="$router.push({name:'messageDetail', query: {id: item.id}})"
        >
          <img :src="item.icon_image" alt />
          <div>
            <div class="notice">
              <p>{{item.title}}</p>
              <p>{{item.add_time_text}}</p>
            </div>
            <div class="explain">{{item.sub_title}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "messageList",
  components: {
    navBar
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    };
  },
  created() {},
  methods: {
    onLoad() {
      this.$SERVER.noticeList({ page: this.page }).then(res => {
        if (res.code == 1) {
          res.data.forEach(item => {
            item.icon_image = this.$envconfig.baseImgUrl + item.icon_image;
            this.list.push(item);
          });
          // 加载状态结束
          this.loading = false;
          this.page++;
          // 数据全部加载完成
          if (res.data && res.data.length <= 0) {
            this.finished = true;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#messageList {
  font-size: 0.26rem;
  .main {
    padding: 0.3rem 0.32rem;
    .itemList {
      background: #fff;
      border-radius: 0.25rem;
      display: flex;
      padding: 0.2rem 0.35rem 0.2rem 0.25rem;
      display: flex;
      margin-bottom: 0.1rem;
      > img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        margin-right: 0.25rem;
      }
      > div {
        width: 80%;
      }
      .notice {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.1rem;
        > p:first-child {
          font-size: 0.28rem;
          font-weight: bold;
          color: #333;
        }
        > p:last-child {
          color: #b3b3b3;
        }
      }
      .explain {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        color: #666;
      }
    }
  }
}
</style>