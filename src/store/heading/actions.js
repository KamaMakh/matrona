import api from "@/plugins/api";
import {
  createRubricUrl,
  getRubricsUrl,
  editRubricUrl,
  deleteRubricUrl
} from "@/store/urls";

/* eslint-disable */
function createRubric({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(createRubricUrl, data)
      .then((response) => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        }
        else {
          commit("addRubric", response.data.result);
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function updateRubric({ commit }, data) {
  return new Promise((resolve, reject) => {
    api.post(editRubricUrl + data.rubric.rubricid + "/edit", data.data)
      .then((response) => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        }
        else {
          commit("updateRubric", {
            response: response.data.result,
            rubric: data.rubric
          });
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getAllRubrics({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(getRubricsUrl)
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

function deleteRubric({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deleteRubricUrl}${data.rubricid}`)
      .then(response => {
        if (response.data.error && response.data.error.code) {
          reject(response);
        }
        else {
          commit("deleteRubric", {
            response: response.data.result,
            rubric: data
          });
          resolve(response);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export { createRubric, getAllRubrics, updateRubric, deleteRubric };
