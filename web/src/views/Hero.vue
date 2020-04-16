<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />

      <div class="text-white mx-2">王者荣耀</div>
      <div class="text-white flex-1">攻略站</div>

      <router-link tag="div" to="/" class="text-white"
        >更多英雄 &gt;</router-link
      >
    </div>
    <div>
      <div
        class="banner text-white"
        :style="{ backgroundImage: `url(${model.banner})` }"
      >
        <div class="info d-flex ai-end jc-between p-3 h-100">
          <div>
            <div class="fs-xxs">{{ model.title }}</div>
            <div class="fs-xl mt-1" style="font-weight: 700;">
              {{ model.name }}
            </div>
            <div class="fs-xxs mt-1" v-if="model.categories">
              {{
                model.categories
                  .map((v) => {
                    return v.name;
                  })
                  .join("/")
              }}
            </div>
            <div class="fs-xxs mt-1 d-flex text-grey">
              <div>
                <span>难度</span
                ><span class="bg-hard mx-2 badge">{{
                  model.scores.difficult
                }}</span>
              </div>
              <div>
                <span>技能</span
                ><span class="bg-skill mx-2 badge">{{
                  model.scores.skills
                }}</span>
              </div>
              <div>
                <span>攻击</span
                ><span class="bg-attack mx-2 badge">{{
                  model.scores.attack
                }}</span>
              </div>
              <div>
                <span>生存</span
                ><span class="bg-survive mx-2 badge">{{
                  model.scores.survive
                }}</span>
              </div>
            </div>
          </div>

          <div class="fs-xxs text-grey">皮肤： 2 &gt;</div>
        </div>
      </div>
    </div>
    <div>
      <div class="px-3 bg-white">
        <div class="nav py-3 bg-white text-center">
          <div class="flex-1">
            <span class="active nav-item">英雄初始</span>
          </div>
          <div class="flex-1">
            <span class="nav-item">进阶攻略</span>
          </div>
        </div>
      </div>
      <div class="swiper">
        <div class="skill p-3 bg-white">
          <div class="d-flex text-center">
            <div class="heroBtn flex-1 py-3">
              <i class="iconfont icon-menu mr-2 text-primary"></i>
              <span>英雄介绍视频</span>
            </div>
            <div class="heroBtn flex-1 py-3 ml-2">
              <i class="iconfont icon-menu mr-2 text-primary"></i>
              <span>一图识英雄</span>
            </div>
          </div>
          <div class="d-flex jc-around mt-4">
            <div v-for="(item, i) in model.skills" :key="i">
              <img
                @click="currentIndex = i"
                :src="item.icon"
                class="skillsIcon"
                :class="{ active: currentIndex === i }"
              />
            </div>
          </div>
          <div>
            <div class="my-4">
              <strong>{{ skillIndex.name }}</strong>
            </div>
            <div class="des">{{ skillIndex.description }}</div>
          </div>
        </div>
        <div class="itemRecommend mt-2">
          <s-card plain icon="menu" title="出装推荐">
            <div>
              <div class="my-2 mb-3"><strong>顺风出装</strong></div>
              <div class="d-flex">
                <div v-for="(item, i) in model.items1" :key="i">
                  <img :src="item.icon" class="itemIcon" />
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </div>
            <div class="border-bottom my-3"></div>
            <div>
              <div class="my-2 mb-3"><strong>逆风出装</strong></div>
              <div class="d-flex">
                <div v-for="(item, i) in model.items2" :key="i">
                  <img :src="item.icon" class="itemIcon" />
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </s-card>
        </div>
        <div class="usageTip mt-2">
          <s-card plain icon="menu" title="使用技巧">
            <div class="des">{{ model.usageTips }}</div>
          </s-card>
        </div>
        <div class="battleTip mt-2">
          <s-card plain icon="menu" title="对抗技巧">
            <div class="des">{{ model.battleTips }}</div>
          </s-card>
        </div>
        <div class="teamTip mt-2">
          <s-card plain icon="menu" title="团战思路">
            <div class="des">{{ model.teamTips }}</div>
          </s-card>
        </div>
        <div class="relation mt-2" v-if="model.partners">
          <s-card plain icon="menu" title="英雄关系">
            <div class="my-2 mb-3"><strong>最佳搭档</strong></div>
            <div
              class="d-flex mb-4 ai-center"
              v-for="item in model.partners"
              :key="item.name"
            >
              <img :src="item.hero.avatar" alt="" />
              <div class="ml-3">{{ item.description }}</div>
            </div>
          </s-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  data() {
    return {
      model: "",
      currentIndex: 0,
    };
  },
  props: {
    id: { required: true },
  },
  computed: {
    skillIndex() {
      return this.model.skills[this.currentIndex];
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroDetail/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.page-hero {
  .des {
    line-height: 1.6rem;
  }
  .banner {
    height: 50vw;

    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    .info {
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      .badge {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        font-size: 0.5rem;
        text-align: center;
        border-radius: 50%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        color: white;
      }
    }
  }
  .nav {
    border-bottom: 1px solid rgb(212, 217, 222);
  }
  .skill {
    border-bottom: 1px solid rgb(212, 217, 222);
    .heroBtn {
      border: 1px solid rgb(236, 238, 240);
      border-radius: 0.5rem;
      background: rgb(252, 252, 252);
    }
    .skillsIcon {
      width: 4.6rem;
      border: 3px solid transparent;
      &.active {
        border: 3px solid map-get($colors, "primary");
        border-radius: 45%;
      }
    }
  }
  .itemIcon {
    width: 4rem;
    border-radius: 50%;
  }
  .relation {
    img {
      width: 3.8rem;
    }
  }
}
</style>
