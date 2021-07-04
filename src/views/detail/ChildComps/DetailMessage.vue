<template>
  <div class="detail-message">
    <span v-for="(item, index) in message" v-bind:key="index"
      ><img src="~assets/img/detail/打勾.svg" alt="" />{{ item }}
    </span>
  </div>
</template>


<script>
export default {
  name: "DetailMessage",
  props: {
    message: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>


<style scoped>
.detail-message {
  display: flex;
  margin-top: 3px;
  font-size: 6px;
  padding-left: 10px;
  padding-bottom: 15px;
  border-bottom: 5px solid rgba(0, 0, 0, 0.08);
}
.detail-message span {
  flex: 1;
}
.detail-message span img {
  width: 13px;
  height: 13px;
  position: relative;
  top: 2px;
  margin-right: 3px;
}
</style>