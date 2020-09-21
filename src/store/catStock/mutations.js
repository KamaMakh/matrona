function setCategoryStocks(state, data) {
  state.categoryStocks = data;
}

function addCategoryStock(state, categoryStock) {
  if (state.categoryStocks) {
    state.categoryStocks.unshift(categoryStock);
    setCategoryStock(state);
  }
}

function updateCategoryStock(state, data) {
    setCategoryStock(state, data.response);
}

function deleteCategoryStock(state, data) {
  if (state.categoryStocks.indexOf(data.categoryStock) !== -1) {
    state.categoryStocks.splice(state.categoryStocks.indexOf(data.categoryStock), 1);
    state.oneCategoryStock = {};
  } else if (state.categoryStocks.length) {
    state.categoryStocks.forEach((item, key) => {
      if (parseInt(item.id) === parseInt(data.categoryStock.id)) {
        state.categoryStocks.splice(key, 1);
        state.oneCategoryStock = {};
      }
    });
  }
}

function setCategoryStock(state, categoryStock) {
    if (!categoryStock) {
        categoryStock = {};
    }
    state.oneCategoryStock = categoryStock;
}

export {
  setCategoryStocks,
  setCategoryStock,
  addCategoryStock,
  updateCategoryStock,
  deleteCategoryStock
};
