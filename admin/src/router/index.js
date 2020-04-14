import Vue from "vue";
import VueRouter from "vue-router";

import Main from "../views/Main";
import CategoryEdit from "../views/CategoryEdit";
import CategoryList from "../views/CategoryList";

import ItemEdit from "../views/ItemEdit";
import ItemList from "../views/ItemList";

import HeroEdit from "../views/HeroEdit";
import HeroList from "../views/HeroList";

import ArticleEdit from "../views/ArticleEdit";
import ArticleList from "../views/ArticleList";

import AdsEdit from "../views/AdsEdit";
import AdsList from "../views/AdsList";

import AdminUserEdit from "../views/AdminUserEdit";
import AdminUserList from "../views/AdminUserList";

import Login from "../views/Login";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
    meta: { isPublic: true },
  },
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/categories/create",
        component: CategoryEdit,
      },
      {
        path: "/categories/list",
        component: CategoryList,
      },
      {
        path: "/categories/edit/:id",
        component: CategoryEdit,
        props: true,
      },
      {
        path: "/items/create",
        component: ItemEdit,
      },
      {
        path: "/items/list",
        component: ItemList,
      },
      {
        path: "/items/edit/:id",
        component: ItemEdit,
        props: true,
      },
      {
        path: "/heroes/create",
        component: HeroEdit,
      },
      {
        path: "/heroes/list",
        component: HeroList,
      },
      {
        path: "/heroes/edit/:id",
        component: HeroEdit,
        props: true,
      },
      {
        path: "/articles/create",
        component: ArticleEdit,
      },
      {
        path: "/articles/list",
        component: ArticleList,
      },
      {
        path: "/articles/edit/:id",
        component: ArticleEdit,
        props: true,
      },
      {
        path: "/ads/create",
        component: AdsEdit,
      },
      {
        path: "/ads/list",
        component: AdsList,
      },
      {
        path: "/ads/edit/:id",
        component: AdsEdit,
        props: true,
      },
      {
        path: "/admin_users/create",
        component: AdminUserEdit,
      },
      {
        path: "/admin_users/list",
        component: AdminUserList,
      },
      {
        path: "/admin_users/edit/:id",
        component: AdminUserEdit,
        props: true,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});
export default router;
