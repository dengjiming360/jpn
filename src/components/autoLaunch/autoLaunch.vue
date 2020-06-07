<template>
  <van-swipe indicator-color="white" class="swipe" :loop="false">
    <van-swipe-item
      v-for="(item, index) in img"
      :key="index"
      class="swipe-item"
      @click="change(index)"
    >
      <van-image fit="cover" :src="item" class="img" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  data() {
    return {
      img: []
    };
  },
  mounted() {
    this.$SERVER.danye("guide_page").then(res => {
      let arr = [];
      if (res.data.images.indexOf(",") == -1) {
        let imgUrl = this.$envconfig.baseImgUrl + res.data.images;
        arr.push(imgUrl);
      } else {
        let a = res.data.images.split(",");
        a.forEach(item => {
          let imgUrl = this.$envconfig.baseImgUrl + item;
          arr.push(imgUrl);
        });
      }
      this.img = arr;
    });
  },
  methods: {
    change(index) {
      if (index == this.img.length - 1) {
        this.$METHOD.setStore("first", true);
        this.$emit("complete");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.swipe {
  height: 100%;
}
.swipe-item {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
}
</style>