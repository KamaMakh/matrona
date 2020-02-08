function setStores(state, stores) {
  state.stores = stores;
}

function addStore(state, store) {
  state.stores.unshift(store);
  setStore(state);
}

function updateStore(state, data) {
  if (state.stores.indexOf(data.store) > -1) {
    state.stores[state.stores.indexOf(data.store)] = data.response;
  }
}

function deleteStore(state, data) {
  if (state.stores.indexOf(data.store) !== -1) {
    state.stores.splice(state.stores.indexOf(data.store), 1);
    state.oneStore = {};
  }
}

function setStore(state, store) {
  if (!store) {
    store = {};
  }
  state.oneStore = store;
}

export { setStore, setStores, addStore, updateStore, deleteStore };
