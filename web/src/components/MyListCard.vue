<template>
  <div class="card p-3 mt-3 bg-white">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="flex-1 ml-2 fs-xl">{{ title }}</div>
      <i class="iconfont icon-moreread"></i>
    </div>
    <div class="nav mt-3">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        v-for="(item, i) in categories"
        :key="i"
        @click="$refs.list.$swiper.slideTo(i)"
      >
        <div class="nav-link">{{ item.name }}</div>
      </div>
    </div>
    <div class="card-body pt-1">
      <swiper
        :options="{ autoHeight: true }"
        ref="list"
        @slide-change="
          () => {
            active = $refs.list.$swiper.realIndex;
          }
        "
      >
        <swiper-slide v-for="(item, i) in categories" :key="i">
          <!--作用域插槽把每一个类型再传给父组件，在父组件里再循环-->
          <slot :category="item"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: "m-card",
  data() {
    return {
      active: 0,
    };
  },
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true },
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
