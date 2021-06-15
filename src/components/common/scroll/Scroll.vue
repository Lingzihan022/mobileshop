<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
BScroll.use(Pullup);
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      props: {
        probeType: {
          type: Number,
          default: 0,
        },
      },

      //   message: "hahaha",
    };
  },
  mounted() {
    // console.log(this.$refs.wrapper);

    // 1.创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: true,
    });

    // 2.监听滚动的位置
    // 提高性能 判断probetype类型

    this.scroll.on("scroll", (position) => {
      // console.log(position);
      // 需要把位置信息传递出去
      this.$emit("scroll", position);
    });

    // console.log(this.scroll);

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      // 需要把子组件的事件传递给父组件 emit
      this.$emit("pullingUp");
    });

    // this.scroll.maxScrollY = -4092;
    // console.log(this.scroll.maxScrollY, this.scroll.minScrollY);
    // this.bs.scrollTo(0, 0, 300, undefined);
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
      console.log("------");
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style scoped>
</style>