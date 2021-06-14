<template>
  <div id="home">
    <!-- <div class="top" ref="top">123</div> -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      :Titles="['流行', '新款', '精选']"
      v-on:tabclick="tabClick"
      ref="tabControl"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
      @pullingUp="loadMore"
    >
      <!-- @pullingUp="loadMore" -->
      <!-- :is-pull-up="true" -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control
        :Titles="['流行', '新款', '精选']"
        v-on:tabclick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="showGoods" class="goodList"></goods-list>
    </scroll>
    <!-- <scroll class="content" ref="scroll"> -->

    <!-- </scroll> -->
    <back-top @click="backClick" v-show="isShowBackUp"></back-top>

    <!-- <back-top class="backtop" @click="backTop"></back-top> -->
  </div>
</template>
<script>
import HomeSwiper from "./childcomps/HomeSwiper";
import HomeRecommend from "./childcomps/HomeRecommend";
import FeatureView from "./childcomps/FeatureView";
import GoodsList from "components/content/goods/GoodsList.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { emitter } from "components/common/mitt/Mitt.js";
import { debounce } from "common/utils.js";
import { getHomeMultidata } from "network/home";
import { getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    GoodsList,
    NavBar,
    TabControl,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      pageHeight: 0,
      backTopShow: "none",
      isShowBackUp: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // this.$eventBus.on("itemImageLoad", () => {
    //   console.log("this.eventbus");
    // });
  },
  mounted() {
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    emitter.on("imageUpLoad", () => {
      refresh();
      // this.$refs.scroll.refresh();
    });
    // 2.监听轮播图加载完的事件 然后拿到tabcontrol的offsetTop
  },
  methods: {
    // 事件监听的方法
    tabClick(index) {
      // 获取到的index为数字 需要数字和字符串对应 使用switch
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      // this.$nextTick(function () {
      //   this.$refs.scroll.scroll.scrollTo(0, 0);
      // });
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.判断是否显示backTop
      // console.log(position);
      this.isShowBackUp = -position.y > 1000;
      // 2.判断是否粘性定位tabControl
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      console.log("加载更多");
      this.$refs.scroll.finishPullUp();
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this向上查找 指向组件
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);

        this.goods[type].list.push.apply(this.goods[type].list, res.data.list);
        // 把获取到的这一页的数据追加到我们goods对象的某个type的list中=数组合并
        // 方法 a.function.array(a,b) 遍历数组b中每一项function用push追加到a里
        // newArray.push(...b)也会遍历b添加到新数组中。
        this.goods[type].page += 1;

        // console.log(res);
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  /* z-index: 100; */
}
/* position: sticky; */
/* 没有达到本身之前 是sticky 达到了之后 是fixed 移动端推荐使用 */

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
  /* transform: translateY(1px); */
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
/* .top {
  position: relative;
  top: 0;
  left: 0;
} */
/* .goodList {
  padding-bottom: 1000px;
} */
</style> 