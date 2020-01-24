import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "@/views/Auth";
import Main from "@/views/Main";

import AuthComponentLogin from "@/components/AuthComponent/components/AuthComponentLogin";
import MainComponentNews from "@/components/MainComponent/components/MainComponentNews";
import MainComponentShop from "@/components/MainComponent/components/MainComponentShop";
import MainComponentHeading from "@/components/MainComponent/components/MainComponentHeading";
import MainComponentFaq from "@/components/MainComponent/components/MainComponentFaq";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    redirect: MainComponentNews,
    children: [
      {
        path: "/news",
        name: "MainComponentNews",
        component: MainComponentNews
      },
      {
        path: "/shop",
        name: "MainComponentShop",
        component: MainComponentShop
      },
      {
        path: "/heading",
        name: "MainComponentHeading",
        component: MainComponentHeading
      },
      {
        path: "/faq",
        name: "MainComponentFaq",
        component: MainComponentFaq
      }
    ]
  },
  {
    path: "/auth",
    component: Auth,
    children: [
      {
        path: "/",
        name: "AuthComponentLogin",
        component: AuthComponentLogin
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: "active"
});

export default router;
