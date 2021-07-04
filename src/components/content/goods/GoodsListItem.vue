<template>
  <div class="goods-item">
    <!-- :href="goodsItem.link" -->
    <div @click="goodsClick">
      <img :src="showImage" alt="" @load="imgLoadDebounce" />
      <div>
        <p class="goods-info">{{ goodsItem.title }}</p>
        <span class="goods-price">{{ goodsItem.price }}</span>
        <span class="goods-cfav">{{ goodsItem.cfav }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { emitter } from "components/common/mitt/Mitt.js";
import { debounce } from "common/utils.js";

export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  mounted() {
    // console.log(this.goodsItem);
    // this.$refs.scroll.refresh();
  },

  methods: {
    imgLoadDebounce: debounce(() => {
      emitter.emit("imageUpLoad");
      console.log("imgLoad");
    }, 500),
    goodsClick() {
      let iid = this.goodsItem.iid;
      this.$router.push({ path: "/detail", query: { iid: iid } });
    },
  },
};
</script>
<style scoped>
.goods-item {
  padding-bottom: 10px;
  padding-right: 2%;
  width: 50%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
  height: 220px;
}
.goods-info {
  /* 强制文本一行显示 */
  white-space: nowrap;
  overflow: hidden;
  /* 用省略号代替超出的文本 */
  text-overflow: ellipsis;
}
.goods-item div {
  font-size: 12px;
  text-align: center;
  line-height: 17px;
}
.goods-price {
  color: var(--color-tint);
  margin-right: 15px;
}
.goods-cfav::before {
  content: "★";
  padding-right: 3px;
}
</style>