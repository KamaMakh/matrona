import api from "@/plugins/api";
import {
  createPromosUrl,
  getPromosUrl,
  editPromosUrl,
  deletePromosUrl
} from "@/store/urls";

function createPromos({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createPromosUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addPromo", response.data.result);
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

function updatePromos({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(editPromosUrl + data.promo.stockSchemaid + "/edit", data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updatePromo", {
            response: response.data.result,
            promo: data.promo
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

function getAllPromos({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(getPromosUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setPromos", response.data);
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

function deletePromos({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deletePromosUrl}${data.stockSchemaid}`)
      .then(response => {
        if (response.status === 200) {
          commit("deletePromo", {
            response: response.data.result,
            promo: data
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

export { createPromos, getAllPromos, updatePromos, deletePromos };
