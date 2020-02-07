function setUser(state, user) {
  state.user = user;
}

function afterRegister() {
  //ignore
}

function changeProfileType(state, data) {
  state.profileType = data;
}

export { setUser, afterRegister, changeProfileType };
