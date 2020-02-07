function setUser(state, user) {
  state.user = user;
}

function setArticles(state, articles) {
  state.news = articles.result;
}

function addArticle(state, article) {
  state.news.unshift(article);
  setArticle(state, article);
}

function updateArticle(state, data) {
  if (state.news.indexOf(data.article) > -1) {
    state.news[state.news.indexOf(data.article)] = data.response;
  }
}

function setArticle(state, article) {
  if (!article) {
    article = {};
  }
  state.oneNews = article;
}

function clearArticle(state) {
  state.oneNews = {};
}

export {
  setUser,
  setArticles,
  clearArticle,
  setArticle,
  addArticle,
  updateArticle
};
