<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>
<script>
export default {
  name: "BackTop",
};
</script>
<style scoped>
.back-top img {
  height: 43px;
  width: 43px;
  position: fixed;
  right: 10px;
  bottom: 50px;
  z-index: 100;
}
</style>