<template>
  <div class="copywriting">
    <div class="baseBanner">
      <img :src="share_advert.surface_image" alt />
    </div>
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="30"
      >
        <div
          class="copywritingList"
          v-for="item in list"
          :key="item.id"
          :title="item"
          @click="jumpDetail(item)"
        >
          <div class="copywritingTitle">
            <img :src="item.surface_image" alt />
            <div class="integralPlatform">
              <p>{{item.title}}</p>
              <p>{{item.add_time_text}}</p>
            </div>
            <van-button
              plain
              round
              type="primary"
              color="#ff5e1c"
              @click.stop="share(item)"
            >分享 {{item.share_num}}</van-button>
          </div>
          <div class="copywritingCon">
            <div v-html="item.content"></div>
          </div>
          <div class="copywritingImg">
            <div
              v-for="(items, i) in item.imageArr"
              :key="i"
              :style="'background-image: url('+ items +');'"
              @click.stop="$router.push({name: 'imagesView', query: {url: items}})"
            ></div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  name: "copywriting",
  components: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      itemData: {}
    };
  },
  props: {
    active: "",
    share_advert: {},
    addNum: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    onLoad() {
      this.$SERVER.dynamicList(this.active, this.page, 10).then(res => {
        if (res.code == 1) {
          res.data.forEach(item => {
            item.surface_image =
              this.$envconfig.baseImgUrl + item.surface_image;
            let arr = [];
            if (item.images) {
              if (item.images.indexOf(",") == -1) {
                arr.push(this.$envconfig.baseImgUrl + item.images);
              } else {
                let imgArr = item.images.split(",");
                imgArr.forEach(item => {
                  item = this.$envconfig.baseImgUrl + item;
                  arr.push(item);
                });
              }
            }
            item.imageArr = arr;
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
    },
    jumpDetail(val) {
      this.$router.push({
        name: "softArticleDetails",
        query: { id: val.id }
      });
    },
    share(data) {
      this.itemData = data;
      this.$SERVER.addShareNum(this.itemData.id).then(res => {
        this.page = 1;
        this.list = [];
        this.onLoad();
      });
      this.$emit("openShare", data);
    }
  }
};
</script>
<style lang="less">
.copywriting {
  padding: 0 0.3rem 0.52rem;
  .baseBanner {
    margin: 0.3rem 0;
    text-align: center;
    img {
      max-width: 100%;
      border-radius: 0.2rem;
    }
  }
  .copywritingList {
    padding: 0.3rem;
    background: #fff;
    border-radius: 0.2rem;
    margin-bottom: 0.3rem;
    .copywritingTitle {
      height: 0.82rem;
      display: flex;
      align-items: center;
      img {
        width: 0.82rem;
        height: 100%;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
      .van-button {
        width: 1.8rem;
        height: 0.56rem;
        line-height: 0.56rem;
        font-size: 0.26rem;
        padding: 0;
        font-family: PingFang-SC-Medium;
        color: #ff5e1c;
      }
      .integralPlatform {
        width: 55%;
        p:nth-child(1) {
          font-family: PingFang-SC-Medium;
          font-size: 0.3rem;
          color: #333333;
        }
        p:nth-child(2) {
          font-family: PingFang-SC-Medium;
          font-size: 0.24rem;
          color: #999999;
        }
      }
    }
    .copywritingCon {
      font-family: PingFang-SC-Medium;
      font-size: 0.26rem;
      color: #666666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin: 0.2rem 0.1rem;
    }
    .copywritingImg {
      display: flex;
      justify-content: space-around;
      div {
        width: 1.92rem;
        height: 1.92rem;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
}
</style>