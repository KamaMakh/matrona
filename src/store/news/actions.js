import api from "@/plugins/api";
import {
  createNewsUrl,
  getArticlesUrl,
  editArticlesUrl,
  deleteArticlesUrl
} from "@/store/urls";

function createNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createNewsUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addArticle", response.data.result);
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

function updateNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(editArticlesUrl + data.article.articleid + "/edit", data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateArticle", {
            response: response.data.result,
            article: data.article
          });
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
        reject(error);
      });
  });
}

function deleteNews({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deleteArticlesUrl}${data.articleid}`)
      .then(response => {
        if (response.status === 200) {
          commit("deleteArticle", {
            response: response.data.result,
            article: data
          });
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

export { createNews, getAllNews, updateNews, deleteNews };
