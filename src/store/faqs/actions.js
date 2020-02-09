import api from "@/plugins/api";
import {
  createFaqsUrl,
  getFaqsUrl,
  editFaqsUrl,
  deleteFaqsUrl
} from "@/store/urls";

function createFaqs({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(createFaqsUrl, data)
      .then(response => {
        if (response.status === 200) {
          commit("addFaq", response.data.result);
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

function updateFaqs({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .post(editFaqsUrl + data.faq.faqid + "/edit", data.data)
      .then(response => {
        if (response.status === 200) {
          commit("updateFaq", {
            response: response.data.result,
            faq: data.faq
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

function getAllFaqs({ commit }) {
  return new Promise((resolve, reject) => {
    api
      .get(getFaqsUrl)
      .then(response => {
        if (response.status === 200) {
          commit("setFaqs", response.data);
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

function deleteFaqs({ commit }, data) {
  return new Promise((resolve, reject) => {
    api
      .delete(`${deleteFaqsUrl}${data.faqid}`)
      .then(response => {
        if (response.status === 200) {
          commit("deleteFaq", {
            response: response.data.result,
            faq: data
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

export { createFaqs, getAllFaqs, updateFaqs, deleteFaqs };
