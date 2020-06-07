<template>
  <div style="position: relative;">
    <div class="navbar" id="navbar">
      <div class="top" :style="'padding-top:' + top + 'px'"></div>
      <van-nav-bar
        @click-left="onClickLeft()"
        @click-right="openSearchFn()"
        :z-index="999"
        style="background: #39435a;"
      >
        <div slot="title" class="title">
          <span style="color: #fff;">{{ title }}</span>
          <slot name="title"></slot>
        </div>
        <van-icon name="arrow-left" class="left" slot="left" style="color: #fff" v-if="goback" />
        <slot name="right" slot="right" v-if="message">
          <img
            src="~@/assets/images/index/message.png"
            style="width: 0.5rem;"
            alt
            @click="$router.push('/messageList')"
          />
        </slot>
        <slot name="right" slot="right" v-if="share">
          <div class="navBarShare" @click="$emit('WXShare')">
            分享
            <img src="~@/assets/images/message/detail.png" alt />
          </div>
        </slot>
        <slot name="right" slot="right" v-if="skill">
          <div class="navBarShare" @click="$router.push({name: 'danye', query: {type: 'skill'}})">
            技巧
            <img src="~@/assets/images/message/detail.png" alt />
          </div>
        </slot>
        <slot name="right" slot="right" v-if="download">
          <img
            src="~@/assets/images/download.png"
            alt
            style="width: 0.45rem;"
            @click="$emit('download')"
          />
        </slot>
      </van-nav-bar>
    </div>
    <div class="navbar-empty" :style="'padding-top:' + top + 'px'"></div>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      top: "",
      value: "",
      searchEmptyShow: false
    };
  },
  props: {
    download: {
      type: Boolean,
      default() {
        return false;
      },
      required: false
    },
    title: {
      type: String,
      default() {
        return this.$route.meta.title;
      },
      required: false
    },
    skill: {
      type: Boolean,
      default() {
        return false;
      },
      required: false
    },
    goback: {
      type: Boolean,
      default() {
        return true;
      },
      required: false
    },
    message: {
      type: Boolean,
      default() {
        return false;
      }
    },
    share: {
      type: Boolean,
      default() {
        return false;
      }
    },
    filter: {
      type: Boolean,
      default() {
        return false;
      },
      required: false
    },
    to: {
      type: String,
      required: false
    }
  },
  components: {},
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 30;
      this.searchEmptyShow = true;
    }
  },
  methods: {
    onClickLeft() {
      if (this.goback) {
        if (this.to) {
          this.$router.push(this.to);
        } else {
          this.$router.go(-1);
        }
      }
    },
    openSearchFn() {}
  }
};
</script>
<style lang="less">
.nobg .van-hairline--bottom::after {
  border-bottom-width: 0;
}
</style>

<style lang="less" scoped>
.navbar {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
  .title {
    span {
      font-weight: bold;
    }
  }
  .left,
  .right {
    font-size: 20px;
  }
}
.navbar-empty {
  height: 46px;
}
.navBarShare {
  height: 0.48rem;
  line-height: 0.48rem;
  color: #fff;
  background: #5c6882;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.15rem;
  img {
    width: 0.37rem;
  }
}
/* 风格 */
.nobg {
  background: none;
  .title {
    color: #fff;
  }
  .left {
    color: #fff !important;
  }
}
</style>
