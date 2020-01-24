import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "@/views/Auth";
import Main from "@/views/Main";

import AuthComponentLogin from "@/components/AuthComponent/components/AuthComponentLogin";
import MainComponentNews from "@/components/MainComponent/components/MainComponentNews";
import MainComponentShop from "@/components/MainComponent/components/MainComponentShop";
import MainComponentHeading from "@/components/MainComponent/components/MainComponentHeading";
import MainComponentFaq from "@/components/MainComponent/components/MainComponentFaq";
import MainComponentShareMechs from "@/components/MainComponent/components/MainComponentShareMechs";
import MainComponentSettings from "@/components/MainComponent/components/MainComponentSettings";
import MainComponentUserSettings from "@/components/MainComponent/components/MainComponentUserSettings";

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
      },
      {
        path: "/share-mechs",
        name: "MainComponentShareMechs",
        component: MainComponentShareMechs
      },
      {
        path: "/settings",
        name: "MainComponentSettings",
        component: MainComponentSettings
      },
      {
        path: "/user-settings",
        name: "MainComponentUserSettings",
        component: MainComponentUserSettings
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
