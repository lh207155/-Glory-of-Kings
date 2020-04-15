<template>
  <div>
    <div class="article d-flex py-2 px-1" v-if="model.title">
      <router-link tag="div" to="/"
        ><strong
          class="iconfont icon-zuojiantou mr-2"
          style="color: #4394e4;"
        ></strong
      ></router-link>

      <strong style="color: #4394e4;" class="flex-1 text-ellipsis">{{
        model.title
      }}</strong>
      <div class="text-grey fs-sm">2020.04.15</div>
    </div>
    <div class="content p-3" v-html="model.body"></div>
    <div class="related p-3">
      <div class="d-flex py-2">
        <i class="iconfont icon-menu"></i>
        <strong class="px-2">相关资讯</strong>
      </div>
      <router-link
        tag="div"
        :to="`/article/${item._id}`"
        v-for="(item, i) in related"
        :key="i"
      >
        <div class="text-ellipsis">{{ item.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: {},
      related: {},
    };
  },
  watch: {
    id: "fetch",
  },
  name: "Article",
  methods: {
    async fetch() {
      let res = await this.$http.get(`/article/${this.id}`);
      this.model = res.data;
    },
    async fetchRelated() {
      let res = await this.$http.get(`/article/related/${this.id}`);
      this.related = res.data;
    },
  },
  created() {
    this.fetch();
    this.fetchRelated();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.article {
  border-bottom: 1px solid $border-color;
}
.content {
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
