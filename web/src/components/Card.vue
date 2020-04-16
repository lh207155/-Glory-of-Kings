<template>
  <div class="card p-3 mt-3 bg-white">
    <div class="d-flex ai-center pb-3" :class="{ 'card-header': !plain }">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="flex-1 ml-2 fs-xl">{{ title }}</div>
      <i class="iconfont icon-moreread" v-if="!plain"></i>
    </div>
    <div class="card-body" :class="{ 'pt-3': !plain }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>
