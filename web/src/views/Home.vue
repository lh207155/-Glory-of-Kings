<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg"
        />
      </swiper-slide>
      <swiper-slide>
        <img
          class="w-100"
          src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg"
        />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-1"
        slot="pagination"
      ></div>
    </swiper>
    <!--end of swiper-->
    <div class="nav-icons bg-white mt-3 text-center pt-4">
      <div class="d-flex flex-wrap">
        <div
          class="nav-item mb-4 d-flex flex-column jc-between ai-center"
          v-for="(item, index) in navItems"
          :key="index"
        >
          <i class="sprite" :class="'sprite-' + item.className"></i>
          <div class="py-2">
            <span>{{ item.navName }}</span>
          </div>
        </div>
      </div>
      <div class="nav-shrink text-center bg-light py-2">
        <i class="sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!--end of nav-->
    <m-card title="新闻资讯" icon="menu" :categories="newsCats">
      <template v-slot:default="items">
        <div
          class="d-flex py-2"
          v-for="(item, i) in items.category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ item.cateName }}]</span>
          <span class="mx-1">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{
            item.title
          }}</span>
          <span class="fs-xs text-grey">{{ item.createdAt | date }}</span>
        </div>
      </template>
    </m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  name: "Home",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".pagination-home",
        },
        // Some Swiper option/callback...
      },
      navItems: [
        {
          navName: "爆料站",
          className: "news",
        },
        {
          navName: "故事站",
          className: "story",
        },
        {
          navName: "周边商城",
          className: "store",
        },
        {
          navName: "体验服",
          className: "experience",
        },
        {
          navName: "新人专区",
          className: "new",
        },
        {
          navName: "荣耀·传承",
          className: "honor",
        },
        {
          navName: "模拟战资料库",
          className: "mockData",
        },
        {
          navName: "王者营地",
          className: "camp",
        },
        {
          navName: "公众号",
          className: "officialAccount",
        },
        {
          navName: "版本介绍",
          className: "version",
        },
        {
          navName: "对局环境",
          className: "battleEnvironment",
        },
        {
          navName: "无限王者团",
          className: "infiniteKings",
        },
        {
          navName: "创意互动营",
          className: "creativeCamp",
        },
      ],
      newsCats: [],
    };
  },
  components: {},
  methods: {
    async fetchNewsList() {
      const res = await this.$http.get("/news/list");
      this.newsCats = res.data;
    },
  },
  created() {
    this.fetchNewsList();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map_get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border: none;
    }
  }
}

.nav-shrink {
  height: 2.3076rem;
  border-bottom: 1px solid $border-color;
}
</style>
