<template>
  <detail-nav-bar
    :iid="iid"
    ref="navBar"
    @currentIndex="indexListen"
  ></detail-nav-bar>
  <scroll class="content" @scroll="detailScroll" ref="scroll">
    <detail-swiper :swiper-images="swiperImages"></detail-swiper>
    <detail-info :detail-info="detailInfo"></detail-info>
    <detail-message></detail-message>
    <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
    <detail-desc :shop-desc="shopDesc"></detail-desc>
    <detail-image
      :all-image="allImage"
      @DetailImageLoad="DetailImageLoad"
    ></detail-image>
    <detail-params
      :detail-params="detailParams"
      ref="detailParams"
    ></detail-params>
    <div class="comment" ref="comment">
      <detail-comment
        v-show="isCommentShow"
        :comment="comment"
      ></detail-comment>
      <div class="no-comment" v-show="!isCommentShow">暂无用户评价</div>
    </div>
    <goods-list
      class="recommend"
      :goods="recommends"
      ref="recommend"
    ></goods-list>
  </scroll>
  <back-top @click="backClick" v-show="isShowBackUp"></back-top>
  <cart-detail
    :cartInfo="cartInfo"
    :isCartDetailShow="isCartDetailShow"
    @closeClick="closeClick"
    @colorClick="colorClick"
    @sizeClick="sizeClick"
    @yesClick="yesClick"
  ></cart-detail>
  <detail-tab-bar @addCart="addCart" />
</template>

<script>
import DetailInfo from "./ChildComps/DetailInfo.vue";
import DetailMessage from "./ChildComps/DetailMessage.vue";
import DetailShopInfo from "./ChildComps/DetailShopInfo.vue";
import DetailDesc from "./ChildComps/DetailDesc.vue";
import DetailImage from "./ChildComps/DetailImage.vue";
import DetailParams from "./ChildComps/DetailParams.vue";
import DetailComment from "./ChildComps/DetailComment.vue";
import CartDetail from "components/content/cartDetail/CartDetail.vue";

