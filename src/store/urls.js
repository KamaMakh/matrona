const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//matrona.uniiq.ru"
    : "//matrona.uniiq.ru";
const loginUrl = `${serverUrl}/web-panel-login`;
const createNewsUrl = `${serverUrl}/article/new`;
const getArticlesUrl = `${serverUrl}/article/full-list`;
const editArticlesUrl = `${serverUrl}/article/`;
const deleteArticlesUrl = `${serverUrl}/article/`;
<<<<<<< HEAD
const createFaqsUrl = `${serverUrl}/faq/new`;
const getFaqsUrl = `${serverUrl}/faq/full-list`;
const editFaqsUrl = `${serverUrl}/faq/`;
const deleteFaqsUrl = `${serverUrl}/faq/`;
=======
const createStoreUrl = `${serverUrl}/store/new`;
const getStoresUrl = `${serverUrl}/store/full-list`;
const editStoreUrl = `${serverUrl}/store/`;
const deleteStoreUrl = `${serverUrl}/store/`;
>>>>>>> 679c74f96b15d4d0801ad3552fcdede3b0343bd8

export {
  serverUrl,
  loginUrl,
  createNewsUrl,
  getArticlesUrl,
  editArticlesUrl,
  deleteArticlesUrl,
<<<<<<< HEAD
  createFaqsUrl,
  getFaqsUrl,
  editFaqsUrl,
  deleteFaqsUrl
=======
  createStoreUrl,
  getStoresUrl,
  editStoreUrl,
  deleteStoreUrl
>>>>>>> 679c74f96b15d4d0801ad3552fcdede3b0343bd8
};
