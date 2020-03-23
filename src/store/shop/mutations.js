function setStores(state, stores) {
  state.stores = stores;
}

function addStore(state, store) {
  state.stores.unshift(store);
  // setStore(state);
}

function updateStore(state, data) {
  if (state.stores.indexOf(data.store) > -1) {
    state.stores[state.stores.indexOf(data.store)] = data.response;
  } else if (state.stores.length) {
    state.stores.forEach((item, key) => {
      if (parseInt(item.storeid) === parseInt(data.store.storeid)) {
        state.stores[key] = data.response;
        setStore(state, data.response);
      }
    });
  }
}

function deleteStore(state, data) {
  if (state.stores.indexOf(data.store) !== -1) {
    state.stores.splice(state.stores.indexOf(data.store), 1);
    state.oneStore = {};
  } else if (state.stores.length) {
    state.stores.forEach((item, key) => {
      if (parseInt(item.storeid) === parseInt(data.store.storeid)) {
        state.stores.splice(key, 1);
        state.oneStore = {};
      }
    });
  }
}

function setStore(state, store) {
  if (!store) {
    store = {};
  }
  state.oneStore = store;
  if (store.storeid) state.map = new Date();
}

export { setStore, setStores, addStore, updateStore, deleteStore };
