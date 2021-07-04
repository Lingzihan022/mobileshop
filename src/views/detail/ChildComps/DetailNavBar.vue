<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="arrow" @click="backClick">
          <img src="~assets/img/detail/arrow.svg" alt="" />
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div
            class="title-item"
            v-for="(item, index) in titles"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      props: {
        iid: {
          type: Object,
          default() {
            return {};
          },
        },
      },
      path: [
        "/detail",
        "/detail/params",
        "/detail/commit",
        "/detail/recommond",
      ],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("currentIndex", this.currentIndex);

      //   点击之后动态跳转
      // this.$router.push(this.path[index]).catch((err) => {});
      // 如果需要返回则用push方法，不需要返回用replace
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: pink;
}

.arrow img {
  height: 20px;
  margin-top: 12px;
}
</style>