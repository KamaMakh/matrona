import api from "@/plugins/api";
import { createNewsUrl } from "@/store/urls";

/* eslint-disable */
function createNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(createNewsUrl, data)
      .then((response) => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        }
        else {
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export { createNews };
