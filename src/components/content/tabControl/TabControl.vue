<template>
  <div class="TabControl">
    <div
      v-for="(item, index) in Titles"
      :key="index"
      @click="activeClick(index)"
    >
      <span :class="{ active: index === currentIndex }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    Titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    activeClick(index) {
      this.currentIndex = index;
      this.$emit("tabclick", index);
    },
  },
};
</script>


<style scoped>
.TabControl {
  padding: 10px 0;
  display: flex;
  text-align: center;
  font-size: 12px;
  background-color: #fff;
}
.TabControl div {
  flex: 1;
}
.TabControl span {
  padding: 3px;
}
.active {
  color: var(--color-tint);
  border-bottom: 2px solid pink;
}
</style>