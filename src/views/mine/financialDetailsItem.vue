<template>
  <div class="financialDetailsItem">
    <div>
      <p>{{val.title}}</p>
      <p>{{val.add_time_text}}</p>
    </div>
    <span>{{val.status == 4 ? "-" : "+"}}{{val.type == 1 ? val.integarl : val.price}}</span>
  </div>
</template>

<script>
export default {
  name: "financialDetailsItem",
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
.financialDetailsItem {
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.7rem 0 0.6rem;
  span {
    font-family: PingFang-SC-Bold;
    font-size: 0.4rem;
    color: #ff5e1c;
  }
  span.outlay {
    color: #999999;
  }
  p:first-child {
    font-family: PingFang-SC-Medium;
    font-size: 0.3rem;
    letter-spacing: 0rem;
    margin-bottom: 0.1rem;
  }
  p:last-child {
    font-family: PingFang-SC-Medium;
    font-size: 0.24rem;
    color: #999999;
  }
}
</style>