import api from "@/plugins/api";
/*eslint-disable*/
import {
  createMechanicUrl,
  getMechanicsUrl,
  editMechanicUrl,
  deleteMechanicUrl,
  createPromosUrl,
  getPromosUrl,
  editPromosUrl,
  deletePromosUrl
} from "@/store/urls";

function createSchema({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createMechanicUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addSchema", response.data.result);
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

function createPromo({ commit }, data) {
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

function updateSchema({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(editMechanicUrl + data.schema.stockSchemaid + "/edit", data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateSchema", {
            response: response.data.result,
            schema: data.schema
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

function updatePromo({ commit }, data) {
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

function getAllSchemas({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(getMechanicsUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setSchemas", response.data.result);
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

function getAllPromos({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .get(getPromosUrl + data.id + "/prices-full")
      .then(response => {
        if (response.status === 200) {
          commit("setPromos", {
            result: response.data.result,
            stockSchemaid: data.id
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

function deleteSchema({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deleteMechanicUrl}${data.stockSchemaid}`)
      .then(response => {
        if (response.status === 200) {
          commit("deleteSchema", {
            response: response.data.result,
            schema: data
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

function deletePromo({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deletePromosUrl}${data.specPriceid}`)
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

export {
  createSchema,
  getAllSchemas,
  updateSchema,
  deleteSchema,
  createPromo,
  getAllPromos,
  updatePromo,
  deletePromo
};
