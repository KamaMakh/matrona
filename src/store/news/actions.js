import api from "@/plugins/api";
import { createNewsUrl, getArticlesUrl } from "@/store/urls";

/* eslint-disable */
function createNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(createNewsUrl, data)
      .then((response) => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        }
        else {
          commit("addArticle", response.data.result);
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getAllNews({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(getArticlesUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setArticles", response.data);
          resolve(response);
        } else {
          reject(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 200) {
          commit("setSubscribes", error.response.data);
          resolve();
        } else {
          reject();
        }
      });
  });
}

export { createNews, getAllNews };
