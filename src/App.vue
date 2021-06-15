<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          v-if="$route.meta.keepAlive"
          :key="$route.component"
        ></component>
      </keep-alive>
      <!-- <component :is="Component" v-if="!$route.meta.keepalive"></component> -->
    </router-view>

    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "./assets/css/base.css";
</style>
