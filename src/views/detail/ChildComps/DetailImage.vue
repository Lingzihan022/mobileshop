<template>
  <div class="detailImage">
    <div>{{ allImage.key }}</div>
    <div
      class="image"
      v-for="(item, index) in allImage.list"
      v-bind:key="index"
    >
      <img :src="item" alt="" @load="imageLoad" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImage",
  props: {
    allImage: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { currentIndex: 0, isAllImageLoad: false };
  },

  created() {
    // console.log(this.allImage);
  },
  methods: {
    imageLoad() {
      if (++this.currentIndex == this.allImage.list.length) {
        this.$emit("DetailImageLoad");
        console.log(this.allImage.list.length);
      }
    },
  },
};
</script>
<style scoped>
.detailImage {
  margin: 0 auto;
  font-size: 12px;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 15px;
}
.detailImage .image img {
  width: 100vw;
}
</style>