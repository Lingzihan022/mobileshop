<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners" />
    <home-recommend :recommends="recommends"></home-recommend>
    <feature-view></feature-view>
    <tab-control
      class="tab-control"
      :Titles="['流行', '新款', '精选']"
      v-on:tabclick="tabClick"
    ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
import HomeSwiper from "./childcomps/HomeSwiper";
import HomeRecommend from "./childcomps/HomeRecommend";
import FeatureView from "./childcomps/FeatureView";
import GoodsList from "components/content/goods/GoodsList.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";

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
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
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
    // 网络请求相关的方法

    getHomeMultidata() {
      getHomeMultidata().then((res) => {
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
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: sticky;
  /* 没有达到本身之前 是sticky 达到了之后 是fixed 移动端推荐使用 */
  top: 44px;
}
</style> 