import DetailNavBar from "./ChildComps/DetailNavBar.vue";
import DetailSwiper from "./ChildComps/DetialSwiper.vue";
import DetailTabBar from "./ChildComps/DetailTabBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getDetailData, getRecommend } from "network/detail";
import { emitter } from "components/common/mitt/Mitt.js";
import { debounce } from "common/utils.js";
// import { debounce } from "common/utils.js";
export default {
  name: "Detail",
  components: {
    DetailInfo,
    DetailMessage,
    DetailShopInfo,
    DetailDesc,
    DetailImage,
    DetailParams,
    DetailComment,
    CartDetail,

    DetailNavBar,
    DetailSwiper,
    DetailTabBar,
    Scroll,
    GoodsList,
    BackTop,
  },
  data() {
    return {
      iid: null,
      // 轮播图的图片
      swiperImages: [],
      // 基本信息的数据
      detailInfo: {},
      message: ["退货补运费", "全国包邮", "七天无理由退货"],
      shopInfo: {},
      score: {},
      shopDesc: "",
      allImage: {},
      detailParams: {},
      comment: {},
      isCommentShow: false,
      recommends: [],
      navIndex: 0,
      detailItemOff: [],
      isShowBackUp: false,
      isCartDetailShow: false,
      cartInfo: {},
      colorParams: 0,
      sizeParams: 0,
      product: {},
      skus: [],
    };
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    emitter.on("imageUpLoad", () => {
      refresh();
      // this.$refs.scroll.refresh();
    });
  },

  created() {
    // 1.保存传入的iid
    this.iid = this.$route.query.iid;
    // console.log(this.$route.query.iid);
    // 2.根据iid请求详情数据
    getDetailData(this.iid).then((res) => {
      console.log(res);
      this.swiperImages = res.result.itemInfo.topImages;
      this.detailInfo = res.result;
      this.shopInfo = res.result.shopInfo;
      this.shopDesc = res.result.itemInfo.desc;
      this.allImage = res.result.detailInfo.detailImage[0];
      this.detailParams = res.result.itemParams;
      this.cartInfo = res.result.skuInfo;
      this.skus = this.cartInfo.skus;
      // 3.判断有没有评论的数据 来决定是否显示评论模块
      if (res.result.rate.list !== undefined) {
        this.comment = res.result.rate.list[0];
        this.isCommentShow = true;
      }
      // console.log(this.comment);
      // console.log(this.isCommentShow);
      // console.log(this.detailImage.key);
    });
    // 4.获取推荐的数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // this.iid = null;
  },

  methods: {
    DetailImageLoad() {
      this.detailItemOffY();

      this.$refs.scroll.refresh();
    },
    indexListen(currentIndex) {
      {
        this.navIndex = currentIndex;

        this.$refs.scroll.scrollTo(0, -this.detailItemOff[this.navIndex]);

        // console.log(this.navIndex);
      }
    },
    // 获取tab不同的距离顶端的高度
    detailItemOffY() {
      this.detailItemOff = [
        0,
        this.$refs.detailParams.$el.offsetTop,
        this.$refs.comment.offsetTop,
        this.$refs.recommend.$el.offsetTop,
      ];
      // console.log(this.detailItemOff);
      return this.detailItemOff;
    },
    // 动态监听滚动的位置
    detailScroll(position) {
      // tab的联动 0 1 2 3
      let y = -position.y;
      let length = this.detailItemOff.length;
      for (let i = 0; i < length; i++) {
        if (
          this.navIndex !== i &&
          ((i < length - 1 &&
            y >= this.detailItemOff[i] &&
            y < this.detailItemOff[i + 1]) ||
            (i === length - 1 && y >= this.detailItemOff[i]))
        ) {
          this.navIndex = i;
          // console.log(this.navIndex);
          this.$refs.navBar.currentIndex = this.navIndex;
        }
      } // backTop是否显示
      this.isShowBackUp = -position.y > 1000;
    },
    // 点击backTop滚动回顶部
    backClick() {
      // this.$nextTick(function () {
      //   this.$refs.scroll.scroll.scrollTo(0, 0);
      // });
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 点击加入购物车的事件 详情信息显示
    addCart() {
      this.isCartDetailShow = true;
      // console.log(this.cartInfo);
      // 把商品状态存到vuex;
      this.product = {};
      this.product.image = this.swiperImages[0];
      this.product.title = this.detailInfo.itemInfo.title;
      this.product.iid = this.iid;
      console.log(this.skus);
    },
    // 如果点击了关闭按钮，清空product；
    closeClick() {
      this.isCartDetailShow = false;
      this.product = {};
    },
    colorClick(index) {
      // console.log(index);
      this.product.colorParams = index;
    },
    sizeClick(index) {
      // console.log(index);
      this.product.sizeParams = index;
    },
    // 点击确认按钮之后，需要传递的参数，根据选择的size color去取出price
    yesClick() {
      // console.log(this.product.colorParams, this.product.sizeParams);
      // let index = 2 * this.product.sizeParams + this.product.colorParams + 1;
      // console.log(index);
      // let index = this.cartInfo.skus.find(
      //   (index) =>
      //     this.cartInfo.skus[index].styleId === this.product.colorParams + 1 &&
      //     this.cartInfo.skus[index].sizeId === this.product.sizeParams + 100
      // );

      for (let i = 0; i < this.skus.length; i++) {
        if (
          this.skus[i].styleId - 1 === this.product.colorParams &&
          this.skus[i].sizeId - 100 === this.product.sizeParams
        ) {
          this.product.price = this.skus[i].nowprice;
          // console.log(this.product.price);
          this.product.size = this.skus[i].size;
          this.product.color = this.skus[i].style;
          // this.$store.commit("addCart", this.product);
          this.$store.dispatch("addCart", this.product);
          // console.log(this.$store.state.cartList);
          this.isCartDetailShow = false;
          this.product = {};
          this.product.sizeParams = undefined;
          this.product.colorParams = undefined;
        }
      }
    },
  },
};
</script>
<style scoped>
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.no-comment {
  padding: 20px 0;
  text-align: center;
  font-size: 12px;
  border-bottom: 4px solid rgba(0, 0, 0, 0.08);
}
.recommend {
  margin-top: 10px;
}
</style>