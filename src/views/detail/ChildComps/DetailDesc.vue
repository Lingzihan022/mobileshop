<template>
  <div class="desc">
    <div class="top-border"><div class="border"></div></div>
    <div class="content">
      {{ shopDesc }}
    </div>
    <div class="bottom-border"><div class="border"></div></div>
  </div>
</template>

<script>
export default {
  name: "DetailDesc",
  props: {
    shopDesc: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.desc {
  margin-top: 20px;
  padding: 20px 10px 20px 10px;
  position: relative;
  /* background-color: pink; */

  margin-bottom: 20px;
}
.desc .content {
  font-size: 12px;
}
.top-border,
.bottom-border {
  position: absolute;

  width: 80px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
}
.top-border {
  top: 0;
  left: 0;
}

.bottom-border {
  right: 5px;
  bottom: 0;
}
.bottom-border .border {
  float: right;
}
.border {
  background: #000;
  width: 4px;
  height: 4px;
}
</style>