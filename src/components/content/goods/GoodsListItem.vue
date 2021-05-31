<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" />
    <div>
      <p class="goods-info">{{ goodsItem.title }}</p>
      <span class="goods-price">{{ goodsItem.price }}</span>
      <span class="goods-cfav">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
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