<template>
  <div id="tab-bar-item" @click="itemClick">
    <!-- 作用域插槽动态决定内容 -->
    <!-- 将属性加在包括了插槽的div身上，替换的时候属性不会被替换掉 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle">
      <!--将动态绑定颜色这个逻辑写在计算属性中-->
      <!-- v-bind:class="{ active: isActive }" -->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  //   传进来要跳转的路径
  props: {
    path: String,
    //   设置path为字符串
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      //   isActive: false,需要动态决定每个item的isActive的值
    };
  },
  methods: {
    itemClick() {
      //   点击之后动态跳转
      this.$router.replace(this.path).catch((err) => {});
      // 如果需要返回则用push方法，不需要返回用replace
    },
  },
  computed: {
    isActive() {
      //   省略了setter所以是函数形式。
      //   home->item1(/home)=true
      //   home->item2(/category)=false
      //   home->item3(/profile)=false
      //   home->item4(/cart)=false

      return this.$route.path.indexOf(this.path) !== -1;
      //   不能直接return true 否则没有意义。应该利用被调用的组件 也就是$router 被激活的组件，this.$router.path 在组件被激活的时候，path里被替换成了激活的那个路由组件的路径。因此，可以使用indexOf(),Array.prototype.indexOf（）,indexOf()方法返回在副本中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
      // 如果处于活跃的组件 设置了活跃的字体颜色就将其动态绑定在属性里，否则设置为空
    },
  },
};
</script>
<style  scoped>
#tab-bar-item {
  flex: 1;

  text-align: center;
  height: 49px;
}
#tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
}
#tab-bar-item div {
  margin-top: -3px;
}
/* 不能直接写死颜色，也需要动态决定 */
/* .active {
  color: red;
} */
</style> 