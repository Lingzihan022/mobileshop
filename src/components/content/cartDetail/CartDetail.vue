<template>
  <div v-show="isCartDetailShow" class="box">
    <span @click="closeClick">x</span>

    <div class="title">
      <img :src="titleImage" alt="" />
      <div class="price">{{ titlePrice }}</div>
    </div>
    <div class="infoTitle">颜色</div>
    <div class="colorStyle">
      <div
        v-for="(item, styleId) in colorInfo"
        :key="styleId"
        @click="colorClick(styleId)"
        :class="{ active: styleId === currentColor }"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="infoTitle">尺码</div>
    <div class="colorStyle">
      <div
        v-for="(item, sizeId) in sizeInfo"
        :key="sizeId"
        @click="sizeClick(sizeId)"
        :class="{ active: sizeId === currentIndex }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="confirm" @click="yesClick">√</div>
  </div>
</template>

<script>
export default {
  name: "CartDetail",
  data() {
    return {
      titleImage: "",
      titlePrice: 0,
      colorInfo: [],
      sizeInfo: [],
      Info: {},
      skus: [],
      currentIndex: undefined,
      currentColor: undefined,
    };
  },
  props: {
    isCartDetailShow: {
      type: Boolean,
      default: false,
    },
    cartInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    closeClick() {
      this.$emit("closeClick");
    },
    colorClick(index) {
      this.currentColor = index;
      this.$emit("colorClick", index);
    },
    sizeClick(index) {
      this.currentIndex = index;
      this.$emit("sizeClick", index);
    },
    yesClick() {
      this.$emit("yesClick");
      this.currentIndex = undefined;
      this.currentColor = undefined;
    },
  },
  watch: {
    cartInfo: function (newInfo, oldInfo) {
      this.Info = this.cartInfo.props;
      this.colorInfo = this.Info[0].list;
      this.sizeInfo = this.Info[1].list;
      this.skus = this.cartInfo.skus;
      this.titleImage = this.skus[0].img;
      this.titlePrice = this.cartInfo.defaultPrice;
    },
  },
};
</script>

<style scoped>
.box span {
  position: absolute;
  right: 5%;
  top: 5%;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  font-size: 10px;
  color: #999;
  background-color: rgb(224, 221, 221);
  border-radius: 15px;
}
.box {
  flex-direction: column;
  width: 100vw;
  height: 40vh;
  position: absolute;
  bottom: 15vw;
  font-size: 8px;
  padding: 15px;
  background-color: #fff;

  background-color: rgb(255, 255, 255);
}
.title img {
  display: inline-block;
  width: 20vw;
  height: 20vw;
}
.infoTitle {
  margin: 10px 0;
}
.colorStyle {
  display: flex;
}
.colorStyle div {
  flex: 1;
  text-align: center;
  margin: 0 5px;
  padding: 3px 2px;
  font-size: 8px;

  border: 1px solid pink;

  border-radius: 20px;
}
.price {
  margin-left: 3px;
  display: inline-block;
  color: rgb(240, 87, 87);
  font-weight: 600;
  font-size: 10px;
}
.active {
  background-color: pink;
  color: white;
}
.confirm {
  position: absolute;
  right: 2.5%;
  bottom: 5%;
  width: 30px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  font-size: 10px;
  color: #999;
  background-color: rgb(224, 221, 221);
  border-radius: 15px;
}
</style>