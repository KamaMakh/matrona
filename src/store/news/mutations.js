function setArticles(state, articles) {
  state.news = articles.result;
}

function addArticle(state, article) {
  if (state.news) {
    state.news.unshift(article);
  }
  // setArticle(state);
}

function updateArticle(state, data) {
  if (state.news.length) {
    state.news.forEach((item, key) => {
      if (parseInt(item.articleid) === parseInt(data.article.articleid)) {
        state.news[key] = data.response;
        setArticle(state, data.response);
      }
    });
  }
}

function deleteArticle(state, data) {
  if (state.news.indexOf(data.article) !== -1) {
    state.news.splice(state.news.indexOf(data.article), 1);
    state.oneNews = {};
  } else if (state.news.length) {
    state.news.forEach((item, key) => {
      if (parseInt(item.articleid) === parseInt(data.article.articleid)) {
        state.news.splice(key, 1);
        state.oneNews = {};
      }
    });
  }
}

function setArticle(state, article) {
  if (!article) {
    article = {};
  }
  state.oneNews = article;
}

export { setArticles, setArticle, addArticle, updateArticle, deleteArticle };
