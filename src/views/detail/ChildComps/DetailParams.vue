<template>
  <div class="detailTable">
    <li v-for="(item, index) in detailRules" :key="index">
      <span v-for="(rule, ruleIndex) in item" :key="ruleIndex">{{ rule }}</span>
    </li>
    <li v-for="(item, index) in InfoParams" :key="index">
      <span>{{ item.key }}</span
      ><span class="pink">{{ item.value }}</span>
    </li>
  </div>
</template>

<script>
export default {
  name: "DetailParams",
  props: {
    detailParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      detailRules: [],
      InfoParams: [],
    };
  },
  watch: {
    detailParams: function (newDetailParams, oldDetailParams) {
      this.detailRules = this.detailParams.rule.tables[0];

      this.InfoParams = this.detailParams.info.set;
    },
  },
};
</script>
<style scoped>
.detailTable {
  margin-top: 20px;
  padding: 20px 10px;
  padding-bottom: 30px;
  border-bottom: 4px solid rgba(0, 0, 0, 0.08);
}
.detailTable li {
  display: flex;
  list-style: none;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
span {
  flex: 1;
}
.pink {
  color: rgb(226, 119, 137);
}
</style>