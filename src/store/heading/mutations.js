function setRubrics(state, rubrics) {
  state.rubrics = rubrics;
}

function addRubric(state, rubric) {
  state.rubrics.unshift(rubric);
  setRubric(state);
}

function updateRubric(state, data) {
  if (state.rubrics.indexOf(data.rubric) > -1) {
    state.rubrics[state.rubrics.indexOf(data.rubric)] = data.response;
  }
}

function deleteRubric(state, data) {
  if (state.rubrics.indexOf(data.rubric) !== -1) {
    state.rubrics.splice(state.rubrics.indexOf(data.rubric), 1);
    state.oneRubric = {};
  }
}

function setRubric(state, rubric) {
  if (!rubric) {
    rubric = {};
  }
  state.oneRubric = rubric;
}

export { setRubrics, setRubric, addRubric, updateRubric, deleteRubric };
