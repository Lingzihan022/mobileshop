<template>
  <div class="shopInfo">
    <div class="title">
      <img :src="shopInfo.shopLogo" alt="" />{{ shopInfo.name }}
    </div>
    <div class="sellInfo">
      <div class="left">
        <div>
          <li>{{ Sell }}万</li>
          <li>总销量</li>
        </div>
        <div>
          <li>{{ shopInfo.cGoods }}</li>
          <li>全部宝贝</li>
        </div>
      </div>
      <div class="right">
        <li v-for="(item, index) in score" v-bind:key="index">
          <span> {{ item.name }}</span>
          <span
            class="score"
            :style="{ color: item.isBetter ? 'red' : 'green' }"
            >{{ item.score }} </span
          ><span v-if="item.isBetter" class="high">高</span
          ><span v-else class="low">低</span>
        </li>
      </div>
    </div>
    <div class="link">进店逛逛</div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      score: [],
    };
  },
  watch: {
    shopInfo: function (newShopInfo, oldShopInfo) {
      this.score = this.shopInfo.score;
      // console.log(this.shopInfo);
    },
  },
  computed: {
    Sell: function () {
      return Math.floor(this.shopInfo.cSells / 1000) / 10;
    },
  },
};
</script>

<style scoped>
.title {
  padding: 0 5px 0 5px;
}
.title img {
  position: relative;
  top: 15px;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(158, 175, 175, 0.3);
  border-radius: 40px;
}
.sellInfo {
  margin-top: 40px;
  padding-left: 20px;
  width: 100vw;
  display: flex;
}

.left {
  display: flex;
  border-right: 1px solid rgba(158, 175, 175, 0.3);
  padding-right: 15px;
}
li {
  margin-right: 15px;
  list-style: none;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
}
.right {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 10px;
}
.right li {
  display: flex;
  width: 100%;
  text-align: left;
  line-height: 12px;
  margin-bottom: 4px;
}
.right li span {
  flex-direction: space-around;
  margin-left: 20px;
}
.right li span:nth-child(3) {
  position: absolute;
  right: 25px;
}
.high {
  color: #fff;
  background-color: red;
  height: 12px;
}
.low {
  color: #fff;
  background-color: green;
  height: 12px;
}
.score {
  background-color: #fff;
}
.link {
  margin: 0 auto;
  margin-top: 15px;
  text-align: center;
  width: 40%;
  font-size: 12px;
  background-color: rgba(158, 175, 175, 0.2);
  padding: 5px 20px;
  border-radius: 8px;
}
.shopInfo {
  padding-bottom: 15px;
  border-bottom: 5px solid rgba(0, 0, 0, 0.08);
}
</style>