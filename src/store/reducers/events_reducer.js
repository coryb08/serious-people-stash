const defaultState = { render: false, loading: true };
export default function(state = defaultState, action) {
  switch (action.type) {
    case "APP_LOADING":
      return {
        loading: action.payload
      };

    default:
      return state;
  }
}
