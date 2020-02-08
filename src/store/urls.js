const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//matrona.uniiq.ru"
    : "//matrona.uniiq.ru";
const loginUrl = `${serverUrl}/web-panel-login`;
const createNewsUrl = `${serverUrl}/article/new`;
const getArticlesUrl = `${serverUrl}/article/full-list`;
const editArticlesUrl = `${serverUrl}/article/`;
const deleteArticlesUrl = `${serverUrl}/article/`;
const createStoreUrl = `${serverUrl}/store/new`;
const getStoresUrl = `${serverUrl}/store/full-list`;
const editStoreUrl = `${serverUrl}/store/`;
const deleteStoreUrl = `${serverUrl}/store/`;

export {
  serverUrl,
  loginUrl,
  createNewsUrl,
  getArticlesUrl,
  editArticlesUrl,
  deleteArticlesUrl,
  createStoreUrl,
  getStoresUrl,
  editStoreUrl,
  deleteStoreUrl
};
