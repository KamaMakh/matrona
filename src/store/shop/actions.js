import api from "@/plugins/api";
import {
  createStoreUrl,
  getStoresUrl,
  editStoreUrl,
  deleteStoreUrl
} from "@/store/urls";

function createStore({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createStoreUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addStore", response.data.result);
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

function updateStore({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(editStoreUrl + data.store.storeid + "/edit", data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateStore", {
            response: response.data.result,
            store: data.store
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
        if (response.status === 200) {
          commit("deleteStore", {
            response: response.data.result,
            store: data
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

export { createStore, getAllStores, updateStore, deleteStore };
