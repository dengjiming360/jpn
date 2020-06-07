<template>
  <div class="friendItem">
    <img :src="val.avatar" alt />
    <div>
      <p>{{val.nickname}}</p>
      <p>{{val.add_time_text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "friendItem",
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
.friendItem {
  height: 1.5rem;
  display: flex;
  align-items: center;
  padding: 0 0.3rem 0 0.6rem;
  border-bottom: 0.01rem solid #f0f0f2;
  img {
    width: 0.8rem;
    border-radius: 50%;
    margin-right: 0.3rem;
  }
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
.friendItem:last-child {
  border: none;
}
</style>