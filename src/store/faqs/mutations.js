function setUser(state, user) {
  state.user = user;
}

function setFaqs(state, faqs) {
  state.faqs = faqs.result;
}

function addFaq(state, faq) {
  state.faqs.unshift(faq);
  setFaq(state, faq);
}

function updateFaq(state, data) {
  if (state.faqs.indexOf(data.faq) > -1) {
    state.faqs[state.faqs.indexOf(data.faq)] = data.response;
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

function deleteFaq(state, data) {
  if (state.faqs.indexOf(data.faq) !== -1) {
    state.faqs.splice(state.faqs.indexOf(data.faq), 1);
    state.oneFaqs = {};
  }
}

function setFaq(state, faq) {
  if (!faq) {
    faq = {};
  }
  state.oneFaqs = faq;
}

function clearFaq(state) {
  state.oneFaqs = {};
}

export { setUser, setFaqs, clearFaq, setFaq, addFaq, updateFaq, deleteFaq };
