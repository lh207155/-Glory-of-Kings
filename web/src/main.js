import Vue from "vue";
import App from "./App.vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import "./assets/fonts/iconfont.css";
import "./assets/scss/style.scss";
import router from "./router";
import axios from "axios";
import MyListCard from "./components/MyListCard";
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/web/api",
});
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper /* { default options with global component } */);
Vue.component("m-card", MyListCard);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
