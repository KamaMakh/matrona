function setSchemas(state, schemas) {
  state.schemas = schemas;
}

function setPromos(state, data) {
  state.stocks = data.result;
  if (state.schemas.length) {
    state.schemas.forEach(item => {
      if (parseInt(item.stockSchemaid) === parseInt(data.stockSchemaid)) {
        setSchema(state, item);
      }
    });
  }
}

function addSchema(state, schema) {
  state.schemas.unshift(schema);
  setSchema(state);
}

function addPromo(state, promo) {
  state.stocks.unshift(promo);
  // setPromo(state, promo);
}

function updateSchema(state, data) {
  setSchema(state, data.response);
}

function updatePromo(state, data) {
  setPromo(state, data.response);
}

function deleteSchema(state, data) {
  if (state.schemas.length) {
    state.schemas.forEach((item, key) => {
      if (
        parseInt(item.stockSchemaid) === parseInt(data.schema.stockSchemaid)
      ) {
        state.schemas.splice(key, 1);
        state.oneSchema = {};
      }
    });
  }
}

function deletePromo(state, data) {
  if (state.stocks.indexOf(data.promo) !== -1) {
    state.stocks.splice(state.stocks.indexOf(data.promo), 1);
    state.oneStock = {};
  }
}

function setSchema(state, schema) {
  if (!schema) {
    schema = {};
  }
  state.oneSchema = schema;
}

function setPromo(state, promo) {
  if (!promo) {
    promo = {};
  }
  state.oneStock = promo;
}

export {
  setSchemas,
  setSchema,
  addSchema,
  updateSchema,
  deleteSchema,
  addPromo,
  setPromos,
  setPromo,
  deletePromo,
  updatePromo
};
