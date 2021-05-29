<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" :style="{ width: '100%' }" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  //   有了props属性才能注册
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>