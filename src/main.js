import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";
// import api from "./plugins/api";
import VueWindowSize from "vue-window-size";

import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";

Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.use(VueWindowSize);
Vue.use(Viewer);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
