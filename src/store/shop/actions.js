import api from "@/plugins/api";
import {
  createStoreUrl,
  getStoresUrl,
  editStoreUrl,
  deleteStoreUrl
} from "@/store/urls";

/* eslint-disable */
function createStore({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(createStoreUrl, data)
      .then((response) => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        }
        else {
          commit("addStore", response.data.result);
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function updateStore({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(editStoreUrl + data.store.storeid + "/edit", data.data)
      .then((response) => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        }
        else {
          commit("updateStore", {
            response: response.data.result,
            store: data.store
          });
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getAllStores({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(getStoresUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setStores", response.data.result);
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

function deleteStore({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deleteStoreUrl}${data.storeid}`)
      .then(response => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        }
        else {
          commit("deleteStore", {
            response: response.data.result,
            store: data
          });
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export { createStore, getAllStores, updateStore, deleteStore };
