<template>
  <div class="card p-3 mt-3 bg-white">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="flex-1 ml-2 fs-xl">{{ title }}</div>
      <i class="iconfont icon-moreread"></i>
    </div>
    <div class="card-body pt-3">
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
