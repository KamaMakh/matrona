import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import news from "./news";
<<<<<<< HEAD
import faqs from "./faqs";
=======
import shop from "./shop";
>>>>>>> 679c74f96b15d4d0801ad3552fcdede3b0343bd8

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackBar: {
      value: false,
      color: "success",
      text: "Внимание!",
      button_text: "Ok"
    }
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    news,
<<<<<<< HEAD
    faqs
=======
    shop
>>>>>>> 679c74f96b15d4d0801ad3552fcdede3b0343bd8
  }
});
