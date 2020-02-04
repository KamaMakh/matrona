import api from "@/plugins/api";
import { loginUrl } from "@/store/urls";
// import router from "@/router";
import VueCookies from "vue-cookies";

/* eslint-disable */
function login({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(loginUrl, data)
      .then((response) => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        } else if (response.data.result.access_token) {
          let token = response.data.result.access_token;
          VueCookies.set("token",token,"10D");
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export { login };
