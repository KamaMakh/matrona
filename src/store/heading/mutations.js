function setRubrics(state, rubrics) {
  state.rubrics = rubrics;
}

function setPrices(state, data) {
  state.specPrices = data.result;
  if (state.rubrics.length) {
    state.rubrics.forEach(item => {
      if (parseInt(item.rubricid) === parseInt(data.rubricid)) {
        setRubric(state, item);
      }
    });
  }
}

function addRubric(state, rubric) {
  state.rubrics.unshift(rubric);
  setRubric(state);
}

function addPrice(state, price) {
  state.specPrices.unshift(price);
  // setPrice(state, price);
}

function updateRubric(state, data) {
  setRubric(state, data.response);
}

function updatePrice(state, data) {
  if (state.specPrices.indexOf(data.price) > -1) {
    setPrice(state, data.response);
  }
}

function deleteRubric(state, data) {
  if (state.rubrics.indexOf(data.rubric) !== -1) {
    state.rubrics.splice(state.rubrics.indexOf(data.rubric), 1);
    state.oneRubric = {};
  }
}

function deletePrice(state, data) {
  if (state.specPrices.indexOf(data.price) !== -1) {
    state.specPrices.splice(state.specPrices.indexOf(data.price), 1);
    state.oneSpecPrice = {};
  }
}

function setRubric(state, rubric) {
  if (!rubric) {
    rubric = {};
  }
  state.oneRubric = rubric;
}

function setPrice(state, price) {
  if (!price) {
    price = {};
  }
  state.oneSpecPrice = price;
}

export {
  setRubrics,
  setRubric,
  addRubric,
  updateRubric,
  deleteRubric,
  addPrice,
  setPrices,
  setPrice,
  deletePrice,
  updatePrice
};
