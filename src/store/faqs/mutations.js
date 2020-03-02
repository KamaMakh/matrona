function setUser(state, user) {
  state.user = user;
}

function setFaqs(state, faqs) {
  state.faqs = faqs.result;
}

function addFaq(state, faq) {
  state.faqs.unshift(faq);
  // setFaq(state);
}

function updateFaq(state, data) {
  if (state.faqs.indexOf(data.faq) > -1) {
    state.faqs[state.faqs.indexOf(data.faq)] = data.response;
  }
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
