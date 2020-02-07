import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import news from "./news";

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
    news
  }
});
