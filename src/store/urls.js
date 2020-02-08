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
  deleteFaqsUrl
};
