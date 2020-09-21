import api from "@/plugins/api";
import {
  createCategoryStockUrl,
  editCategoryStockUrl,
  deleteCategoryStockUrl,
  allCategoryStockUrl
} from "@/store/urls";

function createCategoryStock({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createCategoryStockUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addCategoryStock", response.data.result);
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

function editCategoryStock({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(editCategoryStockUrl + data.categoryStock.id + "/edit", data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateCategoryStock", {
            response: response.data.result,
            categoryStock: data.categoryStock
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

function getAllCategoryStock({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(allCategoryStockUrl, { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("setCategoryStocks", response.data.result);
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

function deleteCategoryStock({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deleteCategoryStockUrl}${data.id}`)
      .then(response => {
        if (response.status === 200) {
          commit("deleteCategoryStock", {
            response: response.data.result,
            categoryStock: data
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

export {
  createCategoryStock,
  editCategoryStock,
  deleteCategoryStock,
  getAllCategoryStock
};
