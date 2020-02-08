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
  /* eslint-disable */
  // if (state.news.length) {
  //   state.news.forEach((item, key) => {
  //     if (item.articleid === data.article.articleid) {
  //       state.news[key] = data.response;
  //       console.log(data.response);
  //       console.log(state.news);
  //     }
  //   });
  // }
}

function deleteArticle(state, data) {
  if (state.news.indexOf(data.article) !== -1) {
    state.news.splice(state.news.indexOf(data.article), 1);
    state.oneNews = {};
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
  updateArticle,
  deleteArticle
};
