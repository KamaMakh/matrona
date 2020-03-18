import api from "@/plugins/api";
import {
  createRubricUrl,
  getRubricsUrl,
  editRubricUrl,
  deleteRubricUrl,
  createPriceUrl,
  getPricesUrl,
  editPriceUrl,
  deletePriceUrl
} from "@/store/urls";

function createRubric({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createRubricUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addRubric", response.data.result);
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

function createPrice({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createPriceUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addPrice", response.data.result);
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

function updateRubric({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(editRubricUrl + data.rubric.rubricid + "/edit", data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateRubric", {
            response: response.data.result,
            rubric: data.rubric
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

function updatePrice({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(editPriceUrl + data.price.specPriceid + "/edit", data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updatePrice", {
            response: response.data.result,
            price: data.price
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

function getAllRubrics({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(getRubricsUrl, { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("setRubrics", response.data.result);
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

function getAllPrices({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(getPricesUrl + data.id + "/prices-full", { params: data })
      .then(response => {
        if (response.status === 200) {
          commit("setPrices", {
            result: response.data.result,
            rubricid: data.id
          });
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

function deleteRubric({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deleteRubricUrl}${data.rubricid}`)
      .then(response => {
        if (response.status === 200) {
          commit("deleteRubric", {
            response: response.data.result,
            rubric: data
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

function deletePrice({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deletePriceUrl}${data.specPriceid}`)
      .then(response => {
        if (response.status === 200) {
          commit("deletePrice", {
            response: response.data.result,
            price: data
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
  createRubric,
  getAllRubrics,
  updateRubric,
  deleteRubric,
  createPrice,
  getAllPrices,
  updatePrice,
  deletePrice
};
