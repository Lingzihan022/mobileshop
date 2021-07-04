<template>
  <swiper class="item">
    <swiper-item
      v-for="(item, index) in swiperImages"
      :key="index"
      class="swiper-item"
    >
      <img
        :src="item"
        alt=""
        :style="{ width: '100%' }"
        @load="SwiperImageUpLoad"
      />
    </swiper-item>
  </swiper>
</template>

<script>
import { emitter } from "components/common/mitt/Mitt.js";
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: { Swiper, SwiperItem },
  props: {
    swiperImages: {
      type: Array,
      default() {
        return [];
      },
    },
    data() {
      return {
        isSwiperImageLoad: false,
      };
    },
    mounted() {},
    methods: {
      imgLoad() {
        emitter.emit("SwiperImageUpLoad");
        // console.log("imgLoad");
      },
    },
  },
};
</script>
<style scoped>
.item {
  height: 300px;
  overflow: hidden;
}
.item >>> .indicator {
  left: 50%;
  transform: translateX(-50%);
}
/* 通过 >>> 穿透scoped 有些Sass 、Less之类的预处理器无法正确解析 >>>。可以使用 /deep/操作符( >>> 的别名) */
</style>