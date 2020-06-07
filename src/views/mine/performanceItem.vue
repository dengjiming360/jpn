<template>
  <div class="performanceItem">
    <img :src="val.avatar" alt />
    <div>
      <p>{{val.nickname}}</p>
      <p>{{val.add_time_text}}</p>
    </div>
    <span>成功升级代理</span>
  </div>
</template>

<script>
export default {
  name: "performanceItem",
  components: {},
  props: {
    val: {}
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.performanceItem {
  height: 1.5rem;
  display: flex;
  align-items: center;
  padding: 0 0.3rem 0 0.6rem;
  border-bottom: 0.01rem solid #f0f0f2;
  justify-content: space-between;
  img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
  > div {
    margin-right: 0.7rem;
    p:first-child {
      font-family: PingFang-SC-Medium;
      font-size: 0.3rem;
      letter-spacing: 0rem;
    }
    p:last-child {
      font-family: PingFang-SC-Medium;
      font-size: 0.24rem;
      color: #999999;
    }
  }
  > span {
    font-size: 0.28rem;
    color: #ff5e1c;
    font-weight: bold;
  }
}
.performanceItem:last-child {
  border: none;
}
</style>