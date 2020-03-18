import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import news from "./news";
import faqs from "./faqs";
import shop from "./shop";
import heading from "./heading";
import promos from "./promos";
import mechanics from "./mechanics";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackBar: {
      value: false,
      color: "success",
      text: "Внимание!",
      button_text: "Ok"
    },
    filter: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    }
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    news,
    faqs,
    shop,
    heading,
    promos,
    mechanics
  }
});
