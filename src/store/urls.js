const serverUrl =
  process.env.NODE_ENV === "development"
    ? "//matrona.uniiq.ru"
    : "//matrona.uniiq.ru";
const loginUrl = `${serverUrl}/web-panel-login`;
const createNewsUrl = `${serverUrl}/article/new`;
const getArticlesUrl = `${serverUrl}/article/full-list`;
const editArticlesUrl = `${serverUrl}/article/`;
const deleteArticlesUrl = `${serverUrl}/article/`;
const createFaqsUrl = `${serverUrl}/faq/new`;
const getFaqsUrl = `${serverUrl}/faq/full-list`;
const editFaqsUrl = `${serverUrl}/faq/`;
const deleteFaqsUrl = `${serverUrl}/faq/`;
const createStoreUrl = `${serverUrl}/store/new`;
const getStoresUrl = `${serverUrl}/store/full-list`;
const editStoreUrl = `${serverUrl}/store/`;
const deleteStoreUrl = `${serverUrl}/store/`;
const createRubricUrl = `${serverUrl}/rubric/new`;
const getRubricsUrl = `${serverUrl}/rubric/full-list`;
const editRubricUrl = `${serverUrl}/rubric/`;
const deleteRubricUrl = `${serverUrl}/rubric/`;

export {
  serverUrl,
  loginUrl,
  createNewsUrl,
  getArticlesUrl,
  editArticlesUrl,
  deleteArticlesUrl,
  createFaqsUrl,
  getFaqsUrl,
  editFaqsUrl,
  deleteFaqsUrl,
  createStoreUrl,
  getStoresUrl,
  editStoreUrl,
  deleteStoreUrl,
  createRubricUrl,
  getRubricsUrl,
  editRubricUrl,
  deleteRubricUrl
};
