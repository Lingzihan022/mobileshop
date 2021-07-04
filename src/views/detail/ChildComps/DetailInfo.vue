<template>
  <div class="module">
    <div class="info">{{ title }}</div>
    <span class="price">￥{{ nowPrice }}</span>
    <span class="highPrice">￥{{ highPrice }}</span>
    <span class="bable">活动价</span>
    <div class="columns">
      <li v-for="(item, index) in columns" v-bind:key="index">{{ item }}</li>
      <li>{{ deliveryTime }}小时发货</li>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      title: "",
      info: [],
      nowPrice: 0,
      highPrice: 0,
      columns: [],
      deliveryTime: 0,
      //   detailInfo: {},
    };
  },
  watch: {
    //   用监听器watch监听detailInfo的变化，变化会触发函数
    detailInfo: function (newDetailInfo, oldDetailInfo) {
      this.title = this.detailInfo.itemInfo.title;
      // console.log(this.title);
      this.info = this.detailInfo.columns;
      this.nowPrice = this.detailInfo.itemInfo.highNowPrice;
      this.highPrice = this.detailInfo.itemInfo.highPrice;
      this.columns = this.detailInfo.columns;
      this.columns.pop();
      this.deliveryTime = this.detailInfo.itemInfo.extra.deliveryTime;
      //   console.log(this.detailInfo);
      //   detailInfo && this.dataSave();
    },
  },
  //   created() {},
  methods: {
    // dataSave() {},
  },
};
</script>


<style scoped>
.module {
  padding: 0px 10px;
}
.info {
  margin: 15px 0;
  font-size: 16px;
  color: #000;
}
.price {
  color: rgb(238, 138, 155);
  font-size: 22px;
  margin-right: 20px;
  text-emphasis: middle;
}
.highPrice {
  text-decoration: line-through;
  color: #999;
}
.bable {
  position: relative;
  top: -10px;
  color: #fff;
  background-color: rgb(235, 101, 121);
  font-size: 8px;
  padding: 2px 5px;
  border-radius: 20px;
}
li {
  margin-top: 10px;
  list-style: none;
  flex: 1;
  font-size: 12px;
  text-align: center;
}
li:nth-child(1) {
  text-align: left;
}
li:nth-child(3) {
  text-align: right;
}
.columns {
  margin-left: 0;
  margin-right: 0;
  display: flex;
  padding-bottom: 10px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>