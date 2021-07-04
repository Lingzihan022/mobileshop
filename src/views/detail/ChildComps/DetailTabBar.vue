<template>
  <div id="detail-tab-bar">
    <div id="tab-bar-item" @click="itemClick">
      <!-- 作用域插槽动态决定内容 -->
      <!-- 将属性加在包括了插槽的div身上，替换的时候属性不会被替换掉 -->
      <div v-if="!isActive">
        <img src="@/assets/img/detail/ask.svg" alt="" />
      </div>
      <div v-else><img src="@/assets/img/detail/ask_active.svg" alt="" /></div>
      <div>
        <!--将动态绑定颜色这个逻辑写在计算属性中-->
        <!-- v-bind:class="{ active: isActive }" -->
        客服
      </div>
    </div>
    <div id="tab-bar-item" @click="itemClick">
      <!-- 作用域插槽动态决定内容 -->
      <!-- 将属性加在包括了插槽的div身上，替换的时候属性不会被替换掉 -->
      <div v-if="!isActive">
        <img src="@/assets/img/detail/dianpu.svg" alt="" />
      </div>
      <div v-else>
        <img src="@/assets/img/detail/dianpu_active.svg" alt="" />
      </div>
      <div>
        <!--将动态绑定颜色这个逻辑写在计算属性中-->
        <!-- v-bind:class="{ active: isActive }" -->
        店铺
      </div>
    </div>
    <div id="tab-bar-item" @click="saveItem">
      <!-- 作用域插槽动态决定内容 -->
      <!-- 将属性加在包括了插槽的div身上，替换的时候属性不会被替换掉 -->
      <div v-if="!isSaved">
        <img src="@/assets/img/detail/shoucang_active.svg" alt="" />
      </div>
      <div v-else>
        <img src="@/assets/img/detail/star.svg" alt="" />
      </div>
      <div>
        <!--将动态绑定颜色这个逻辑写在计算属性中-->
        <!-- v-bind:class="{ active: isActive }" -->
        收藏
      </div>
    </div>
    <div id="tab-bar-item" @click="addCart">
      <!-- 作用域插槽动态决定内容 -->
      <!-- 将属性加在包括了插槽的div身上，替换的时候属性不会被替换掉 -->

      <div>
        <!--将动态绑定颜色这个逻辑写在计算属性中-->
        <!-- v-bind:class="{ active: isActive }" -->
        加入购物车
      </div>
    </div>
    <div id="tab-bar-item" @click="itemClick">
      <!-- 作用域插槽动态决定内容 -->
      <!-- 将属性加在包括了插槽的div身上，替换的时候属性不会被替换掉 -->

      <div>
        <!--将动态绑定颜色这个逻辑写在计算属性中-->
        <!-- v-bind:class="{ active: isActive }" -->
        购买
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailTabBar",
  data() {
    return {
      isActive: true,
      isSaved: false,
    };
  },
  methods: {
    itemClick() {
      console.log("path");

      //   点击之后动态跳转

      // 如果需要返回则用push方法，不需要返回用replace
    },
    saveItem() {
      this.isSaved = !this.isSaved;
    },
    addCart() {
      this.$emit("addCart");
    },
  },
  computed: {
    // isActive() {
    //   //   省略了setter所以是函数形式。
    //   //   home->item1(/home)=true
    //   //   home->item2(/category)=false
    //   //   home->item3(/profile)=false
    //   //   home->item4(/cart)=false
    //   return true;
    //   //   //   不能直接return true 否则没有意义。应该利用被调用的组件 也就是$router 被激活的组件，this.$router.path 在组件被激活的时候，path里被替换成了激活的那个路由组件的路径。因此，可以使用indexOf(),Array.prototype.indexOf（）,indexOf()方法返回在副本中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
    // },
    // activeStyle() {
    //   return this.isActive ? { color: this.activeColor } : {};
    //   // 如果处于活跃的组件 设置了活跃的字体颜色就将其动态绑定在属性里，否则设置为空
    // },
  },
};
</script>

<style scoped>
#detail-tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;

  bottom: 0;
  background-color: #f6f6f6;
  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
  font-size: 10px;
  height: 49px;
  background-color: #fff;
}
#tab-bar-item {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  height: 49px;
  display: flex;
  flex-direction: column;
}
#tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  padding-bottom: 5px;
}
#tab-bar-item:nth-child(4) {
  padding-top: 25px;
  flex: auto;
  background-color: rgb(247, 216, 78);
}
#tab-bar-item:nth-child(5) {
  padding-top: 25px;
  flex: auto;
  color: #fff;
  background-color: rgb(238, 117, 137);
}
#tab-bar-item div {
  margin-top: -5px;
}
</style>