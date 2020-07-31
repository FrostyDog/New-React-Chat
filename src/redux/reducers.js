const initialState = {
  messages: [],
};

export function addMessages(payload) {
  return { type: "ADD_MESSAGES", payload };
}

function rootReducer(state = initialState, action) {
  if (action.type === "ADD_MESSAGES") {
    return Object.assign({}, state, {
      messages: state.messages.concat(action.payload),
    });
  }

  if (action.type === "CLEAR_MESSAGES") {
    return Object.assign({}, state, {
      messages: [],
    });
  }

  return state;
}

export default rootReducer;
