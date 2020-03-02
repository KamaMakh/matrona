function setUser(state, user) {
  state.user = user;
}

function setPromos(state, promos) {
  state.promos = promos.result;
}

function addPromo(state, promo) {
  state.promos.unshift(promo);
  // setPromo(state);
}

function updatePromo(state, data) {
  if (state.promos.indexOf(data.promo) > -1) {
    state.promos[state.promos.indexOf(data.promo)] = data.response;
  }
}

function deletePromo(state, data) {
  if (state.promos.indexOf(data.promo) !== -1) {
    state.promos.splice(state.promos.indexOf(data.promo), 1);
    state.onePromos = {};
  }
}

function setPromo(state, promo) {
  if (!promo) {
    promo = {};
  }
  state.onePromos = promo;
}

function clearPromo(state) {
  state.onePromos = {};
}

export {
  setUser,
  setPromos,
  clearPromo,
  setPromo,
  addPromo,
  updatePromo,
  deletePromo
};
