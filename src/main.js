import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";
// import api from "./plugins/api";
import VueWindowSize from "vue-window-size";

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.use(VueWindowSize);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
